import { ensureTables } from "./_db.mjs";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    await ensureTables();
    return res.status(200).json({ ok: true, database: "connected" });
  } catch (error) {
    console.error("CMS health check failed:", error);
    return res.status(500).json({ ok: false, database: "disconnected", error: error.message || "Database connection failed" });
  }
}
