import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/constants";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
};

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const name = (data.name || "").toString().trim();
  const email = (data.email || "").toString().trim();
  const phone = (data.phone || "").toString().trim();
  const projectType = (data.projectType || "Non précisé").toString().trim();
  const message = (data.message || "").toString().trim();

  // Validation serveur (ne jamais faire confiance au client)
  if (
    name.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    phone.replace(/[\s.()-]/g, "").length < 8 ||
    message.length < 10
  ) {
    return NextResponse.json(
      { error: "Veuillez vérifier les informations saisies." },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  // Destinataire des leads (à définir dans .env). Fallback sur l'email du site.
  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  // Expéditeur vérifié sur Resend. Domaine à valider avant la mise en ligne.
  const from = process.env.CONTACT_FROM_EMAIL || "Jean Ba <onboarding@resend.dev>";

  const html = `
    <div style="font-family:Arial,sans-serif;color:#22400F;max-width:600px">
      <h2 style="color:#2D5016">Nouvelle demande de devis — ${escapeHtml(SITE.name)}</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:6px 0;font-weight:bold">Nom</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold">E-mail</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold">Téléphone</td><td>${escapeHtml(phone)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold">Type de projet</td><td>${escapeHtml(projectType)}</td></tr>
      </table>
      <p style="margin-top:16px;font-weight:bold">Message :</p>
      <p style="white-space:pre-wrap;background:#FAF6EF;padding:14px;border-radius:8px">${escapeHtml(message)}</p>
    </div>
  `;

  // Dégradation propre : sans clé API configurée, on n'échoue pas —
  // la demande est journalisée côté serveur (utile en démo / avant config).
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY absente — e-mail non envoyé. Demande reçue de :",
      { name, email, phone, projectType },
    );
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      reply_to: email,
      subject: `Demande de devis — ${name} (${projectType})`,
      html,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "L'envoi a échoué. Réessayez ou appelez-nous." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Erreur:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue. Réessayez plus tard." },
      { status: 500 },
    );
  }
}
