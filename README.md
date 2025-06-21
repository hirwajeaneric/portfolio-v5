# Portfolio v5

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Contact Form Features

The contact form has been improved with the following features:

### ✅ Form Validation
- Real-time field validation using Zod schema
- Custom error messages for each field
- Visual feedback with red borders and error text
- Prevents submission with invalid data

### ✅ User Experience
- Loading state with spinner animation
- Success/error message display
- Responsive design with dark mode support
- Accessible form controls with proper labels

### ✅ Backend Integration
- Messages saved to MongoDB via Prisma
- Email notifications sent via Resend API
- Robust error handling
- Graceful fallback if email service fails

### ✅ Security
- Input sanitization and validation
- CSRF protection via Next.js form actions
- Rate limiting considerations

### ✅ Server-Side Processing
- Uses Next.js Server Actions with `"use server"` directive
- PrismaClient properly configured for server-side execution
- Prevents browser-side PrismaClient errors
- Optimized with singleton pattern for development

## Environment Variables

Make sure to set up these environment variables:

```env
DATABASE_URL="your-mongodb-connection-string"
RESEND_API_KEY="your-resend-api-key"
```

## Usage

The contact form is available at `/contact` and can be imported as:

```tsx
import ContactForm from "@/components/widgets/forms/ContactForm";
```

## Technical Implementation

### Server Action Pattern
The contact form uses Next.js Server Actions to ensure database operations run on the server:

```tsx
"use server";

export const submitContactUs = async (prevState, formData) => {
  // This runs on the server, not in the browser
  const result = await prisma.message.create({...});
  return { type: "success", response: "Message sent!" };
};
```

### Database Configuration
PrismaClient is configured in a separate utility file (`src/lib/db.ts`) with a singleton pattern:

```tsx
// src/lib/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### Form Component
The form uses `useFormState` from `react-dom` for proper server action integration:

```tsx
import { useFormState } from "react-dom";

const [state, formAction, pending] = useFormState(
  submitContactUs,
  initialState
);

<form action={formAction}>
```

## Database Schema

The contact form uses the `Message` model in Prisma:

```prisma
model Message {
  id       String @id @default(auto()) @map("_id") @db.ObjectId
  fullName String
  email    String
  message  String
}
```

## Troubleshooting

### PrismaClient Browser Error
If you encounter "PrismaClient is unable to run in this browser environment", ensure:
1. The action file has `"use server"` at the top
2. You're using `useFormState` from `react-dom` in the form component
3. The form uses `action={formAction}` instead of `onSubmit`
4. PrismaClient is imported from a separate utility file, not exported from the action

### "use server" Export Error
If you get "A 'use server' file can only export async functions", ensure:
1. Only async functions are exported from files with `"use server"`
2. PrismaClient and other objects are in separate utility files
3. Import database utilities instead of defining them in action files
