"use client";

import React from "react";
import Link from "next/link";

import {
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiPlus,
  FiTrendingUp,
  FiMoreHorizontal,
} from "react-icons/fi";

/* ============================================================
   DUMMY DATA
   ============================================================ */

const dummyQuizzes = [
  {
    id: "1",
    title: "Introduction to Physics",
    description:
      "Basic concepts, motion, forces and energy.",
    category: "Physics",
    visibility: "Public",
    attempts: 32,
    total: 20,
    average: 86,
  },
  {
    id: "2",
    title: "Organic Chemistry",
    description:
      "Functional groups, reactions and molecular structures.",
    category: "Chemistry",
    visibility: "Private",
    attempts: 18,
    total: 25,
    average: 78,
  },
  {
    id: "3",
    title: "Calculus — Limits",
    description:
      "Practice questions covering limits and continuity.",
    category: "Mathematics",
    visibility: "Public",
    attempts: 46,
    total: 15,
    average: 91,
  },
  {
    id: "4",
    title: "World History",
    description:
      "A short assessment covering major historical events.",
    category: "History",
    visibility: "Public",
    attempts: 27,
    total: 20,
    average: 83,
  },
  {
    id: "5",
    title: "Computer Fundamentals",
    description:
      "Hardware, software, operating systems and networks.",
    category: "Computer Science",
    visibility: "Private",
    attempts: 12,
    total: 18,
    average: 74,
  },
  {
    id: "6",
    title: "English Grammar",
    description:
      "Tenses, sentence structure and common grammar rules.",
    category: "English",
    visibility: "Public",
    attempts: 39,
    total: 20,
    average: 88,
  },
];

/* ============================================================
   SMALL COMPONENTS
   ============================================================ */

