import type { Metadata } from "next";
import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import LoadBar from "@/components/reusable/LoadBar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | Quizee",
  description: "Manage your quizzes and track performance with Quizee.",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const userData = {
    id: String(user._id),
    name: user.name,
    username: user.username,
    email: user.email,
    img: user.img,
  };

  return (
    <div
      className="min-h-screen bg-[#f8f8f6] text-[#292b35]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap');

        .font-display {
          font-family: 'Manrope', sans-serif;
        }
      `}</style>

      {/* Desktop Sidebar */}
      <DashboardSidebar user={userData} />

      {/* Main Body */}
      <div className="lg:pl-[240px] flex flex-col min-h-screen">
        <DashboardNavbar user={userData} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Suspense fallback={<LoadBar />}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}