import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { validateRequest, createUserSchema } from "@/lib/auth/validation";
import { hashPassword } from "@/lib/auth/password";

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: true, requireAdmin: true });
  if (!auth.success) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validation = validateRequest(createUserSchema, body);
  if (!validation.success) {
    return NextResponse.json(
      {
        error: "Validation error",
        details: validation.errors.issues.map((e) => ({ path: e.path.join("."), message: e.message })),
      },
      { status: 400 }
    );
  }

  const { name, email, password, role, active } = validation.data;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: "Email already in use" }, { status: 409 });

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role,
      active,
    },
    select: { id: true, email: true, name: true, role: true, active: true },
  });

  return NextResponse.json(user, { status: 201 });
}
