export const prerender = false;
import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const { firstName, lastName, email, phone, message } = data;

    await resend.emails.send({
      from: "Website Contact <contact@yourdomain.com>",
      to: ["hey@spotoncoatings.com"], // your inbox
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      replyTo: email,
      html: `
        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>

        <hr />

        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
    });
  }
};
