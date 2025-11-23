"use server";

import { getErrorMessage } from "@/lib/errorHandler";
import { ContactSchema, InitialContactFormState } from "@/types"
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/nodemailer";
import { generateContactEmailHTML } from "@/lib/email-template";

/**
 * Server Action for handling contact form submissions
 * This action runs on the server side and can safely use PrismaClient
 */
export const submitContactUs = async (_prevState: InitialContactFormState, formData: FormData): Promise<InitialContactFormState> => {
    try {
        // Parse and validate form data
        const result = ContactSchema.safeParse(Object.fromEntries(formData.entries()));
        
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            return {
                ...fieldErrors,
                response: "Please correct the errors below",
                type: "error",
            };
        }

        const { fullName, email, message } = result.data;

        // Save message to database
        const savedMessage = await prisma.message.create({
            data: {
                fullName,
                email,
                message,
            },
        });

        if (!savedMessage) {
            throw new Error("Failed to save your message");
        }

        // Send email notification using nodemailer
        try {
            const recipientEmail = process.env.EMAIL || 'hirwajeric@gmail.com';
            
            await sendEmail({
                to: recipientEmail,
                subject: `New Contact Form Submission from ${fullName}`,
                html: generateContactEmailHTML({ fullName, email, message }),
                replyTo: email,
            });

            console.log('Email notification sent successfully');
        } catch (emailError) {
            console.warn('Email notification failed:', emailError);
            // Don't fail the entire submission if email fails
        }

        return {
            type: "success",
            response: "Your message has been sent successfully! We'll get back to you as soon as possible.",
        };
    } catch (error: unknown) {
        console.error('Contact form submission error:', error);
        return {
            type: "error",
            response: getErrorMessage(error) || "An unexpected error occurred. Please try again.",
        };
    }
}