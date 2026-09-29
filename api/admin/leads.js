import { getSql } from "../../server/db.mjs";
import { getAdminSession } from "../../server/auth.mjs";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({
        error: "Method not allowed.",
      });
    }

    const session = await getAdminSession(req);

    if (!session) {
      return res.status(401).json({
        error: "Admin authentication required.",
      });
    }

    const sql = getSql();

    const leads = await sql`
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
        subject,
        message,
        created_at,
        updated_at
      FROM leads
      ORDER BY created_at DESC
    `;

    return res.status(200).json({
      leads,
    });
  } catch (error) {
    console.error("Admin leads API error:", error);

    return res.status(500).json({
      error: error.message || "Failed to load leads.",
    });
  }
}