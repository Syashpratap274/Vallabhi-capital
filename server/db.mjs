import { neon } from "@neondatabase/serverless";
import { loadProjectEnv } from "./env.mjs";

loadProjectEnv();

let sqlClient;
let tablesPromise;
let cmsStateCache;
let cmsStateCacheExpiresAt = 0;
let cmsStateCacheIsSet = false;
let cmsStateLoadPromise = null;
const CMS_STATE_CACHE_TTL_MS = process.env.VERCEL ? 10000 : 10 * 60 * 1000;

function cacheCmsState(data) {
  cmsStateCache = data;
  cmsStateCacheExpiresAt = Date.now() + CMS_STATE_CACHE_TTL_MS;
  cmsStateCacheIsSet = true;
}

export const CMS_PAGE_KEYS = [
  "homepage",
  "products",
  "industries",
  "blogs",
  "company",
  "partners",
  "career",
  "esg",
  "gallery",
  "contact",
  "leads",
];

export function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured. Add your Neon connection string to .env.");
  }
  sqlClient ||= neon(process.env.DATABASE_URL);
  return sqlClient;
}

export async function ensureTables() {
  if (tablesPromise) return tablesPromise;

  const sql = getSql();
  tablesPromise = (async () => {
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
  })().catch((error) => {
    tablesPromise = null;
    throw error;
  });

  await tablesPromise;
}

export async function getCmsState() {
  if (cmsStateCacheIsSet && Date.now() < cmsStateCacheExpiresAt) {
    return cmsStateCache;
  }

  if (cmsStateLoadPromise) return cmsStateLoadPromise;

  cmsStateLoadPromise = loadCmsState();
  try {
    return await cmsStateLoadPromise;
  } finally {
    cmsStateLoadPromise = null;
  }
}

async function loadCmsState() {
  const sql = getSql();
  let stateRows;

  try {
    stateRows = await sql`
      SELECT data, updated_at
      FROM cms_state
      WHERE id = 1
      LIMIT 1
    `;
  } catch (error) {
    if (error.code !== "42P01") throw error;
    await ensureTables();
    stateRows = await sql`
      SELECT data, updated_at
      FROM cms_state
      WHERE id = 1
      LIMIT 1
    `;
  }

  if (stateRows[0]?.data && typeof stateRows[0].data === "object") {
    // cms_state is authoritative. cms_pages is never merged over it.
    cacheCmsState(stateRows[0].data);
    return cmsStateCache;
  }

  // Compatibility recovery for databases created by an older version that
  // only populated cms_pages. This path runs only when cms_state is empty.
  let pageRows;
  try {
    pageRows = await sql`
      SELECT page_key, data
      FROM cms_pages
      ORDER BY page_key
    `;
  } catch (error) {
    if (error.code !== "42P01") throw error;
    cacheCmsState(null);
    return null;
  }
  if (!pageRows.length) {
    cacheCmsState(null);
    return null;
  }

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

  cacheCmsState(recovered);
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
  cacheCmsState(data);

  // Keep compatibility rows synchronized without delaying the authoritative save.
  Promise.all(CMS_PAGE_KEYS.filter((pageKey) => pageKey in data).map((pageKey) => sql`
      INSERT INTO cms_pages (page_key, data, updated_at)
      VALUES (${pageKey}, ${JSON.stringify(data[pageKey])}::jsonb, NOW())
      ON CONFLICT (page_key)
      DO UPDATE SET
        data = EXCLUDED.data,
        updated_at = NOW()
      `)).catch((error) => {
    console.warn("cms_pages compatibility sync failed; cms_state save succeeded.", error);
  });

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


export async function findLeadByPhone(phone) {
  const sql = getSql();
  await ensureTables();

  const rows = await sql`
    SELECT
      id,
      name,
      email,
      phone,
      company,
      product,
      aadhaar,
      pan,
      loan_amount,
      purpose,
      source,
      status,
      consented,
      consented_at,
      created_at,
      updated_at
    FROM leads
    WHERE phone = ${phone}
      AND source = 'Apply Now'
    ORDER BY created_at DESC
    LIMIT 1
  `;

  return rows[0] || null;
}

export async function createLead({
  id,
  name = "",
  email = "",
  phone,
  company = "",
  product = "",
  aadhaar = "",
  pan = "",
  loanAmount = "",
  purpose = "",
  subject = "",
  message = "",
  source = "Apply Now",
  status = "New",
  consented = false,
  consentedAt = null,
}) {
  const sql = getSql();
  await ensureTables();

  const rows = await sql`
    INSERT INTO leads (
      id,
      name,
      email,
      phone,
      company,
      product,
      aadhaar,
      pan,
      loan_amount,
      purpose,
      subject,
      message,
      source,
      status,
      consented,
      consented_at
    )
    VALUES (
      ${id},
      ${name},
      ${email},
      ${phone},
      ${company},
      ${product},
      ${aadhaar},
      ${pan},
      ${loanAmount || null},
      ${purpose},
      ${subject},
      ${message},
      ${source},
      ${status},
      ${consented},
      ${consentedAt}
    )
    RETURNING *
  `;

  return rows[0] || null;
}

export async function updateLead(id, {
  name,
  email,
  phone,
  company,
  product,
  aadhaar,
  pan,
  loanAmount,
  purpose,
  subject,
  message,
  status,
  consented,
  consentedAt,
}) {
  const sql = getSql();
  await ensureTables();

  const rows = await sql`
    UPDATE leads
    SET
      name = COALESCE(${name ?? null}, name),
      email = COALESCE(${email ?? null}, email),
      phone = COALESCE(${phone ?? null}, phone),
      company = COALESCE(${company ?? null}, company),
      product = COALESCE(${product ?? null}, product),
      aadhaar = COALESCE(${aadhaar ?? null}, aadhaar),
      pan = COALESCE(${pan ?? null}, pan),
      loan_amount = COALESCE(${loanAmount ?? null}, loan_amount),
      purpose = COALESCE(${purpose ?? null}, purpose),
      subject = COALESCE(${subject ?? null}, subject),
      message = COALESCE(${message ?? null}, message),
      status = COALESCE(${status ?? null}, status),
      consented = COALESCE(${consented ?? null}, consented),
      consented_at = COALESCE(${consentedAt ?? null}, consented_at),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return rows[0] || null;
}

export async function getAllLeads() {
  const sql = getSql();
  await ensureTables();

  const rows = await sql`
    SELECT
      id,
      name,
      email,
      phone,
      company,
      product,
      aadhaar,
      pan,
      loan_amount,
      purpose,
      subject,
      message,
      source,
      status,
      consented,
      consented_at,
      created_at,
      updated_at
    FROM leads
    ORDER BY created_at DESC
  `;

  return rows;
}