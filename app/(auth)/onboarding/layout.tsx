import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Complete your profile and onboarding preferences on Quizee.",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
