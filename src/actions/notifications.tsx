"use server";

import { getErrorMessage } from "@/lib/errorHandler";
import { ContactSchema, InitialContactFormState } from "@/types"
import { sendEmail } from "@/lib/nodemailer";
import { generateNotificationEmailHTML, generateConfirmationEmailHTML } from "@/lib/email-template";

/**
 * Server Action for handling contact form submissions
 * Sends confirmation email to submitter and notification email to site owner
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

        // Send emails using nodemailer
        try {
            const ownerEmail = process.env.EMAIL;
            
            if (!ownerEmail) {
                throw new Error('Email configuration is missing');
            }
            
            // Send notification email to site owner
            await sendEmail({
                to: ownerEmail,
                subject: `New Contact Form Submission from ${fullName}`,
                html: generateNotificationEmailHTML({ fullName, email, message }),
                replyTo: email,
            });

            // Send confirmation email to the submitter
            await sendEmail({
                to: email,
                subject: 'Thank You for Contacting Me - Jean Eric Hirwa',
                html: generateConfirmationEmailHTML({ fullName }),
            });

            // Log success without sensitive information
            console.log('Contact form submission processed successfully');
        } catch (emailError) {
            // Log error without exposing sensitive details
            console.error('Email sending failed');
            throw new Error("Failed to send emails. Please try again later.");
        }

        return {
            type: "success",
            response: "Your message has been sent successfully! I'll get back to you as soon as possible.",
        };
    } catch (error: unknown) {
        console.error('Contact form submission error:', error);
        return {
            type: "error",
            response: getErrorMessage(error) || "An unexpected error occurred. Please try again.",
        };
    }
}