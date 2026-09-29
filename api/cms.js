import { getCmsState, saveCmsState } from "./_db.mjs";
import { getAdminSession } from "../server/auth.mjs";

const CMS_CACHE_HEADERS = {
  "Cache-Control":
    "public, max-age=0, s-maxage=10, stale-while-revalidate=30, stale-if-error=3600",
};

function removePrivateLeadData(data) {
  if (!data || typeof data !== "object") {
    return data;
  }

  const safeData = { ...data };

  // Never expose legacy CMS leads through the public CMS endpoint.
  delete safeData.leads;

  return safeData;
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const data = await getCmsState();

      // Public CMS data must never contain customer leads/PII.
      const safeData = removePrivateLeadData(data);

      res.setHeader(
        "Cache-Control",
        CMS_CACHE_HEADERS["Cache-Control"]
      );

      return res.status(200).json({ data: safeData });
    }

    if (req.method === "PUT") {
      // Only authenticated administrators can modify CMS data.
      const session = await getAdminSession(req);

      if (!session) {
        return res.status(401).json({
          error: "Admin authentication required.",
        });
      }

      const incomingData = req.body;

      if (
        !incomingData ||
        typeof incomingData !== "object" ||
        Array.isArray(incomingData)
      ) {
        return res.status(400).json({
          error: "CMS payload must be a JSON object.",
        });
      }

      /*
       * Preserve any existing legacy leads stored inside cms_state.
       *
       * The frontend no longer uses cms.leads, so it may send a CMS
       * payload without that property. We must not accidentally delete
       * the old data during a CMS save.
       */
      const existingData = await getCmsState();

      const data = {
        ...incomingData,
      };

      if (
        !Object.prototype.hasOwnProperty.call(data, "leads") &&
        existingData &&
        Object.prototype.hasOwnProperty.call(existingData, "leads")
      ) {
        data.leads = existingData.leads;
      }

      await saveCmsState(data);

      // Never return legacy leads/PII in the API response.
      const safeData = removePrivateLeadData(data);

      return res.status(200).json({
        ok: true,
        data: safeData,
      });
    }

    res.setHeader("Allow", "GET, PUT");
    return res.status(405).json({
      error: "Method not allowed.",
    });
  } catch (error) {
    console.error("CMS API error:", error);

    return res.status(500).json({
      error: error.message || "CMS API error",
    });
  }
}