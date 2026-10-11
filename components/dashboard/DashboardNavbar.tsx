"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Plus,
  Github,
  LayoutDashboard,
  Settings,
  User as UserIcon,
  Award,
  Menu,
  X,
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
import LogoutButton from "@/components/auth/LogoutButton";

interface NavbarProps {
  user: {
    id: string;
    name: string;
    username: string;
    img?: string;
    email: string;
  };
}

export default function DashboardNavbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const firstname = user.name?.split(" ")[0] || user.username || "User";

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Overview";
    if (pathname === "/dashboard/create") return "Create Quiz";
    if (pathname === "/dashboard/takens") return "Your Takens";
    if (pathname === "/dashboard/setting") return "Settings";
    if (pathname.startsWith("/dashboard/edit")) return "Edit Quiz";
    return "Dashboard";
  };

  const navLinks = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Create Quiz", href: "/dashboard/create", icon: Plus },
    { label: "Your Takens", href: "/dashboard/takens", icon: Award },
    { label: "Settings", href: "/dashboard/setting", icon: Settings },
    { label: "Public Profile", href: `/${user.username}`, icon: UserIcon },
  ];

  return (
    <>
      <header className="h-16 bg-white/90 backdrop-blur-md border-b border-[#e8e8e5] sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8">
        {/* Left: Mobile Toggle & Page Context */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#656774] hover:bg-[#f4f4f2] transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2">
            <div className="w-7 h-7 rounded-[8px] bg-[#8279a9] text-white flex items-center justify-center text-xs font-bold">
              Q
            </div>
            <span className="font-display font-bold text-base text-[#2d2f39]">
              Quizee
            </span>
          </Link>

          {/* Desktop breadcrumb */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-[#8f9099]">
            <Link href="/dashboard" className="hover:text-[#353640] transition">
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-medium text-[#353640]">{getPageTitle()}</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#edf3ee] border border-[#dce8de] text-[10px] font-medium text-[#5f7d67]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6a9975] animate-pulse" />
            <span>Systems operational</span>
          </div>

          {/* New Quiz Button */}
          <Link
            href="/dashboard/create"
            className="h-9 px-3.5 sm:px-4 rounded-lg bg-[#8279a9] text-white text-xs font-medium inline-flex items-center gap-1.5 hover:bg-[#746b9a] transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Create quiz</span>
            <span className="sm:hidden">New</span>
          </Link>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-[#8279a9]/30 transition outline-none">
                <img
                  src={
                    user.img ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                      user.username
                    )}`
                  }
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#dedde5] bg-[#f0eef6]"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-2 sm:mr-6 p-1.5 shadow-[0_12px_36px_rgba(40,40,55,0.09)] border border-[#e3e3e0] bg-white rounded-xl">
              <DropdownMenuLabel className="px-2.5 py-2">
                <p className="text-xs font-bold text-[#353640]">
                  Hi, {firstname}
                </p>
                <p className="text-[10px] text-[#90919a] font-normal truncate">
                  @{user.username}
                </p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="my-1 bg-[#eeeeeb]" />

              <DropdownMenuGroup>
                <Link href="/dashboard">
                  <DropdownMenuItem className="cursor-pointer text-xs flex items-center gap-2 px-2.5 py-2 rounded-lg text-[#555762] hover:bg-[#f5f4f8] hover:text-[#30323c]">
                    <LayoutDashboard className="h-3.5 w-3.5 text-[#8279a9]" />
                    <span>Dashboard Overview</span>
                  </DropdownMenuItem>
                </Link>
                <Link href={`/${user.username}`}>
                  <DropdownMenuItem className="cursor-pointer text-xs flex items-center gap-2 px-2.5 py-2 rounded-lg text-[#555762] hover:bg-[#f5f4f8] hover:text-[#30323c]">
                    <UserIcon className="h-3.5 w-3.5 text-[#8279a9]" />
                    <span>Public Profile</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/dashboard/setting">
                  <DropdownMenuItem className="cursor-pointer text-xs flex items-center gap-2 px-2.5 py-2 rounded-lg text-[#555762] hover:bg-[#f5f4f8] hover:text-[#30323c]">
                    <Settings className="h-3.5 w-3.5 text-[#8279a9]" />
                    <span>Account Settings</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/dashboard/takens">
                  <DropdownMenuItem className="cursor-pointer text-xs flex items-center gap-2 px-2.5 py-2 rounded-lg text-[#555762] hover:bg-[#f5f4f8] hover:text-[#30323c]">
                    <Award className="h-3.5 w-3.5 text-[#8279a9]" />
                    <span>Your Takens</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-1 bg-[#eeeeeb]" />

              <Link
                href="https://github.com/MuhammadBinYasir/Quizee"
                target="_blank"
                rel="noreferrer"
              >
                <DropdownMenuItem className="cursor-pointer text-xs flex items-center gap-2 px-2.5 py-2 rounded-lg text-[#555762] hover:bg-[#f5f4f8]">
                  <Github className="h-3.5 w-3.5 text-[#8279a9]" />
                  <span>Rate on GitHub</span>
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator className="my-1 bg-[#eeeeeb]" />

              <div className="p-1">
                <LogoutButton />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs flex">
          <div className="w-[260px] bg-white h-full p-4 flex flex-col shadow-2xl border-r border-[#e8e8e5]">
            <div className="flex items-center justify-between pb-4 border-b border-[#eeeeeb]">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[9px] bg-[#8279a9] text-white flex items-center justify-center text-sm font-bold">
                  Q
                </div>
                <span className="font-display font-bold text-base text-[#2d2f39]">
                  Quizee
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-[#888a94] hover:bg-[#f4f4f2]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="mt-4 space-y-1 flex-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                      isActive
                        ? "bg-[#f0eef5] text-[#706891] font-semibold"
                        : "text-[#777984] hover:bg-[#f8f8f7]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#eeeeeb]">
              <LogoutButton />
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}
    </>
  );
}
