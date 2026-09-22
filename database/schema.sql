-- Vallabhi Capital CMS database schema.
-- cms_state is the SINGLE SOURCE OF TRUTH for website/Admin content.
-- cms_pages is a compatibility/inspection table only; application reads never
-- merge it over cms_state. cms_media stores uploaded image/file bytes.

CREATE TABLE IF NOT EXISTS cms_state (
  id INTEGER PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_pages (
  page_key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_media (
  id TEXT PRIMARY KEY,
  name TEXT,
  mime_type TEXT NOT NULL,
  data BYTEA NOT NULL,
  page_key TEXT,
  field_path TEXT,
  entity_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS cms_pages_updated_at_idx ON cms_pages (updated_at DESC);
CREATE INDEX IF NOT EXISTS cms_media_page_key_idx ON cms_media (page_key);

-- Useful in Neon SQL Editor to see which top-level CMS sections are stored
-- inside the authoritative cms_state JSON document.
CREATE OR REPLACE VIEW cms_storage_map AS
SELECT
  id,
  updated_at,
  jsonb_object_keys(data) AS section
FROM cms_state
WHERE id = 1;
