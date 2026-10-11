import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchUserQuizzes } from "@/lib/action/quiz.action";
import { fetchUser } from "@/lib/action/user.action";
import type { Metadata } from "next";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your quizzes, view performance metrics, and track learning activity.",
};

export default async function DashboardPage() {
  const authUser = await getCurrentUser();

  if (!authUser) {
    redirect("/login");
  }

  // Fetch populated user data & takens
  const userFetchResult = await fetchUser({ userId: String(authUser._id) });
  const userData =
    userFetchResult !== "no-user" ? userFetchResult.user : authUser;

  // Fetch quizzes created by this user from MongoDB
  const quizzes = await fetchUserQuizzes({ userId: String(authUser._id) });


  const serializedUser = JSON.parse(JSON.stringify(userData));

  const serializedQuizzes = JSON.parse(JSON.stringify(quizzes));

  return <DashboardClient user={serializedUser} quizzes={serializedQuizzes} />;
}