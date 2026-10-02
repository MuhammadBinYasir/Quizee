import type { Metadata } from "next";
import {
  Github,
  LifeBuoy,
  Plus,
  Settings,
  User,
  LayoutDashboardIcon,
  MessageCircleQuestion,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/reusable/Logo";
import React, { Suspense } from "react";
import LoadBar from "@/components/reusable/LoadBar";
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/auth/LogoutButton";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Dashboard | Quizee",
  description: "Manage your quizzes and track student performance.",
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

  const firstname = user.name?.split(" ")[0] || user.username || "User";

  return (
    <div className="w-full min-h-screen bg-[#f8f8f6]">
      <div className="w-full h-16 flex gap-3 items-center justify-between px-6 sm:px-10 bg-white border-b border-b-slate-200">
        <Logo href="/dashboard" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 p-1 rounded-full hover:ring-2 hover:ring-[#8279a9]/20 transition outline-none">
              <img
                src={user.img || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.username)}`}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60 mr-4 sm:mr-8 p-1.5 shadow-lg border border-slate-200 bg-white">
            <DropdownMenuLabel className="px-2 py-1.5">
              <p className="text-sm font-semibold text-slate-800">Hi, {firstname}</p>
              <p className="text-xs text-slate-500 font-normal">@{user.username}</p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="my-1 bg-slate-100" />
            <DropdownMenuGroup>
              <Link href="/dashboard">
                <DropdownMenuItem className="cursor-pointer text-xs flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-100">
                  <LayoutDashboardIcon className="h-4 w-4 text-slate-500" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
              </Link>
              <Link href={`/${user.username}`}>
                <DropdownMenuItem className="cursor-pointer text-xs flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-100">
                  <User className="h-4 w-4 text-slate-500" />
                  <span>Public Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/setting">
                <DropdownMenuItem className="cursor-pointer text-xs flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-100">
                  <Settings className="h-4 w-4 text-slate-500" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1 bg-slate-100" />
            <DropdownMenuGroup>
              <Link href="/dashboard/takens">
                <DropdownMenuItem className="cursor-pointer text-xs flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-100">
                  <MessageCircleQuestion className="h-4 w-4 text-slate-500" />
                  <span>Your Takens</span>
                </DropdownMenuItem>
              </Link>

              <Link href="/dashboard/create">
                <DropdownMenuItem className="cursor-pointer text-xs flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-100">
                  <Plus className="h-4 w-4 text-slate-500" />
                  <span>New Quiz</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1 bg-slate-100" />
            <Link href="https://github.com/MuhammadBinYasir/Quizee" target="_blank" rel="noreferrer">
              <DropdownMenuItem className="cursor-pointer text-xs flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-100">
                <Github className="h-4 w-4 text-slate-500" />
                <span>Rate on GitHub</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator className="my-1 bg-slate-100" />
            <div className="pt-1">
              <LogoutButton />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Suspense fallback={<LoadBar />}>{children}</Suspense>
    </div>
  );
}