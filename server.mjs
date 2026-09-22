import http from "node:http";
import { URL } from "node:url";
import { randomUUID } from "node:crypto";
import { loadProjectEnv } from "./server/env.mjs";
import { ensureTables, getCmsState, saveCmsState, getMedia, saveMedia } from "./server/db.mjs";

loadProjectEnv();

const PORT = Number(process.env.CMS_API_PORT || 8787);
const MAX_BODY = 60 * 1024 * 1024;
const DATABASE_OPERATION_TIMEOUT = 15000;

function withTimeout(operation, message) {
  return Promise.race([
    operation,
    new Promise((_, reject) => setTimeout(() => reject(new Error(message)), DATABASE_OPERATION_TIMEOUT)),
  ]);
}

function send(res, status, body, headers = {}) {
  const payload = Buffer.isBuffer(body) ? body : Buffer.from(typeof body === "string" ? body : JSON.stringify(body));
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", ...headers });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", chunk => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(new Error("Request body is too large."));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try { resolve(Buffer.concat(chunks).toString("utf8")); } catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "OPTIONS") {
      res.writeHead(204, { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET,PUT,POST,OPTIONS" });
      return res.end();
    }

    if (url.pathname === "/api/health" && req.method === "GET") {
      await withTimeout(ensureTables(), "Database connection timed out.");
      return send(res, 200, { ok: true, database: "connected" });
    }

    if (url.pathname === "/api/cms") {
      if (req.method === "GET") return send(res, 200, { data: await getCmsState() });
      if (req.method === "PUT") {
        const data = JSON.parse(await readBody(req));
        await saveCmsState(data);
        return send(res, 200, { ok: true, data });
      }
    }

    if (url.pathname === "/api/media" && req.method === "POST") {
      const { dataUrl, name, type, pageKey, fieldPath, entityId } = JSON.parse(await readBody(req));
      const match = String(dataUrl || "").match(/^data:([^;]+);base64,(.+)$/s);
      if (!match) return send(res, 400, { error: "Invalid data URL." });
      const id = randomUUID();
      await withTimeout(
        saveMedia({ id, name, mimeType: type || match[1], buffer: Buffer.from(match[2], "base64"), pageKey, fieldPath, entityId }),
        "Media database operation timed out.",
      );
      return send(res, 201, { id, url: `/api/media?id=${encodeURIComponent(id)}` });
    }

    if (url.pathname === "/api/media" && req.method === "GET") {
      const id = url.searchParams.get("id");
      const media = id ? await getMedia(id) : null;
      if (!media) return send(res, 404, { error: "Not found" });
      const buffer = Buffer.isBuffer(media.data) ? media.data : Buffer.from(media.data);
      res.writeHead(200, { "Content-Type": media.mime_type, "Cache-Control": "public, max-age=31536000, immutable" });
      return res.end(buffer);
    }

    return send(res, 404, { error: "Not found" });
  } catch (error) {
    console.error(error);
    return send(res, 500, { error: error.message || "Server error" });
  }
});

server.listen(PORT, () => console.log(`Vallabhi CMS API running on http://localhost:${PORT}`));
