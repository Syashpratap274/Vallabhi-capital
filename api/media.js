import { randomUUID } from "node:crypto";
import { getMedia, saveMedia } from "./_db.mjs";

export default async function handler(req, res) {
  try {
    const id = req.query?.id;

    if (req.method === "GET" && id) {
      const media = await getMedia(id);
      if (!media) return res.status(404).end("Not found");
      res.setHeader("Content-Type", media.mime_type);
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      const buffer = Buffer.isBuffer(media.data) ? media.data : Buffer.from(media.data);
      return res.status(200).send(buffer);
    }

    if (req.method === "POST") {
      const { dataUrl, name, type, pageKey, fieldPath, entityId } = req.body || {};
      if (!dataUrl || typeof dataUrl !== "string" || !dataUrl.startsWith("data:")) {
        return res.status(400).json({ error: "A valid data URL is required." });
      }

      const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/s);
      if (!match) return res.status(400).json({ error: "Invalid data URL." });

      const mimeType = type || match[1];
      const buffer = Buffer.from(match[2], "base64");
      const mediaId = randomUUID();
      await saveMedia({ id: mediaId, name, mimeType, buffer, pageKey, fieldPath, entityId });

      return res.status(201).json({
        id: mediaId,
        url: `/api/media?id=${encodeURIComponent(mediaId)}`,
      });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed." });
  } catch (error) {
    console.error("Media API error:", error);
    return res.status(500).json({ error: error.message || "Media API error" });
  }
}
