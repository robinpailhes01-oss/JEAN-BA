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
  // Destinataires des leads : boîte pro + boîte perso du gérant (constants),
  // plus d'éventuelles adresses supplémentaires via CONTACT_TO_EMAIL
  // (séparées par des virgules). Doublons ignorés.
  const extra = (process.env.CONTACT_TO_EMAIL || "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  const to = Array.from(new Set([...SITE.leadRecipients, ...extra]));
  const from = process.env.CONTACT_FROM_EMAIL || `Jean Ba Paysagiste <contact@${SITE.domain}>`;

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

  const confirmationHtml = `
    <div style="font-family:Arial,sans-serif;color:#22400F;max-width:600px;margin:0 auto">
      <div style="background:#2D5016;padding:32px 40px;border-radius:12px 12px 0 0;text-align:center">
        <p style="color:#A8D08A;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px">Jean Ba Paysagiste</p>
        <h1 style="color:#ffffff;font-size:26px;margin:0;font-weight:600">Merci ${escapeHtml(name)} !</h1>
      </div>

      <div style="background:#FAF6EF;padding:36px 40px;border-radius:0 0 12px 12px">
        <p style="font-size:16px;line-height:1.7;margin:0 0 20px">
          Votre demande a bien été reçue. Je la lis dès que possible et vous reviens
          sous <strong>48 h</strong> pour qu'on puisse en parler.
        </p>

        <div style="background:#ffffff;border-radius:10px;padding:20px 24px;margin:24px 0;border-left:4px solid #2D5016">
          <p style="margin:0 0 6px;font-size:12px;color:#7a9a6a;text-transform:uppercase;letter-spacing:1px;font-weight:600">Votre projet</p>
          <p style="margin:0;font-size:15px;color:#22400F;font-weight:500">${escapeHtml(projectType)}</p>
          ${message ? `<p style="margin:12px 0 0;font-size:14px;color:#555;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</p>` : ""}
        </div>

        <p style="font-size:15px;line-height:1.7;margin:0 0 24px;color:#444">
          En attendant, si vous avez une question urgente n'hésitez pas à
          m'appeler directement — je réponds toujours.
        </p>

        <div style="text-align:center;margin:28px 0">
          <a href="tel:${SITE.phoneHref}"
             style="display:inline-block;background:#2D5016;color:#ffffff;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:600;font-size:15px">
            📞 ${SITE.phone}
          </a>
        </div>

        <p style="font-size:15px;line-height:1.6;margin:24px 0 0;color:#444">
          À très bientôt,<br>
          <strong style="color:#2D5016">Jean Ba</strong><br>
          <span style="font-size:13px;color:#7a9a6a">Paysagiste à Nîmes — Gard &amp; Hérault</span>
        </p>
      </div>

      <p style="text-align:center;font-size:11px;color:#aaa;margin-top:20px">
        Jean Ba Paysagiste · Nîmes · <a href="${SITE.url}" style="color:#aaa">${SITE.domain}</a>
      </p>
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

    // Envoi en parallèle : notification Jean Ba + confirmation client
    const [notif, confirm] = await Promise.all([
      resend.emails.send({
        from,
        to,
        reply_to: email,
        subject: `Demande de devis — ${name} (${projectType})`,
        html,
      }),
      resend.emails.send({
        from,
        to: email,
        subject: `Votre demande a bien été reçue — Jean Ba Paysagiste`,
        html: confirmationHtml,
      }),
    ]);

    if (notif.error || confirm.error) {
      console.error("[contact] Resend error:", notif.error ?? confirm.error);
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
