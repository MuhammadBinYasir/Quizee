"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  BarChart2,
  TrendingUp,
  Award,
  Plus,
  ArrowRight,
  Share2,
  Edit3,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  HelpCircle,
  Copy,
  Check,
} from "lucide-react";

interface QuizItem {
  _id: string;
  title: string;
  desc: string;
  category: string;
  visibility: string;
  attempts?: number;
  ratio?: number | string;
  questions?: any[];
  total?: number;
  createdAt?: string;
}

interface UserData {
  _id: string;
  name: string;
  username: string;
  email: string;
  takens?: any[];
}

interface DashboardClientProps {
  user: UserData;
  quizzes: QuizItem[];
}

export default function DashboardClient({
  user,
  quizzes,
}: DashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const firstname = user.name?.split(" ")[0] || user.username || "there";

  // Dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Extract categories
  const categories = [
    "All",
    ...Array.from(new Set(quizzes.map((q) => q.category || "General"))).filter(
      Boolean
    ),
  ];

  // Stats calculation
  const totalQuizzes = quizzes.length;
  const totalAttempts = quizzes.reduce(
    (acc, q) => acc + (Number(q.attempts) || 0),
    0
  );
  const avgPerformance =
    totalQuizzes > 0
      ? Math.round(
          quizzes.reduce((acc, q) => acc + (Number(q.ratio) || 0), 0) /
            totalQuizzes
        )
      : 0;
  const totalTakens = user.takens?.length || 0;

  // Filter quizzes
  const filteredQuizzes = quizzes.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.category &&
        q.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      selectedCategory === "All" || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyLink = (quizId: string) => {
    const url = `${window.location.origin}/${user.username}/${quizId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(quizId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-[1240px] mx-auto space-y-8">
      {/* ======================================================
          HERO GREETING BANNER
          ====================================================== */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0eef6] border border-[#e1dde8] text-[10px] font-semibold text-[#8279a9] uppercase tracking-wider mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8279a9]" />
            Workspace Overview
          </div>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.04em] text-[#2d2f39]">
            {getGreeting()}, {firstname}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[#83848e]">
            Here's a summary of your quizzes, engagement, and participant
            activity.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href={`/${user.username}`}
            className="h-10 px-4 rounded-xl border border-[#dddddf] bg-white text-[#585a64] text-xs font-medium inline-flex items-center gap-2 hover:bg-[#fafaf8] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#8c8e96]" />
            <span>View Public Profile</span>
          </Link>

          <Link
            href="/dashboard/create"
            className="h-10 px-5 rounded-xl bg-[#8279a9] text-white text-xs font-medium inline-flex items-center gap-2 hover:bg-[#746b9a] transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create Quiz</span>
          </Link>
        </div>
      </section>

      {/* ======================================================
          METRIC STAT CARDS
          ====================================================== */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Total Quizzes */}
        <div className="rounded-2xl border border-[#e3e3e0] bg-white p-4 sm:p-5 shadow-xs transition-all hover:shadow-[0_8px_24px_rgba(40,40,55,0.04)]">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#eeecf5] text-[#8279a9]">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#a1a2a9]">
              Library
            </span>
          </div>
          <div className="mt-4">
            <p className="font-display text-2xl sm:text-3xl font-bold text-[#353640]">
              {totalQuizzes}
            </p>
            <p className="text-xs text-[#90919a] mt-0.5">Quizzes created</p>
          </div>
        </div>

        {/* Total Attempts */}
        <div className="rounded-2xl border border-[#e3e3e0] bg-white p-4 sm:p-5 shadow-xs transition-all hover:shadow-[0_8px_24px_rgba(40,40,55,0.04)]">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#edf3f4] text-[#7895a4]">
              <BarChart2 className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#a1a2a9]">
              Activity
            </span>
          </div>
          <div className="mt-4">
            <p className="font-display text-2xl sm:text-3xl font-bold text-[#353640]">
              {totalAttempts}
            </p>
            <p className="text-xs text-[#90919a] mt-0.5">Total attempts</p>
          </div>
        </div>

        {/* Performance Ratio */}
        <div className="rounded-2xl border border-[#e3e3e0] bg-white p-4 sm:p-5 shadow-xs transition-all hover:shadow-[0_8px_24px_rgba(40,40,55,0.04)]">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#f1eee7] text-[#9b8d72]">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#a1a2a9]">
              Avg. Score
            </span>
          </div>
          <div className="mt-4">
            <p className="font-display text-2xl sm:text-3xl font-bold text-[#353640]">
              {avgPerformance}%
            </p>
            <p className="text-xs text-[#90919a] mt-0.5">Participant average</p>
          </div>
        </div>

        {/* Taken Quizzes */}
        <div className="rounded-2xl border border-[#e3e3e0] bg-white p-4 sm:p-5 shadow-xs transition-all hover:shadow-[0_8px_24px_rgba(40,40,55,0.04)]">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#edf2ed] text-[#748c78]">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#a1a2a9]">
              Completed
            </span>
          </div>
          <div className="mt-4">
            <p className="font-display text-2xl sm:text-3xl font-bold text-[#353640]">
              {totalTakens}
            </p>
            <p className="text-xs text-[#90919a] mt-0.5">Quizzes taken</p>
          </div>
        </div>
      </section>

      {/* ======================================================
          SEARCH & FILTER BAR
          ====================================================== */}
      <section className="bg-white rounded-2xl border border-[#e3e3e0] p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a9ba4]" />
          <input
            type="text"
            placeholder="Search your quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#dedee2] bg-[#fafaf8] text-xs text-[#33353f] placeholder:text-[#a5a6af] outline-none focus:border-[#8279a9] focus:bg-white transition"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#8279a9] text-white shadow-xs"
                  : "bg-[#f5f4f7] text-[#6e707b] hover:bg-[#eae8f0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ======================================================
          QUIZ GRID
          ====================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#8279a9]">
              Your Library
            </p>
            <h2 className="font-display text-xl font-bold text-[#353640] mt-0.5">
              My Quizzes ({filteredQuizzes.length})
            </h2>
          </div>

          <Link
            href="/dashboard/create"
            className="text-xs font-semibold text-[#8279a9] hover:underline flex items-center gap-1"
          >
            <span>Add new quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {/* Create Card */}
          <Link
            href="/dashboard/create"
            className="group min-h-[220px] rounded-2xl border-2 border-dashed border-[#ded9eb] bg-[#f8f7fb] hover:bg-[#f2eff8] hover:border-[#8279a9]/60 p-5 flex flex-col justify-between transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e2dfee] flex items-center justify-center text-[#8279a9] shadow-xs group-hover:scale-105 transition-transform">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white text-[#8279a9] border border-[#e2dfee]">
                New
              </span>
            </div>

            <div className="mt-6">
              <h3 className="font-display font-bold text-base text-[#383a44] group-hover:text-[#8279a9] transition-colors">
                Create a new quiz
              </h3>
              <p className="text-xs text-[#858690] mt-1 leading-5">
                Draft interactive multiple-choice questions, set answers, and
                share with students.
              </p>
            </div>

            <div className="pt-3 border-t border-[#ebe7f4] flex items-center gap-1.5 text-xs font-semibold text-[#8279a9]">
              <span>Get started</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Quiz Cards */}
          {filteredQuizzes.map((quiz) => {
            const isCopied = copiedId === quiz._id;
            const avg = Number(quiz.ratio) || 0;
            const attemptsCount = Number(quiz.attempts) || 0;
            const questionsCount = quiz.questions?.length || quiz.total || 0;

            return (
              <div
                key={quiz._id}
                className="group bg-white rounded-2xl border border-[#e3e3e0] p-5 min-h-[220px] flex flex-col justify-between hover:shadow-[0_12px_32px_rgba(40,40,55,0.06)] hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#f0eef6] text-[10px] font-semibold text-[#746b94]">
                      {quiz.category || "General"}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          quiz.visibility === "public"
                            ? "bg-[#6a9975]"
                            : "bg-[#b0b1b8]"
                        }`}
                      />
                      <span className="text-[10px] text-[#8e9099] capitalize">
                        {quiz.visibility || "Public"}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#33353f] mt-3.5 line-clamp-1">
                    {quiz.title}
                  </h3>

                  <p className="text-xs text-[#878892] mt-1 line-clamp-2 leading-5">
                    {quiz.desc || "No description provided."}
                  </p>
                </div>

                {/* Score & Metrics */}
                <div className="mt-4 pt-3.5 border-t border-[#eeeeec]">
                  <div className="flex items-center justify-between text-[11px] text-[#8a8b94] mb-2">
                    <span>{questionsCount} questions</span>
                    <span>{attemptsCount} attempts</span>
                  </div>

                  <div className="flex items-center justify-between mb-1 text-[10px]">
                    <span className="text-[#a0a1aa]">Average Score</span>
                    <span className="font-semibold text-[#3b3d47]">{avg}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#eeeeec] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#8279a9] transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(0, avg))}%` }}
                    />
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex items-center justify-between gap-2 pt-3 border-t border-[#f4f4f2]">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/dashboard/edit/${quiz._id}`}
                        className="p-1.5 rounded-lg border border-[#e3e3e0] text-[#6d6f7a] hover:bg-[#f7f6fa] hover:text-[#33353f] text-xs inline-flex items-center gap-1"
                        title="Edit quiz"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Edit</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleCopyLink(quiz._id)}
                        className="p-1.5 rounded-lg border border-[#e3e3e0] text-[#6d6f7a] hover:bg-[#f7f6fa] hover:text-[#33353f] text-xs inline-flex items-center gap-1"
                        title="Copy share link"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-[11px] text-green-600">
                              Copied
                            </span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3.5 h-3.5" />
                            <span className="text-[11px]">Share</span>
                          </>
                        )}
                      </button>
                    </div>

                    <Link
                      href={`/${user.username}/${quiz._id}`}
                      className="h-7 px-3 rounded-lg bg-[#30323c] text-white text-[11px] font-medium inline-flex items-center gap-1 hover:bg-[#41434e] transition"
                    >
                      <span>Take</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search / Library State */}
        {filteredQuizzes.length === 0 && (
          <div className="bg-white rounded-2xl border border-[#e3e3e0] p-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#f0eef6] text-[#8279a9] flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#33353f]">
              {searchQuery ? "No quizzes matched your search" : "No quizzes created yet"}
            </h3>
            <p className="text-xs text-[#878892] mt-1 max-w-sm mx-auto">
              {searchQuery
                ? "Try searching for a different keyword or select another category."
                : "Create your very first quiz and invite learners to take it."}
            </p>
            {!searchQuery && (
              <Link
                href="/dashboard/create"
                className="mt-5 inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[#8279a9] text-white text-xs font-medium hover:bg-[#746b9a] transition shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create your first quiz</span>
              </Link>
            )}
          </div>
        )}
      </section>

      {/* ======================================================
          RECENT TAKENS / ACTIVITY SECTION
          ====================================================== */}
      {user.takens && user.takens.length > 0 && (
        <section className="bg-white rounded-2xl border border-[#e3e3e0] p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#8279a9]">
                Participation
              </p>
              <h3 className="font-display text-lg font-bold text-[#353640]">
                Recently Taken Quizzes
              </h3>
            </div>
            <Link
              href="/dashboard/takens"
              className="text-xs font-semibold text-[#8279a9] hover:underline"
            >
              View all history →
            </Link>
          </div>

          <div className="space-y-2.5">
            {user.takens.slice(0, 4).map((taken: any, idx: number) => {
              const quizInfo = taken.quizId;
              const percent = taken.total
                ? Math.round((taken.obtained / taken.total) * 100)
                : 0;

              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#fafaf8] border border-[#eeeeec] hover:border-[#dcd9e8] transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#eeecf5] text-[#8279a9] flex items-center justify-center font-bold text-xs shrink-0">
                      Q
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#383a44] truncate">
                        {quizInfo?.title || "Quiz Assessment"}
                      </p>
                      <p className="text-[10px] text-[#8d8e96]">
                        Score: {taken.obtained} / {taken.total} points
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                        percent >= 80
                          ? "bg-[#edf3ee] text-[#5b7d65]"
                          : percent >= 50
                          ? "bg-[#f1eee7] text-[#8b7d62]"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {percent}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
