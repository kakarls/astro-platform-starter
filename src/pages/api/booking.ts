import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { tour, slug, customerName, customerEmail, startDate, numPeople, total, paymentMethod } = data;

    console.log('📬 New booking received:', {
      tour, slug, customerName, customerEmail, startDate, numPeople, total, paymentMethod,
    });

    // ── Email setup — uncomment one option when ready ──────────────────────
    //
    // Option A: Resend
    // import { Resend } from 'resend';
    // const resend = new Resend(import.meta.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Suyos del Inca <bookings@yourdomain.com>',
    //   to: customerEmail,
    //   bcc: 'suyosdelinca@gmail.com',
    //   subject: `Booking confirmed: ${tour}`,
    //   html: buildEmailHtml({ customerName, tour, startDate, numPeople, total, paymentMethod }),
    // });
    //
    // Option B: SendGrid
    // import sgMail from '@sendgrid/mail';
    // sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   from: 'bookings@yourdomain.com',
    //   to: customerEmail,
    //   bcc: 'suyosdelinca@gmail.com',
    //   subject: `Booking confirmed: ${tour}`,
    //   html: buildEmailHtml({ customerName, tour, startDate, numPeople, total, paymentMethod }),
    // });
    // ──────────────────────────────────────────────────────────────────────

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Booking error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

function buildEmailHtml({ customerName, tour, startDate, numPeople, total, paymentMethod }: {
  customerName: string;
  tour: string;
  startDate: string;
  numPeople: string;
  total: number;
  paymentMethod: string;
}) {
  const paymentLabel = paymentMethod === 'paypal' ? 'PayPal (paid online)' : 'Cash (pay on arrival)';
  const formattedDate = new Date(startDate).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Booking Confirmation</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f4f4;font-family:Georgia,serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
        <tr>
          <td align="center">
            <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
              <tr>
                <td style="background:#0b1b2b;padding:32px 40px;text-align:center;">
                  <h1 style="margin:0;color:#ffffff;font-size:24px;">Suyos del Inca</h1>
                  <p style="margin:8px 0 0;color:#4dd68c;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Booking Confirmation</p>
                </td>
              </tr>
              <tr>
                <td style="padding:36px 40px;color:#1a1a1a;">
                  <p style="margin:0 0 20px;font-size:16px;">Dear ${customerName},</p>
                  <p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#444;">
                    Thank you for booking with us! Here's a summary of your reservation.
                    We'll be in touch shortly to confirm all the details.
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;margin-bottom:28px;">
                    <tr style="background:#f9f9f9;">
                      <td style="padding:12px 16px;font-size:13px;color:#666;text-transform:uppercase;width:40%;">Tour</td>
                      <td style="padding:12px 16px;font-size:15px;font-weight:bold;color:#0b1b2b;">${tour}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 16px;font-size:13px;color:#666;text-transform:uppercase;border-top:1px solid #e0e0e0;">Start Date</td>
                      <td style="padding:12px 16px;font-size:15px;color:#1a1a1a;border-top:1px solid #e0e0e0;">${formattedDate}</td>
                    </tr>
                    <tr style="background:#f9f9f9;">
                      <td style="padding:12px 16px;font-size:13px;color:#666;text-transform:uppercase;border-top:1px solid #e0e0e0;">People</td>
                      <td style="padding:12px 16px;font-size:15px;color:#1a1a1a;border-top:1px solid #e0e0e0;">${numPeople}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 16px;font-size:13px;color:#666;text-transform:uppercase;border-top:1px solid #e0e0e0;">Payment</td>
                      <td style="padding:12px 16px;font-size:15px;color:#1a1a1a;border-top:1px solid #e0e0e0;">${paymentLabel}</td>
                    </tr>
                    <tr style="background:#0b1b2b;">
                      <td style="padding:14px 16px;font-size:13px;color:#a0bdd0;text-transform:uppercase;">Total</td>
                      <td style="padding:14px 16px;font-size:18px;font-weight:bold;color:#4dd68c;">$${total.toLocaleString()} USD</td>
                    </tr>
                  </table>
                  <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">
                    Questions? Reply to this email or contact us at
                    <a href="mailto:suyosdelinca@gmail.com" style="color:#247047;">suyosdelinca@gmail.com</a>.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background:#f4f4f4;padding:20px 40px;text-align:center;border-top:1px solid #e0e0e0;">
                  <p style="margin:0;font-size:12px;color:#999;">© ${new Date().getFullYear()} Suyos del Inca. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
