"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  Award,
  Settings,
  User,
  ExternalLink,
  BookOpen,
} from "lucide-react";

interface SidebarProps {
  user: {
    name: string;
    username: string;
    img?: string;
    email: string;
  };
}

export default function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Create Quiz",
      href: "/dashboard/create",
      icon: PlusCircle,
    },
    {
      label: "Your Takens",
      href: "/dashboard/takens",
      icon: Award,
    },
    {
      label: "Settings",
      href: "/dashboard/setting",
      icon: Settings,
    },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[240px] bg-white border-r border-[#e8e8e5] flex-col z-30">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center border-b border-[#eeeeeb]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[9px] bg-[#8279a9] text-white flex items-center justify-center text-sm font-bold shadow-sm">
            Q
          </div>
          <span className="font-display font-bold text-[17px] tracking-tight text-[#2d2f39]">
            Quizee
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="p-3.5 space-y-1.5 flex-1">
        <p className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-[0.14em] font-semibold text-[#a6a7af]">
          Main Menu
        </p>

        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "bg-[#f0eef5] text-[#706891] font-semibold shadow-xs"
                  : "text-[#7f808a] hover:bg-[#f8f8f7] hover:text-[#383a44]"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive ? "text-[#8279a9]" : "text-[#9798a1]"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-4">
          <p className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-[0.14em] font-semibold text-[#a6a7af]">
            Public
          </p>

          <Link
            href={`/${user.username}`}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-[#7f808a] hover:bg-[#f8f8f7] hover:text-[#383a44] transition-all"
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-[#9798a1]" />
              <span>Public Profile</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#b5b6bc]" />
          </Link>
        </div>
      </nav>

      {/* Bottom Workspace Card */}
      <div className="p-3.5 border-t border-[#f0f0ee]">
        <div className="rounded-2xl bg-[#f4f3f6] p-3.5 border border-[#eae9ef]">
          <div className="flex items-center gap-2.5">
            <img
              src={
                user.img ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                  user.username
                )}`
              }
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover bg-white border border-[#dedde5]"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#3b3d47] truncate">
                {user.name}
              </p>
              <p className="text-[10px] text-[#9798a1] truncate">
                @{user.username}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
