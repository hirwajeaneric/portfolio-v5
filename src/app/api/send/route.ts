import { ContactEmailTemplate } from '@/components/email-templates/contactEmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, message } = body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <noreply@yourdomain.com>', // Use a proper from address
      to: ['hirwajeric@gmail.com'],
      subject: `New Contact Form Submission from ${fullName}`,
      react: ContactEmailTemplate({ fullName, email, message }),
      replyTo: email, // Allow replying directly to the sender
    });

    if (error) {
      console.error('Resend API error:', error);
      return Response.json(
        { error: 'Failed to send email notification' },
        { status: 500 }
      );
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Email API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}