function StatCard({
  icon,
  label,
  value,
  description,
  variant = "purple",
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description: string;
  variant?: "purple" | "blue" | "green" | "sand";
}) {
  const styles = {
    purple: {
      icon: "bg-[#eeecf5] text-[#8279a9]",
    },
    blue: {
      icon: "bg-[#edf3f4] text-[#7895a4]",
    },
    green: {
      icon: "bg-[#edf2ed] text-[#748c78]",
    },
    sand: {
      icon: "bg-[#f1eee7] text-[#9b8d72]",
    },
  };

  return (
    <div className="rounded-xl border border-[#e3e3e0] bg-white p-4">

      <div className="flex items-center justify-between">

        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${styles[variant].icon}`}
        >
          {icon}
        </div>

        <span className="text-[9px] uppercase tracking-[0.12em] text-[#a1a2a9]">
          {label}
        </span>

      </div>

      <div className="mt-5">

        <p className="font-display text-2xl font-bold text-[#353640]">
          {value}
        </p>

        <p className="text-xs text-[#90919a] mt-1">
          {description}
        </p>

      </div>

    </div>
  );
}

/* ============================================================
   QUIZ CARD
   ============================================================ */

function QuizCard({
  quiz,
}: {
  quiz: (typeof dummyQuizzes)[number];
}) {
  return (
    <div
      className="
        group
        bg-white
        border border-[#e3e3e0]
        rounded-xl
        p-4
        min-h-[210px]
        flex flex-col
        transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-[0_10px_30px_rgba(40,40,50,.06)]
      "
    >

      {/* Top */}
      <div className="flex items-start justify-between">

        <span className="
          inline-flex
          px-2 py-1
          rounded-md
          bg-[#f2f1f4]
          text-[9px]
          font-medium
          text-[#777381]
        ">
          {quiz.category}
        </span>

        <button
          type="button"
          className="
            w-7 h-7
            rounded-md
            flex items-center justify-center
            text-[#a1a2a9]
            hover:bg-[#f4f4f2]
            hover:text-[#555762]
            transition-colors
          "
        >
          <FiMoreHorizontal />
        </button>

      </div>

      {/* Content */}
      <div className="mt-5 flex-1">

        <h3 className="
          font-display
          font-bold
          text-[15px]
          text-[#383a44]
          leading-5
        ">
          {quiz.title}
        </h3>

        <p className="
          mt-2
          text-xs
          text-[#92939b]
          leading-5
          line-clamp-2
        ">
          {quiz.description}
        </p>

      </div>

      {/* Bottom */}
      <div className="pt-4 mt-4 border-t border-[#eeeeeb]">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <span
              className={`
                w-1.5 h-1.5 rounded-full
                ${
                  quiz.visibility === "Public"
                    ? "bg-[#82a087]"
                    : "bg-[#b4b4b8]"
                }
              `}
            />

            <span className="text-[10px] text-[#92939b]">
              {quiz.visibility}
            </span>

          </div>

          <span className="text-[10px] text-[#92939b]">
            {quiz.attempts} attempts
          </span>

        </div>

        <div className="mt-3">

          <div className="flex items-center justify-between mb-1.5">

            <span className="text-[9px] text-[#a0a1a8]">
              Average score
            </span>

            <span className="text-[10px] font-medium text-[#62636c]">
              {quiz.average}%
            </span>

          </div>

          <div className="h-1 rounded-full bg-[#eeeeec] overflow-hidden">

            <div
              className="h-full rounded-full bg-[#aaa3c2]"
              style={{
                width: `${quiz.average}%`,
              }}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

/* ============================================================
   DASHBOARD
   ============================================================ */

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f6] text-[#292b35]">

      {/* ======================================================
          SIDEBAR
          ====================================================== */}

      <aside className="
        hidden
        lg:flex
        fixed
        left-0
        top-0
        bottom-0
        w-[230px]
        bg-white
        border-r border-[#e5e5e2]
        flex-col
      ">

        {/* Logo */}

        <div className="h-16 px-5 flex items-center border-b border-[#eeeeeb]">

          <Link
            href="/"
            className="flex items-center gap-2.5"
          >

            <div className="
              w-8 h-8
              rounded-[9px]
              bg-[#8279a9]
              text-white
              flex items-center justify-center
              text-sm
              font-bold
            ">
              Q
            </div>

            <span className="font-display font-bold text-[16px]">
              Quizee
            </span>

          </Link>

        </div>

        {/* Navigation */}

        <nav className="p-3 space-y-1">

          <Link
            href="/dashboard"
            className="
              flex items-center gap-3
              px-3 py-2.5
              rounded-lg
              bg-[#f0eef5]
              text-[#706891]
              text-xs font-medium
            "
          >
            <FiBookOpen />
            Overview
          </Link>

          <Link
            href="/dashboard/quizzes"
            className="
              flex items-center gap-3
              px-3 py-2.5
              rounded-lg
              text-[#85868e]
              text-xs
              hover:bg-[#f7f7f5]
              hover:text-[#555762]
              transition-colors
            "
          >
            <FiBookOpen />
            My quizzes
          </Link>

          <Link
            href="/dashboard/results"
            className="
              flex items-center gap-3
              px-3 py-2.5
              rounded-lg
              text-[#85868e]
              text-xs
              hover:bg-[#f7f7f5]
              hover:text-[#555762]
              transition-colors
            "
          >
            <FiBarChart2 />
            Results
          </Link>

        </nav>

        {/* Bottom */}

        <div className="mt-auto p-4">

          <div className="
            rounded-xl
            bg-[#f4f3f6]
            p-4
          ">

            <p className="text-[9px] uppercase tracking-wider text-[#9998a2]">
              Workspace
            </p>

            <p className="text-xs font-medium text-[#4b4c56] mt-2">
              Muhammad's Quizzes
            </p>

            <p className="text-[10px] text-[#9a9ba2] mt-1">
              Personal workspace
            </p>

          </div>

        </div>

      </aside>

      {/* ======================================================
          MAIN
          ====================================================== */}

      <div className="lg:ml-[230px]">

        {/* Header */}

        <header className="
          h-16
          bg-white/80
          border-b border-[#e5e5e2]
          flex items-center
          justify-between
          px-5 sm:px-8
        ">

          {/* Mobile logo */}

          <div className="lg:hidden flex items-center gap-2.5">

            <div className="
              w-8 h-8
              rounded-[9px]
              bg-[#8279a9]
              text-white
              flex items-center justify-center
              text-sm font-bold
            ">
              Q
            </div>

            <span className="font-display font-bold">
              Quizee
            </span>

          </div>

          <div className="hidden lg:block">
            <p className="text-xs text-[#92939b]">
              Dashboard
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div className="
              hidden sm:flex
              items-center gap-2
              text-[10px]
              text-[#8f9098]
            ">
              <span className="w-1.5 h-1.5 rounded-full bg-[#82a087]" />
              All systems operational
            </div>

            <div className="
              w-8 h-8
              rounded-full
              bg-[#e9e6f0]
              text-[#716b86]
              flex items-center justify-center
              text-xs font-semibold
            ">
              M
            </div>

          </div>

        </header>

        {/* ====================================================
            PAGE CONTENT
            ==================================================== */}

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-8">

          {/* Greeting */}

          <section>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

              <div>

                <p className="
                  text-[10px]
                  uppercase
                  tracking-[0.16em]
                  font-semibold
                  text-[#8279a9]
                ">
                  Overview
                </p>

                <h1 className="
                  font-display
                  mt-2
                  text-2xl sm:text-3xl
                  font-bold
                  tracking-[-0.04em]
                  text-[#353640]
                ">
                  Welcome back, Muhammad
                </h1>

                <p className="
                  mt-2
                  text-xs
                  text-[#92939b]
                ">
                  Here's a quick look at your quiz activity.
                </p>

              </div>

              <Link
                href="/dashboard/create"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  h-10
                  px-4
                  rounded-lg
                  bg-[#343641]
                  text-white
                  text-xs
                  font-medium
                  hover:bg-[#454751]
                  transition-colors
                  shadow-sm
                "
              >
                <FiPlus />
                Create quiz
              </Link>

            </div>

          </section>

          {/* ==================================================
              STATS
              ================================================== */}

          <section className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-3
            mt-7
          ">

            <StatCard
              icon={<FiBookOpen />}
              label="Library"
              value="6"
              description="Total quizzes"
              variant="purple"
            />

            <StatCard
              icon={<FiBarChart2 />}
              label="Activity"
              value="174"
              description="Quiz attempts"
              variant="blue"
            />

            <StatCard
              icon={<FiTrendingUp />}
              label="Performance"
              value="84%"
              description="Average result"
              variant="sand"
            />

            <StatCard
              icon={<FiCheckCircle />}
              label="Shared"
              value="4"
              description="Public quizzes"
              variant="green"
            />

          </section>

          {/* ==================================================
              CONTENT GRID
              ================================================== */}

          <div className="mt-10">

            {/* Section heading */}

            <div className="
              flex
              items-end
              justify-between
              mb-4
            ">

              <div>

                <p className="
                  text-[10px]
                  uppercase
                  tracking-[0.15em]
                  font-semibold
                  text-[#8279a9]
                ">
                  Your library
                </p>

                <h2 className="
                  font-display
                  text-lg
                  font-bold
                  text-[#3b3d47]
                  mt-1
                ">
                  Your quizzes
                </h2>

              </div>

              <button
                type="button"
                className="
                  hidden sm:flex
                  items-center
                  gap-1.5
                  text-[10px]
                  text-[#8d8e96]
                  hover:text-[#5d5e68]
                "
              >
                View all
                <FiArrowRight />
              </button>

            </div>

            {/* Quiz grid */}

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-4
              gap-4
            ">

              {/* Create card */}

              <Link
                href="/dashboard/create"
                className="
                  group
                  min-h-[210px]
                  rounded-xl
                  border
                  border-dashed
                  border-[#d3d0da]
                  bg-[#f2f0f5]
                  p-5
                  flex
                  flex-col
                  justify-between
                  transition-all
                  duration-200
                  hover:bg-[#eeecf3]
                  hover:border-[#bdb6ce]
                "
              >

                <div className="flex justify-between">

                  <div className="
                    w-9 h-9
                    rounded-lg
                    bg-white
                    border border-[#e2e0e5]
                    flex items-center justify-center
                    text-[#8279a9]
                    shadow-sm
                  ">
                    <FiPlus />
                  </div>

                  <FiArrowRight
                    className="
                      text-[#aaa8b1]
                      group-hover:text-[#8279a9]
                      group-hover:translate-x-0.5
                      transition-all
                    "
                  />

                </div>

                <div>

                  <h3 className="
                    text-sm
                    font-semibold
                    text-[#464750]
                  ">
                    Create a new quiz
                  </h3>

                  <p className="
                    text-xs
                    text-[#92939b]
                    leading-5
                    mt-1
                  ">
                    Start from scratch and build your next quiz.
                  </p>

                </div>

              </Link>

              {/* Quiz cards */}

              {dummyQuizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                />
              ))}

            </div>

          </div>

          {/* ==================================================
              BOTTOM SECTION
              ================================================== */}

          <section className="
            grid
            grid-cols-1
            lg:grid-cols-[1fr_340px]
            gap-4
            mt-10
          ">

            {/* Quick tip */}

            <div className="
              rounded-xl
              border border-[#e3e3e0]
              bg-white
              p-5
            ">

              <div className="
                flex
                items-start
                justify-between
              ">

                <div>

                  <p className="
                    text-[10px]
                    uppercase
                    tracking-[0.15em]
                    font-semibold
                    text-[#7895a4]
                  ">
                    Quick tip
                  </p>

                  <h3 className="
                    font-display
                    font-bold
                    text-base
                    text-[#3b3d47]
                    mt-1
                  ">
                    Keep your quizzes focused
                  </h3>

                </div>

                <div className="
                  w-8 h-8
                  rounded-lg
                  bg-[#edf3f4]
                  flex items-center justify-center
                  text-[#7895a4]
                ">
                  <FiClock className="text-sm" />
                </div>

              </div>

              <p className="
                text-xs
                text-[#898a92]
                leading-5
                mt-3
                max-w-xl
              ">
                Shorter quizzes are easier to complete and review.
                Try splitting larger topics into smaller assessments
                and compare the results afterwards.
              </p>

              <button
                type="button"
                className="
                  mt-4
                  text-[10px]
                  font-medium
                  text-[#7895a4]
                  hover:underline
                "
              >
                Learn more →
              </button>

            </div>

            {/* Performance */}

            <div className="
              rounded-xl
              border border-[#ddd9e8]
              bg-[#eeecf5]
              p-5
            ">

              <div className="
                flex
                items-center
                justify-between
              ">

                <p className="
                  text-[10px]
                  uppercase
                  tracking-[0.15em]
                  font-semibold
                  text-[#8279a9]
                ">
                  Performance
                </p>

                <FiTrendingUp className="text-[#8279a9]" />

              </div>

              <div className="
                mt-5
                flex
                items-end
                justify-between
              ">

                <div>

                  <p className="
                    font-display
                    text-3xl
                    font-bold
                    text-[#48445a]
                  ">
                    84%
                  </p>

                  <p className="
                    text-[10px]
                    text-[#85818f]
                    mt-1
                  ">
                    Average across attempts
                  </p>

                </div>

                <span className="
                  text-[10px]
                  text-[#748879]
                  bg-[#e4eee5]
                  px-2
                  py-1
                  rounded-full
                ">
                  +6.2%
                </span>

              </div>

              <div className="
                mt-5
                h-1.5
                rounded-full
                bg-white
                overflow-hidden
              ">

                <div
                  className="
                    h-full
                    rounded-full
                    bg-[#8279a9]
                  "
                  style={{
                    width: "84%",
                  }}
                />

              </div>

              <div className="
                flex
                justify-between
                mt-2
                text-[9px]
                text-[#9b98a5]
              ">
                <span>0%</span>
                <span>100%</span>
              </div>

            </div>

          </section>

        </div>

      </div>

    </main>
  );
}