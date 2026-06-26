import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  await resend.emails.send({
    from: "Bookings <books@spotoncoatings.org>",
    to: ["hey@spotoncoatings.org"],
    subject: "New Booking Request",
    html: `
      <p>Name: ${data.firstName} ${data.lastName}</p>
      <p>Email: ${data.email}</p>
      <p>Phone: ${data.phone}</p>
      <p>Year: ${data.year}</p>
      <p>Make: ${data.make}</p>
      <p>Model: ${data.model}</p>
      <p>Service: ${data.service}</p>
      <p>Date: ${data.date}</p>
      <p>Details: ${data.details}</p>
    `,
  });

  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
