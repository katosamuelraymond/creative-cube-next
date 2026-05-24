import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { register } from "@/app/actions/auth";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return <RegisterForm action={register} />;
}
