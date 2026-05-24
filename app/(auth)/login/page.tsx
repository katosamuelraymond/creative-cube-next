import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { login } from "@/app/actions/auth";

export const metadata: Metadata = { 
  title: "Login | Creative Cube",
  description: "Sign in to your Creative Cube account to manage your furniture orders and preferences."
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/";

  return <LoginForm action={login} callbackUrl={callbackUrl} />;
}
