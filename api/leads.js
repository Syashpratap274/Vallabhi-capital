import { sql } from "./_db.mjs";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed." });
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
    } = req.body || {};

    if (!name || !phone || !source) {
      return res.status(400).json({
        error: "Name, phone and source are required.",
      });
    }

    const id = crypto.randomUUID();

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
        consented_at
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
        ${consented ? new Date() : null}
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