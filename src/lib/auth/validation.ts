import { z } from "zod";
import validator from "validator";

export function sanitizeString(input: string): string {
  return validator.escape(validator.trim(input));
}

export function sanitizeEmail(email: string): string {
  return validator.normalizeEmail(validator.trim(email.toLowerCase())) || email;
}

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").transform(sanitizeEmail),
  password: z.string().min(1, "Password is required"),
});

export const createUserSchema = z.object({
  name: z.string().min(2).transform(sanitizeString),
  email: z.string().email().transform(sanitizeEmail),
  password: z.string().min(8),
  role: z.enum(["ADMIN", "EDITOR"]),
  active: z.boolean().optional().default(true),
});

export function validateRequest<T>(
  schema: z.ZodType<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  return { success: false, errors: result.error };
}
