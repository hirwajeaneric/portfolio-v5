import { z } from "zod";

export const ContactSchema = z.object({
    fullName: z.string().min(3, { message: "Full name must be at least 3 characters long" }).max(50).regex(/^[a-zA-Z\s]+$/, { message: "Full name can only contain letters and spaces" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    message: z.string().min(4, { message: "Message must be at least 4 characters long" }).max(500, { message: "Message cannot exceed 500 characters" }),
});

export interface InitialContactFormState {
    response: string | null;
    type: "success" | "error" | null;
    fullName?: string[];
    email?: string[];
    message?: string[];
}