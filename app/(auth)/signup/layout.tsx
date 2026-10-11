import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account on Quizee to start crafting and exploring interactive quizzes.",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
