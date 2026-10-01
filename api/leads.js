import { getSql } from "../server/db.mjs";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({
        error: "Method not allowed.",
      });
    }

    const {
      name,
      email,
      phone,
      company,
      product,
      aadhaar,
      pan,
      loanAmount,
      purpose,
      source,
      subject,
      message,
      consented,
      consentedAt,
      action,
    } = req.body || {};

    if (action === "consent") {
      if (!phone || !source) {
        return res.status(400).json({
          error: "Phone and source are required.",
        });
      }

      if (source !== "Apply Now") {
        return res.status(400).json({
          error: "Invalid lead source.",
        });
      }

      const sql = getSql();
      const existing = await sql`
        SELECT id FROM leads
        WHERE phone = ${phone} AND source = 'Apply Now'
        ORDER BY created_at DESC
        LIMIT 1
      `;
      const recordedAt = consentedAt && Number.isFinite(Date.parse(consentedAt))
        ? new Date(consentedAt)
        : new Date();

      if (existing[0]) {
        await sql`
          UPDATE leads
          SET consented = TRUE, consented_at = ${recordedAt}, updated_at = NOW()
          WHERE id = ${existing[0].id}
        `;
      } else {
        await sql`
          INSERT INTO leads (id, name, phone, source, status, consented, consented_at)
          VALUES (${crypto.randomUUID()}, '', ${phone}, 'Apply Now', 'New', TRUE, ${recordedAt})
        `;
      }

      return res.status(200).json({ ok: true });
    }

    if (!name || !phone || !source) {
      return res.status(400).json({
        error: "Name, phone and source are required.",
      });
    }

    const id = crypto.randomUUID();
    const sql = getSql();
    const recordedConsentAt = consented
      ? consentedAt && Number.isFinite(Date.parse(consentedAt))
        ? new Date(consentedAt)
        : new Date()
      : null;

    if (action === "application" && source === "Apply Now") {
      const existing = await sql`
        SELECT id FROM leads
        WHERE phone = ${phone} AND source = 'Apply Now'
        ORDER BY created_at DESC
        LIMIT 1
      `;

      if (existing[0]) {
        await sql`
          UPDATE leads
          SET
            name = ${name},
            email = ${email || null},
            aadhaar = ${aadhaar || null},
            pan = ${pan || null},
            loan_amount = ${loanAmount ? Number(loanAmount) : null},
            purpose = ${purpose || null},
            consented = COALESCE(${consented ?? null}, consented),
            consented_at = COALESCE(${recordedConsentAt}, consented_at),
            status = 'New',
            updated_at = NOW()
          WHERE id = ${existing[0].id}
        `;

        return res.status(200).json({ ok: true, id: existing[0].id });
      }
    }

    await sql`
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
        source,
        status,
        consented,
        consented_at,
        subject,
        message
      )
      VALUES (
        ${id},
        ${name},
        ${email || null},
        ${phone},
        ${company || null},
        ${product || null},
        ${aadhaar || null},
        ${pan || null},
        ${loanAmount ? Number(loanAmount) : null},
        ${purpose || null},
        ${source},
        'New',
        ${Boolean(consented)},
        ${recordedConsentAt},
        ${subject || null},
        ${message || null}
      )
    `;

    return res.status(201).json({
      ok: true,
      id,
    });
  } catch (error) {
    console.error("Leads API error:", error);

    return res.status(500).json({
      error: "Unable to save lead.",
    });
  }
}