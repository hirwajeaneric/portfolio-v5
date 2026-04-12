import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rateLimitPublicWrite } from "@/lib/auth/rate-limit";
import { sendEmail } from "@/lib/nodemailer";
import { generateNotificationEmailHTML, generateConfirmationEmailHTML } from "@/lib/email-template";

const schema = z.object({
  fullName: z.string().min(3).max(50),
  email: z.string().email(),
  message: z.string().min(4).max(5000),
});

export async function POST(request: NextRequest) {
  try {
    const rl = await rateLimitPublicWrite(request);
    if (!rl.success) return rl.response!;

    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const { fullName, email, message } = parsed.data;

    await prisma.contactMessage.create({
      data: { fullName, email, message },
    });

    const ownerEmail = process.env["EMAIL"];
    if (ownerEmail) {
      try {
        await sendEmail({
          to: ownerEmail,
          subject: `New Contact Form Submission from ${fullName}`,
          html: generateNotificationEmailHTML({ fullName, email, message }),
          replyTo: email,
        });
        await sendEmail({
          to: email,
          subject: "Thank You for Reaching Out to Me",
          html: generateConfirmationEmailHTML({ fullName }),
        });
      } catch {
        /* message is stored; email failure should not block UX */
      }
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully! I'll get back to you as soon as possible.",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
