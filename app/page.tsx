"use client";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   REVEAL ANIMATION
========================================================= */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 700ms ease ${delay}ms,
          transform 700ms cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   SMALL ICONS
========================================================= */

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12.5 9.5 17 19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h13M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   HERO PRODUCT PREVIEW
========================================================= */

function ProductPreview() {
  return (
    <div className="relative w-full max-w-[720px] mx-auto">
      {/* Soft background decoration */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-[300px] rounded-full bg-[#dcd8f1]/50 blur-3xl" />

      {/* Main application window */}
      <div className="relative rounded-[18px] border border-[#dedee5] bg-white shadow-[0_24px_70px_rgba(42,45,61,0.10)] overflow-hidden">
        {/* Window header */}
        <div className="h-11 border-b border-[#eeeeef] bg-[#fbfbfc] flex items-center px-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#dedee3]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#dedee3]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#dedee3]" />
          </div>

          <div className="mx-auto hidden sm:flex items-center justify-center w-[230px] h-6 rounded-md bg-[#f2f2f4] text-[9px] text-[#999ba5]">
            app.quizee.dev
          </div>
        </div>

        <div className="grid grid-cols-[155px_1fr] min-h-[390px]">
          {/* Sidebar */}
          <aside className="hidden sm:block border-r border-[#eeeeef] bg-[#fafafb] p-4">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-7 h-7 rounded-[8px] bg-[#8279a9] flex items-center justify-center text-white text-xs font-bold">
                Q
              </div>

              <span className="text-[11px] font-semibold text-[#30323d]">
                Quizee
              </span>
            </div>

            {/* Main navigation */}
            <div className="space-y-1">
              <div className="px-3 py-2 rounded-lg text-[10px] text-[#8d8f99]">
                Dashboard
              </div>

              <div className="px-3 py-2 rounded-lg bg-[#ece9f6] text-[#665d8d] text-[10px] font-medium">
                My quizzes
              </div>

              <div className="px-3 py-2 rounded-lg text-[10px] text-[#8d8f99]">
                Results
              </div>
            </div>

            <div className="mt-8">
              <p className="px-3 mb-2 text-[8px] uppercase tracking-[0.14em] text-[#b1b2b8]">
                Recent
              </p>

              {[
                "Physics — Chapter 3",
                "Functions & Graphs",
                "Programming Basics",
              ].map((item) => (
                <div
                  key={item}
                  className="px-3 py-2 text-[9px] text-[#8d8f99] truncate"
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>

          {/* Main dashboard */}
          <div className="p-5 sm:p-7 bg-white">
            {/* Heading */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] text-[#9799a4]">
                  MY QUIZZES
                </p>

                <h3 className="mt-1 text-sm sm:text-base font-semibold text-[#292b35]">
                  Physics — Chapter 3
                </h3>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-[#e4e4e8] text-[9px] text-[#777984]">
                  Edit
                </button>

                <button className="px-3 py-1.5 rounded-lg bg-[#8279a9] text-white text-[9px]">
                  Share
                </button>
              </div>
            </div>

            {/* Small metadata */}
            <div className="flex items-center gap-3 mt-3 text-[9px] text-[#a0a1aa]">
              <span>12 questions</span>
              <span className="w-1 h-1 rounded-full bg-[#d2d2d6]" />
              <span>28 attempts</span>
              <span className="w-1 h-1 rounded-full bg-[#d2d2d6]" />
              <span>Updated today</span>
            </div>

            {/* Question */}
            <div className="mt-7 rounded-xl border border-[#e9e9ec] p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-medium text-[#8279a9]">
                  QUESTION 07
                </span>

                <span className="text-[9px] text-[#b0b1b8]">
                  Multiple choice
                </span>
              </div>

              <p className="text-xs sm:text-sm leading-6 font-medium text-[#30323d] max-w-lg">
                Which law explains why an object remains at rest or in
                motion unless acted upon by an external force?
              </p>

              <div className="mt-4 space-y-2">
                {[
                  "Newton's First Law",
                  "Newton's Second Law",
                  "Newton's Third Law",
                  "Law of Conservation",
                ].map((answer, index) => (
                  <div
                    key={answer}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
                      index === 0
                        ? "border-[#c8c1df] bg-[#f5f3fa]"
                        : "border-[#eeeeef]"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 shrink-0 rounded-md flex items-center justify-center text-[8px] font-semibold ${
                        index === 0
                          ? "bg-[#8279a9] text-white"
                          : "bg-[#f2f2f4] text-[#999aa3]"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span
                      className={`text-[9px] ${
                        index === 0
                          ? "text-[#55506e] font-medium"
                          : "text-[#888a94]"
                      }`}
                    >
                      {answer}
                    </span>

                    {index === 0 && (
                      <span className="ml-auto text-[8px] text-[#8279a9]">
                        Correct
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom stats */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                ["84%", "Average score"],
                ["28", "Attempts"],
                ["4m 12s", "Avg. time"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-lg bg-[#fafafa] border border-[#eeeeef] p-3"
                >
                  <p className="text-xs font-semibold text-[#3b3d47]">
                    {value}
                  </p>

                  <p className="mt-1 text-[8px] text-[#a1a2aa]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating result card */}
      <div className="absolute -right-3 sm:-right-8 bottom-10 w-[145px] rounded-xl border border-[#dedee5] bg-white p-3 shadow-[0_15px_40px_rgba(42,45,61,0.10)] hidden md:block">
        <p className="text-[8px] uppercase tracking-wider text-[#aaaab2]">
          Latest result
        </p>

        <div className="mt-2 flex items-end justify-between">
          <span className="text-xl font-semibold text-[#363844]">
            84%
          </span>

          <span className="text-[8px] text-[#6c8d79]">
            Good
          </span>
        </div>

        <div className="mt-2 h-1 rounded-full bg-[#eeecef] overflow-hidden">
          <div className="h-full w-[84%] rounded-full bg-[#9a91ba]" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FEATURE ICON
========================================================= */

function FeatureIcon({
  type,
}: {
  type: "create" | "results" | "analytics" | "share";
}) {
  if (type === "create") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 5h14M5 10h14M5 15h9M5 20h6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "results") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 19V10M10 19V5M15 19v-7M20 19V3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "analytics") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 17l5-5 4 3 7-8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 12h8M13 7l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function QuizeeLanding() {
  const features = [
    {
      type: "create" as const,
      title: "Create quizzes quickly",
      description:
        "Add questions, choose the answer type, and keep everything organized in one place.",
    },
    {
      type: "results" as const,
      title: "Check results instantly",
      description:
        "See scores as responses come in instead of collecting papers and calculating everything yourself.",
    },
    {
      type: "analytics" as const,
      title: "Understand the results",
      description:
        "See which questions were easy, which ones caused problems, and how your class performed.",
    },
    {
      type: "share" as const,
      title: "Share with one link",
      description:
        "Send your quiz to students with a simple link and let them get started without unnecessary steps.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create a quiz",
      description:
        "Start with a blank quiz and add the questions you need.",
    },
    {
      number: "02",
      title: "Share it",
      description:
        "Give your students the quiz link and let them join.",
    },
    {
      number: "03",
      title: "Review",
      description:
        "Come back to the results and see how everyone performed.",
    },
  ];

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

        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: #ded9ed;
          color: #292b35;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <header className="relative z-30">
        <nav className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[9px] bg-[#8279a9] flex items-center justify-center text-white text-sm font-bold">
                Q
              </div>

              <span className="font-display font-bold text-[17px] tracking-tight text-[#2d2f39]">
                Quizee
              </span>
            </a>

            <div className="hidden md:flex items-center gap-7 text-[13px]">
              <a
                href="#features"
                className="text-[#777984] hover:text-[#30323c] transition-colors"
              >
                Features
              </a>

              <a
                href="#how"
                className="text-[#777984] hover:text-[#30323c] transition-colors"
              >
                How it works
              </a>

              <a
                href="#about"
                className="text-[#777984] hover:text-[#30323c] transition-colors"
              >
                About
              </a>
            </div>

            <a
              href="/sign-in"
              className="inline-flex items-center gap-2 rounded-lg bg-[#30323c] px-4 py-2.5 text-[12px] font-medium text-white hover:bg-[#41434e] transition-colors"
            >
              Sign in
            </a>
          </div>
        </nav>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden">
        {/* Very subtle decorative shapes */}
        <div className="absolute top-24 -left-24 w-72 h-72 rounded-full bg-[#ebe8f4] blur-3xl opacity-70" />

        <div className="absolute top-40 -right-28 w-80 h-80 rounded-full bg-[#e8f0f3] blur-3xl opacity-60" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 sm:pt-24 pb-24 sm:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#dddde2] bg-white/70 text-[10px] font-medium text-[#777984]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8e86ad]" />
                A simple quiz platform
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="font-display mt-6 text-[44px] sm:text-[58px] lg:text-[68px] leading-[1.04] tracking-[-0.045em] font-extrabold text-[#292b35]">
                Quizzes without
                <br />
                <span className="text-[#8178a3]">
                  the extra work.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-6 max-w-xl mx-auto text-[15px] sm:text-base leading-7 text-[#747681]">
                Create quizzes, share them with your class, and check
                the results when you're done. Everything stays in one
                place.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3">
                <a
                  href="/sign-in"
                  className="w-full sm:w-auto h-11 px-6 rounded-lg bg-[#8279a9] text-white text-[13px] font-medium inline-flex items-center justify-center gap-2 hover:bg-[#746b9a] transition-colors shadow-sm"
                >
                  Create a quiz
                  <ArrowIcon />
                </a>

                <a
                  href="#features"
                  className="w-full sm:w-auto h-11 px-6 rounded-lg border border-[#dddddf] bg-white text-[#5f616c] text-[13px] font-medium inline-flex items-center justify-center hover:border-[#c9c9ce] transition-colors"
                >
                  See how it works
                </a>
              </div>
            </Reveal>
          </div>

          {/* Product */}
          <Reveal delay={280} className="mt-16 sm:mt-20">
            <ProductPreview />
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          SHORT INTRO
      ===================================================== */}

      <section
        id="about"
        className="border-y border-[#e8e8e5] bg-[#f2f1ee]"
      >
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-12">
            <div>
              <p className="text-xs font-semibold text-[#8178a3]">
                01
              </p>

              <p className="mt-2 text-sm font-medium text-[#383a44]">
                Make the quiz
              </p>

              <p className="mt-1.5 text-xs leading-5 text-[#85868e]">
                Build questions and organize them however you need.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#7895a4]">
                02
              </p>

              <p className="mt-2 text-sm font-medium text-[#383a44]">
                Send the link
              </p>

              <p className="mt-1.5 text-xs leading-5 text-[#85868e]">
                Share the quiz with your students in a few seconds.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#76917e]">
                03
              </p>

              <p className="mt-2 text-sm font-medium text-[#383a44]">
                See the results
              </p>

              <p className="mt-1.5 text-xs leading-5 text-[#85868e]">
                Review answers and understand how the class did.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section
        id="features"
        className="relative py-24 sm:py-32"
      >
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#8279a9]">
              What you can do
            </p>

            <h2 className="font-display mt-4 text-3xl sm:text-4xl font-bold tracking-[-0.035em] text-[#292b35]">
              Everything you need,
              <br />
              nothing you don't.
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-6 text-[#7b7d87]">
              Quizee keeps the whole process straightforward, from
              writing the first question to checking the final result.
            </p>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 70}>
                <div className="group h-full rounded-2xl border border-[#e3e3e1] bg-white p-6 sm:p-7 hover:border-[#d1cce0] hover:shadow-[0_12px_40px_rgba(60,57,75,0.06)] transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#f0eef6] text-[#8178a3] flex items-center justify-center group-hover:bg-[#e8e4f2] transition-colors">
                      <FeatureIcon type={feature.type} />
                    </div>

                    <span className="text-[10px] text-[#c0c0c5]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-display mt-6 text-[17px] font-bold text-[#30323d]">
                    {feature.title}
                  </h3>

                  <p className="mt-2.5 text-[13px] leading-6 text-[#7f8089]">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          ANALYTICS SECTION
      ===================================================== */}

      <section className="py-24 sm:py-32 bg-[#eeeff2]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#8279a9]">
                After the quiz
              </p>

              <h2 className="font-display mt-4 text-3xl sm:text-4xl font-bold tracking-[-0.035em] text-[#292b35]">
                Don't just see the score.
                <br />
                <span className="text-[#858691]">
                  See what it means.
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-[#777984]">
                A quiz gives you more than a number. Quizee helps you
                look at the answers, spot difficult questions, and get
                a clearer picture of where your students are struggling.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Question-level results",
                  "Automatic score calculation",
                  "Simple performance overview",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-[13px] text-[#62646f]"
                  >
                    <span className="w-6 h-6 rounded-full bg-white text-[#7e769f] flex items-center justify-center">
                      <CheckIcon />
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Analytics Card */}
            <Reveal delay={100}>
              <div className="relative">
                <div className="rounded-2xl border border-[#dedfe3] bg-white p-5 sm:p-6 shadow-[0_18px_50px_rgba(45,47,58,0.07)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-[#a1a2a9]">
                        Quiz results
                      </p>

                      <p className="mt-1 text-xl font-semibold text-[#363844]">
                        Physics — Chapter 3
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-[#f0eef6] text-[#8279a9] flex items-center justify-center">
                      <FeatureIcon type="analytics" />
                    </div>
                  </div>

                  {/* Score */}
                  <div className="mt-7 rounded-xl bg-[#f8f8f8] border border-[#ededed] p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[9px] text-[#a2a3aa]">
                          Average score
                        </p>

                        <p className="mt-1 text-3xl font-bold text-[#363844]">
                          84%
                        </p>
                      </div>

                      <span className="text-[10px] text-[#718b78]">
                        28 responses
                      </span>
                    </div>

                    {/* Bar */}
                    <div className="mt-5 h-2 rounded-full bg-[#e9e8e9] overflow-hidden">
                      <div className="w-[84%] h-full rounded-full bg-[#9b92b9]" />
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="mt-4">
                    <p className="text-[9px] uppercase tracking-wider text-[#a1a2a9] mb-3">
                      Question performance
                    </p>

                    {[
                      ["Q1", "92%"],
                      ["Q2", "81%"],
                      ["Q3", "74%"],
                      ["Q4", "91%"],
                    ].map(([question, score]) => (
                      <div
                        key={question}
                        className="flex items-center gap-3 py-2"
                      >
                        <span className="w-6 text-[9px] text-[#999aa3]">
                          {question}
                        </span>

                        <div className="flex-1 h-1.5 rounded-full bg-[#eeeeef] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#b1aac8]"
                            style={{ width: score }}
                          />
                        </div>

                        <span className="w-7 text-right text-[9px] text-[#777984]">
                          {score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section
        id="how"
        className="py-24 sm:py-32 bg-[#f8f8f6]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="max-w-xl">
            <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#8279a9]">
              How it works
            </p>

            <h2 className="font-display mt-4 text-3xl sm:text-4xl font-bold tracking-[-0.035em]">
              Three steps.
              <br />
              That's really it.
            </h2>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-3 gap-10 md:gap-6">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 100}>
                <div className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-5 left-[58px] right-[-30px] border-t border-dashed border-[#d8d8d6]" />
                  )}

                  <div className="relative w-10 h-10 rounded-xl bg-white border border-[#dededb] flex items-center justify-center text-[10px] font-semibold text-[#8279a9]">
                    {step.number}
                  </div>

                  <h3 className="font-display mt-6 text-lg font-bold text-[#343640]">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 max-w-xs text-[13px] leading-6 text-[#80818a]">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-6 pb-24 sm:pb-32">
        <Reveal>
          <div className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl bg-[#e9e6f2] border border-[#ded9eb]">
            {/* Soft decorations */}
            <div className="absolute -top-24 -right-20 w-64 h-64 rounded-full bg-[#dcd6eb] blur-3xl" />

            <div className="relative px-7 sm:px-14 py-16 sm:py-20 text-center">
              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#8279a9]">
                Get started
              </p>

              <h2 className="font-display mt-4 text-3xl sm:text-5xl font-bold tracking-[-0.04em] text-[#30323c]">
                Ready to make your next
                <br />
                quiz a little easier?
              </h2>

              <p className="mt-5 max-w-md mx-auto text-sm leading-6 text-[#777583]">
                Create a quiz, share it with your class, and let Quizee
                take care of the rest.
              </p>

              <a
                href="/sign-in"
                className="mt-8 inline-flex h-11 px-6 items-center gap-2 rounded-lg bg-[#30323c] text-white text-[13px] font-medium hover:bg-[#41434e] transition-colors"
              >
                Get started
                <ArrowIcon />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-[#e5e5e2] bg-[#f4f4f1]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <a href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-[8px] bg-[#8279a9] flex items-center justify-center text-white text-xs font-bold">
                Q
              </div>

              <span className="font-display font-bold text-sm text-[#343640]">
                Quizee
              </span>
            </a>

            <div className="flex items-center gap-6 text-xs text-[#8a8b93]">
              <a
                href="#features"
                className="hover:text-[#4e505b] transition-colors"
              >
                Features
              </a>

              <a
                href="#how"
                className="hover:text-[#4e505b] transition-colors"
              >
                How it works
              </a>

              <a
                href="/sign-in"
                className="hover:text-[#4e505b] transition-colors"
              >
                Sign in
              </a>
            </div>

            <p className="text-[11px] text-[#a0a1a8]">
              © 2026 Quizee
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}