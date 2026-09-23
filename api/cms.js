import { ensureTables, getCmsState, saveCmsState } from "./_db.mjs";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const data = await getCmsState();
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      return res.status(200).json({ data });
    }

    if (req.method === "PUT") {
      const data = req.body;
      if (!data || typeof data !== "object") {
        return res.status(400).json({ error: "CMS payload must be a JSON object." });
      }
      await saveCmsState(data);
      return res.status(200).json({ ok: true, data });
    }

    res.setHeader("Allow", "GET, PUT");
    return res.status(405).json({ error: "Method not allowed." });
  } catch (error) {
    console.error("CMS API error:", error);
    return res.status(500).json({ error: error.message || "CMS API error" });
  }
}
