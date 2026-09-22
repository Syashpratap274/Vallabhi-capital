# Vallabhi Capital — Neon CMS persistence

## Data flow

```text
Admin / Website
      ↓
src/cms.js
      ↓
/api/cms
      ↓
server.mjs (local) OR api/cms.js (deployment)
      ↓
server/db.mjs
      ↓
Neon PostgreSQL

Neon tables
├── cms_state   ← authoritative website/Admin content (JSONB)
├── cms_pages   ← compatibility/inspection copy only
└── cms_media   ← uploaded images/files
```

`cms_state.id = 1` is the single source of truth. Browser localStorage is no longer used to persist CMS content and cannot overwrite Neon.

## Local setup

1. Put your real Neon connection string in `.env`:

```env
DATABASE_URL=your-real-neon-connection-string
CMS_API_PORT=8787
```

2. Install dependencies if needed:

```bash
npm install
```

3. Start the app:

```bash
npm run dev
```

This starts Vite and the CMS API. Do not separately start `npm run cms:server` when `npm run dev` is already running.

4. Check database connectivity:

```text
http://localhost:8787/api/health
```

Expected response:

```json
{ "ok": true, "database": "connected" }
```

5. Check the CMS data:

```text
http://localhost:8787/api/cms
```

## Neon SQL checks

```sql
SELECT id, updated_at, data FROM cms_state WHERE id = 1;
```

```sql
SELECT * FROM cms_storage_map ORDER BY section;
```

```sql
SELECT page_key, updated_at, data FROM cms_pages ORDER BY page_key;
```

```sql
SELECT id, name, mime_type, page_key, field_path, entity_id, created_at
FROM cms_media
ORDER BY created_at DESC;
```

## Persistence test

1. Change one Admin field.
2. Wait for the Admin status to show `Neon CMS` / saved toast.
3. Refresh the website.
4. Refresh the Admin.
5. Stop the terminal with `Ctrl+C`.
6. Run `npm run dev` again.
7. Check the same field.
8. Open the site in another browser/incognito window.

If the value survives all steps, it is stored in Neon rather than browser state.

If the Admin shows `Save failed — check CMS server / Neon connection`, open `/api/health` first.
