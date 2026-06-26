export const prerender = false;
import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const result = await resend.emails.send({
      from: "Bookings <bookings@spotoncoatings.com>",
      to: ["hey@spotoncoatings.com"],
      subject: "Test Email",
      html: `<p>${data.message ?? "Hello"}</p>`,
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("EMAIL ERROR:", err);

    return new Response(
      JSON.stringify({
        error: "Email failed",
        details: String(err),
      }),
      { status: 500 }
    );
  }
};
