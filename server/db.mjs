import { neon } from "@neondatabase/serverless";
import { loadProjectEnv } from "./env.mjs";

loadProjectEnv();

let sqlClient;

export const CMS_PAGE_KEYS = [
  "homepage",
  "products",
  "industries",
  "blogs",
  "company",
  "partners",
  "career",
  "gallery",
  "contact",
  "leads",
];

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured. Add your Neon connection string to .env.");
  }
  sqlClient ||= neon(process.env.DATABASE_URL);
  return sqlClient;
}

export async function ensureTables() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS cms_state (
      id INTEGER PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS cms_pages (
      page_key TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS cms_media (
      id TEXT PRIMARY KEY,
      name TEXT,
      mime_type TEXT NOT NULL,
      data BYTEA NOT NULL,
      page_key TEXT,
      field_path TEXT,
      entity_id TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`ALTER TABLE cms_media ADD COLUMN IF NOT EXISTS page_key TEXT`;
  await sql`ALTER TABLE cms_media ADD COLUMN IF NOT EXISTS field_path TEXT`;
  await sql`ALTER TABLE cms_media ADD COLUMN IF NOT EXISTS entity_id TEXT`;
  await sql`CREATE INDEX IF NOT EXISTS cms_pages_updated_at_idx ON cms_pages (updated_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS cms_media_page_key_idx ON cms_media (page_key)`;
  await sql`
    CREATE OR REPLACE VIEW cms_storage_map AS
    SELECT id, updated_at, jsonb_object_keys(data) AS section
    FROM cms_state
    WHERE id = 1
  `;
}

export async function getCmsState() {
  const sql = getSql();
  await ensureTables();

  const stateRows = await sql`
    SELECT data, updated_at
    FROM cms_state
    WHERE id = 1
    LIMIT 1
  `;

  if (stateRows[0]?.data && typeof stateRows[0].data === "object") {
    // cms_state is authoritative. cms_pages is never merged over it.
    return stateRows[0].data;
  }

  // Compatibility recovery for databases created by an older version that
  // only populated cms_pages. This path runs only when cms_state is empty.
  const pageRows = await sql`
    SELECT page_key, data
    FROM cms_pages
    ORDER BY page_key
  `;
  if (!pageRows.length) return null;

  const recovered = pageRows.reduce((data, row) => ({
    ...data,
    [row.page_key]: row.data,
  }), {});

  // One-time compatibility migration: promote legacy page rows into the
  // authoritative state document so future reads no longer depend on them.
  await sql`
    INSERT INTO cms_state (id, data, updated_at)
    VALUES (1, ${JSON.stringify(recovered)}::jsonb, NOW())
    ON CONFLICT (id) DO NOTHING
  `;

  return recovered;
}

export async function saveCmsState(data) {
  const sql = getSql();
  await ensureTables();

  // One authoritative JSON document. The entire CMS snapshot survives server
  // restarts, browser changes, and different devices.
  await sql`
    INSERT INTO cms_state (id, data, updated_at)
    VALUES (1, ${JSON.stringify(data)}::jsonb, NOW())
    ON CONFLICT (id)
    DO UPDATE SET
      data = EXCLUDED.data,
      updated_at = NOW()
  `;

  // Keep cms_pages synchronized for inspection/backward compatibility, but
  // never make the save depend on these secondary rows.
  try {
    for (const pageKey of CMS_PAGE_KEYS) {
      if (!(pageKey in data)) continue;
      await sql`
        INSERT INTO cms_pages (page_key, data, updated_at)
        VALUES (${pageKey}, ${JSON.stringify(data[pageKey])}::jsonb, NOW())
        ON CONFLICT (page_key)
        DO UPDATE SET
          data = EXCLUDED.data,
          updated_at = NOW()
      `;
    }
  } catch (error) {
    console.warn("cms_pages compatibility sync failed; cms_state save succeeded.", error);
  }

  return data;
}

export async function saveMedia({ id, name, mimeType, buffer, pageKey = null, fieldPath = null, entityId = null }) {
  const sql = getSql();
  await ensureTables();
  await sql`
    INSERT INTO cms_media (id, name, mime_type, data, page_key, field_path, entity_id)
    VALUES (${id}, ${name || null}, ${mimeType}, ${buffer}, ${pageKey}, ${fieldPath}, ${entityId})
  `;
  return id;
}

export async function getMedia(id) {
  const sql = getSql();
  await ensureTables();
  const rows = await sql`
    SELECT mime_type, data FROM cms_media WHERE id = ${id} LIMIT 1
  `;
  return rows[0] || null;
}
