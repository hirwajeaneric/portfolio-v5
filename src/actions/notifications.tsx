import { getErrorMessage } from "@/lib/errorHandler";
import { ContactSchema, InitialContactFormState } from "@/types"
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const submitContactUs = async (_prevState: InitialContactFormState, formData: FormData): Promise<InitialContactFormState> => {
    const result = ContactSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!result.success) {
        let errorMessage = result.error.flatten().fieldErrors;
        return {
            ...errorMessage,
            response: "Please correct the errors below",
            type: "error",
        };
    }
    const { fullName, email, message } = result.data;
    try {
        const response = await prisma.message.create({
            data: {
                fullName,
                email,
                message,
            },
        });
        if (!response) {
            throw new Error("Failed to send your message");
        }
        return {
            type: "success",
            response: "Your message has been sent successfully. We will get back to you as soon as possible.",
        };
    } catch (error: any) {
        return {
            type: "error",
            response: getErrorMessage(error),
        };
    }
}