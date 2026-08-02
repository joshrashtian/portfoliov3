import { EmailTemplate } from "@/app/_components/emailtemplate";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { subject, name, email, message } = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: `${name} <${email}>`,
      to: ['joshrashtian1@gmail.com'],
      subject: "New Message from " + name,
      react: EmailTemplate({ email, message, subject, name }),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Send route error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return Response.json({ error: message }, { status: 500 });
  }
}
