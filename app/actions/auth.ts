"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";
import { RegisterSchema, LoginSchema, ActionState } from "@/lib/definitions";

// ─── Register ─────────────────────────────────────────────────────────────────

export async function register(
  state: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validated = RegisterSchema.safeParse(raw);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
      message: "Please fix the errors below.",
    };
  }

  const { name, email, password } = validated.data;

  // Check for existing account
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return {
      errors: { email: ["An account with this email already exists."] },
      message: "Registration failed.",
    };
  }

  // Hash password and create user
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, hashedPassword, role: "CUSTOMER" },
  });

  // Create session and redirect
  await createSession(user.id, user.role);
  redirect("/");
}

// ─── Login ────────────────────────────────────────────────────────────────────

export async function login(
  state: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validated = LoginSchema.safeParse(raw);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
      message: "Please fix the errors below.",
    };
  }

  const { email, password } = validated.data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return {
      errors: { email: ["No account found with this email."] },
      message: "Login failed.",
    };
  }

  const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!passwordMatch) {
    return {
      errors: { password: ["Incorrect password."] },
      message: "Login failed.",
    };
  }

  await createSession(user.id, user.role);

  // Redirect admin to dashboard, customers to home or callbackUrl
  const callbackUrl = formData.get("callbackUrl")?.toString() || "/";
  redirect(user.role === "ADMIN" ? "/admin" : callbackUrl);
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export async function logout() {
  await deleteSession();
  redirect("/login");
}
