// netlify/functions/booking.js
//
// EMAIL SETUP — choose one of the options below and uncomment it.
// All three send the same confirmation to the customer + BCC suyosdelinca@gmail.com
//
// ─── Option A: Resend ────────────────────────────────────────────────────────
// npm install resend
// Add RESEND_API_KEY to your Netlify environment variables
//
// import { Resend } from ‘resend’;
// const resend = new Resend(process.env.RESEND_API_KEY);
//
// async function sendEmail({ customerName, customerEmail, tour, startDate, numPeople, total, paymentMethod }) {
//   await resend.emails.send({
//     from: ‘Suyos de Inca [bookings@yourdomain.com](mailto:bookings@yourdomain.com)’, // must be a verified domain in Resend
//     to: customerEmail,
//     bcc: ‘suyosdelinca@gmail.com’,
//     subject: `Booking confirmed: ${tour}`,
//     html: buildEmailHtml({ customerName, tour, startDate, numPeople, total, paymentMethod }),
//   });
// }
//
// ─── Option B: SendGrid ──────────────────────────────────────────────────────
// npm install @sendgrid/mail
// Add SENDGRID_API_KEY to your Netlify environment variables
//
// import sgMail from ‘@sendgrid/mail’;
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//
// async function sendEmail({ customerName, customerEmail, tour, startDate, numPeople, total, paymentMethod }) {
//   await sgMail.send({
//     from: ‘bookings@yourdomain.com’, // must be verified in SendGrid
//     to: customerEmail,
//     bcc: ‘suyosdelinca@gmail.com’,
//     subject: `Booking confirmed: ${tour}`,
//     html: buildEmailHtml({ customerName, tour, startDate, numPeople, total, paymentMethod }),
//   });
// }
//
// ─── Option C: Nodemailer (SMTP / Gmail) ─────────────────────────────────────
// npm install nodemailer
// Add SMTP_USER and SMTP_PASS to your Netlify environment variables
//
// import nodemailer from ‘nodemailer’;
//
// async function sendEmail({ customerName, customerEmail, tour, startDate, numPeople, total, paymentMethod }) {
//   const transporter = nodemailer.createTransport({
//     service: ‘gmail’,
//     auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
//   });
//   await transporter.sendMail({
//     from: `"Suyos de Inca" <${process.env.SMTP_USER}>`,
//     to: customerEmail,
//     bcc: ‘suyosdelinca@gmail.com’,
//     subject: `Booking confirmed: ${tour}`,
//     html: buildEmailHtml({ customerName, tour, startDate, numPeople, total, paymentMethod }),
//   });
// }
//
// ─────────────────────────────────────────────────────────────────────────────

// Shared HTML email template used by all three options above
function buildEmailHtml({ customerName, tour, startDate, numPeople, total, paymentMethod }) {
const paymentLabel = paymentMethod === ‘paypal’ ? ‘PayPal (paid online)’ : ‘Cash (pay on arrival)’;
const formattedDate = new Date(startDate).toLocaleDateString(‘en-US’, {
weekday: ‘long’, year: ‘numeric’, month: ‘long’, day: ‘numeric’
});

return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Booking Confirmation</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
<tr>
<td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

```
          <!-- Header -->
          <tr>
            <td style="background:#0b1b2b;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;letter-spacing:0.5px;">Suyos de Inca</h1>
              <p style="margin:8px 0 0;color:#4dd68c;font-size:14px;letter-spacing:1px;text-transform:uppercase;">Booking Confirmation</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;color:#1a1a1a;">
              <p style="margin:0 0 20px;font-size:16px;">Dear ${customerName},</p>
              <p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#444;">
                Thank you for booking with us! Here's a summary of your reservation.
                We'll be in touch shortly to confirm all the details.
              </p>

              <!-- Booking details table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;margin-bottom:28px;">
                <tr style="background:#f9f9f9;">
                  <td style="padding:12px 16px;font-size:13px;color:#666;text-transform:uppercase;letter-spacing:0.5px;width:40%;">Tour</td>
                  <td style="padding:12px 16px;font-size:15px;font-weight:bold;color:#0b1b2b;">${tour}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:13px;color:#666;text-transform:uppercase;letter-spacing:0.5px;border-top:1px solid #e0e0e0;">Start Date</td>
                  <td style="padding:12px 16px;font-size:15px;color:#1a1a1a;border-top:1px solid #e0e0e0;">${formattedDate}</td>
                </tr>
                <tr style="background:#f9f9f9;">
                  <td style="padding:12px 16px;font-size:13px;color:#666;text-transform:uppercase;letter-spacing:0.5px;border-top:1px solid #e0e0e0;">People</td>
                  <td style="padding:12px 16px;font-size:15px;color:#1a1a1a;border-top:1px solid #e0e0e0;">${numPeople}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:13px;color:#666;text-transform:uppercase;letter-spacing:0.5px;border-top:1px solid #e0e0e0;">Payment</td>
                  <td style="padding:12px 16px;font-size:15px;color:#1a1a1a;border-top:1px solid #e0e0e0;">${paymentLabel}</td>
                </tr>
                <tr style="background:#0b1b2b;">
                  <td style="padding:14px 16px;font-size:13px;color:#a0bdd0;text-transform:uppercase;letter-spacing:0.5px;">Total</td>
                  <td style="padding:14px 16px;font-size:18px;font-weight:bold;color:#4dd68c;">$${total.toLocaleString()} USD</td>
                </tr>
              </table>

              <p style="margin:0 0 8px;font-size:14px;color:#666;line-height:1.6;">
                If you have any questions or need to make changes, just reply to this email or contact us at
                <a href="mailto:suyosdelinca@gmail.com" style="color:#247047;">suyosdelinca@gmail.com</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f4f4f4;padding:20px 40px;text-align:center;border-top:1px solid #e0e0e0;">
              <p style="margin:0;font-size:12px;color:#999;">© ${new Date().getFullYear()} Suyos de Inca. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

`;
}

// ─── Main function handler ────────────────────────────────────────────────────
export default async (req) => {
if (req.method !== ‘POST’) {
return new Response(‘Method Not Allowed’, { status: 405 });
}

try {
const data = await req.json();
const { tour, slug, customerName, customerEmail, startDate, numPeople, total, paymentMethod } = data;

```
console.log('📬 New booking received:', {
  tour, slug, customerName, customerEmail, startDate, numPeople, total, paymentMethod,
});

// ── Uncomment this once you've set up an email option above ──
// await sendEmail({ customerName, customerEmail, tour, startDate, numPeople, total, paymentMethod });

return new Response(JSON.stringify({ received: true }), {
  status: 200,
  headers: { 'Content-Type': 'application/json' },
});
```

} catch (err) {
console.error(‘Booking function error:’, err);
return new Response(JSON.stringify({ error: ‘Internal error’ }), {
status: 500,
headers: { ‘Content-Type’: ‘application/json’ },
});
}
};

export const config = { path: ‘/booking’ };
