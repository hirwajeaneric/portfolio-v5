import { z } from "zod";

export const ContactSchema = z.object({
  fullName: z.string().min(3).max(50),
  email: z.string().email(),
  message: z.string().min(4).max(5000),
});

export type ContactFormData = z.infer<typeof ContactSchema>;

export interface InitialContactFormState {
    response: string | null;
    type: "success" | "error" | null;
    fullName?: string[];
    email?: string[];
    message?: string[];
}