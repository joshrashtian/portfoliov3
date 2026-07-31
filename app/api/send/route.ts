import { EmailTemplate } from "@/app/_components/emailtemplate";
import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request, res: NextApiResponse) {
  const { subject, email, message } = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: 'Yourself <joshua@jrtechscv.com>',
      to: ['joshrashtian1@gmail.com'],
      subject: "New Message from " + email,
      react: EmailTemplate({ email, message, subject }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
