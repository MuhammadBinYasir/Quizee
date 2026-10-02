import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  Award,
  BarChart2,
  ExternalLink,
  Youtube,
  Linkedin,
  ArrowRight,
  Sparkles,
  Layers,
  ArrowLeft,
} from "lucide-react";
import { fetchUserWithUsername } from "@/lib/action/user.action";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function PublicProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const result = await fetchUserWithUsername({ username: params.username });
  const authUser = await getCurrentUser();

  if (result === "404" || !result?.user) {
    return (
      <main
        className="min-h-screen bg-[#f8f8f6] text-[#292b35] flex items-center justify-center p-6"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="max-w-md w-full bg-white border border-[#e3e3e0] rounded-3xl p-8 text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#eeecf5] text-[#8279a9] flex items-center justify-center mx-auto mb-4 font-bold text-lg">
            Q
          </div>
          <h1 className="font-display text-2xl font-bold text-[#30323c]">
            User Not Found
          </h1>
          <p className="text-xs text-[#82838c] mt-2">
            No profile exists with the username @{params.username}.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[#8279a9] text-white text-xs font-semibold hover:bg-[#746b9a] transition shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Quizee Home</span>
          </Link>
        </div>
      </main>
    );
  }

  const { user } = result;
  const isOwner = authUser && String(authUser._id) === String(user._id);

  // Filter public quizzes for external visitors; show all for owner
  const userQuizzes = (user.quiz || []).filter(
    (q: any) => isOwner || q.visibility === "public"
  );
  const userTakens = user.takens || [];

  const totalAttemptsReceived = userQuizzes.reduce(
    (acc: number, q: any) => acc + (q.attempts || (q.takens ? q.takens.length : 0)),
    0
  );

  return (
    <main
      className="min-h-screen bg-[#f8f8f6] text-[#292b35]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap');

        .font-display {
          font-family: 'Manrope', sans-serif;
        }
      `}</style>

      {/* =====================================================
          TOP HEADER
      ===================================================== */}
      <header className="h-16 bg-white/90 backdrop-blur-md border-b border-[#e8e8e5] sticky top-0 z-30">
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[9px] bg-[#8279a9] text-white flex items-center justify-center text-sm font-bold shadow-xs">
              Q
            </div>
            <span className="font-display font-bold text-lg text-[#2d2f39]">
              Quizee
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {authUser ? (
              <Link
                href="/dashboard"
                className="h-9 px-4 rounded-xl bg-[#30323c] text-white text-xs font-semibold hover:bg-[#41434e] transition"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="h-9 px-3.5 rounded-xl border border-[#dddddf] bg-white text-xs font-semibold text-[#585a66] hover:bg-[#fafaf8] transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="h-9 px-4 rounded-xl bg-[#8279a9] text-white text-xs font-semibold hover:bg-[#746b9a] transition shadow-xs"
                >
                  Join Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* =====================================================
          HERO PROFILE CARD
      ===================================================== */}
      <section className="relative overflow-hidden py-10 sm:py-14">
        {/* Soft decorative background shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-[#ded9eb]/40 blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#e1ebef]/50 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-[#dedee3] p-6 sm:p-10 shadow-[0_16px_50px_rgba(40,40,60,0.05)]">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              {/* Avatar */}
              <img
                src={
                  user.img ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                    user.username
                  )}`
                }
                alt={user.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-[#f0eef6] shadow-sm bg-[#fafaf8]"
              />

              {/* User Identity & Bio */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-[-0.035em] text-[#2f313c]">
                      {user.name}
                    </h1>
                    <p className="text-xs sm:text-sm text-[#878993] font-medium mt-0.5">
                      @{user.username}
                    </p>
                  </div>

                  {isOwner && (
                    <Link
                      href="/dashboard/setting"
                      className="h-9 px-4 rounded-xl border border-[#dddddf] bg-white text-xs font-semibold text-[#5a5c66] hover:bg-[#fafaf8] transition inline-flex items-center justify-center gap-1.5 self-center sm:self-auto shadow-2xs"
                    >
                      <span>Edit Profile</span>
                    </Link>
                  )}
                </div>

                <p className="mt-3.5 text-xs sm:text-sm text-[#666874] leading-6 max-w-2xl">
                  {user.desc || "Educator and quiz creator on Quizee."}
                </p>

                {/* Social Links */}
                {(user.yt || user.lkd) && (
                  <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                    {user.yt && (
                      <a
                        href={`https://youtube.com/@${user.yt}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fafaf8] border border-[#e4e4e7] text-xs font-medium text-[#444650] hover:border-[#cbcad4] transition"
                      >
                        <Youtube className="w-3.5 h-3.5 text-red-500" />
                        <span>@{user.yt}</span>
                      </a>
                    )}
                    {user.lkd && (
                      <a
                        href={`https://linkedin.com/in/${user.lkd}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fafaf8] border border-[#e4e4e7] text-xs font-medium text-[#444650] hover:border-[#cbcad4] transition"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                        <span>{user.lkd}</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Profile Metric Stats */}
            <div className="mt-8 pt-6 border-t border-[#eeeeec] grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-[#fafaf8] border border-[#eeeeec]">
                <p className="font-display text-xl sm:text-2xl font-bold text-[#353640]">
                  {userQuizzes.length}
                </p>
                <p className="text-[10px] sm:text-xs text-[#8f9099] mt-0.5">
                  Quizzes Created
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#fafaf8] border border-[#eeeeec]">
                <p className="font-display text-xl sm:text-2xl font-bold text-[#353640]">
                  {userTakens.length}
                </p>
                <p className="text-[10px] sm:text-xs text-[#8f9099] mt-0.5">
                  Quizzes Taken
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#fafaf8] border border-[#eeeeec]">
                <p className="font-display text-xl sm:text-2xl font-bold text-[#353640]">
                  {totalAttemptsReceived}
                </p>
                <p className="text-[10px] sm:text-xs text-[#8f9099] mt-0.5">
                  Total Submissions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUIZZES SECTION
      ===================================================== */}
      <section className="max-w-5xl mx-auto px-6 pb-20 space-y-12">
        {/* Created Quizzes */}
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#e8e8e5]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#eeecf5] text-[#8279a9] flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-[#33353f]">
                Published Quizzes ({userQuizzes.length})
              </h2>
            </div>
          </div>

          {userQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {userQuizzes.map((quiz: any) => {
                const questionsCount = quiz.questions?.length || quiz.total || 0;
                const attemptsCount =
                  quiz.attempts || (quiz.takens ? quiz.takens.length : 0);

                return (
                  <div
                    key={quiz._id}
                    className="group bg-white rounded-2xl border border-[#e3e3e0] p-5 flex flex-col justify-between hover:shadow-[0_12px_32px_rgba(40,40,55,0.06)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg bg-[#f0eef6] text-[10px] font-semibold text-[#746b94]">
                          {quiz.category || "General"}
                        </span>
                        <span className="text-[10px] text-[#8e9099]">
                          {questionsCount} questions
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-base text-[#33353f] mt-3 line-clamp-1">
                        {quiz.title}
                      </h3>

                      <p className="text-xs text-[#878892] mt-1 line-clamp-2 leading-5">
                        {quiz.desc || "Test your understanding with this quiz."}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-[#eeeeec] flex items-center justify-between">
                      <span className="text-[11px] text-[#8e9099]">
                        {attemptsCount} attempts
                      </span>

                      <Link
                        href={`/${params.username}/${quiz._id}`}
                        className="h-8 px-4 rounded-xl bg-[#8279a9] hover:bg-[#746b9a] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition shadow-xs"
                      >
                        <span>Start Quiz</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#e3e3e0] p-8 text-center text-xs text-[#858690]">
              No public quizzes published yet.
            </div>
          )}
        </div>

        {/* Taken Quizzes History */}
        {userTakens.length > 0 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#e8e8e5]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#edf2ed] text-[#748c78] flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-[#33353f]">
                  Completed Assessments ({userTakens.length})
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userTakens.map((taken: any, idx: number) => {
                const quiz = taken.quizId;
                const percent = taken.total
                  ? Math.round((taken.obtained / taken.total) * 100)
                  : 0;

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-[#e3e3e0] flex items-center justify-between gap-4 shadow-xs"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#353640] truncate">
                        {quiz?.title || "Quiz"}
                      </p>
                      <p className="text-[11px] text-[#8e9099] mt-0.5">
                        Score: {taken.obtained} / {taken.total} points
                      </p>
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-xl ${
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
                );
              })}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}