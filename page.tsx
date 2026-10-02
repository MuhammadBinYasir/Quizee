"use client";

import { useState } from "react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#f8f8f6] text-[#292b35] flex">

      {/* =====================================================
          LEFT
      ===================================================== */}

      <section className="hidden lg:flex lg:w-[48%] relative overflow-hidden bg-[#edf1f2]">

        <div className="absolute -top-32 right-[-100px] w-[430px] h-[430px] rounded-full bg-[#dce8eb] blur-3xl opacity-80" />

        <div className="absolute bottom-[-150px] left-[-100px] w-[400px] h-[400px] rounded-full bg-[#e3dfef] blur-3xl opacity-70" />

        <div className="relative z-10 w-full p-12 flex flex-col">

          <a href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[10px] bg-[#8279a9] flex items-center justify-center text-white font-bold">
              Q
            </div>

            <span className="font-display font-bold text-lg">
              Quizee
            </span>
          </a>

          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-md">

              <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#7895a4]">
                Get started
              </p>

              <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.04em] leading-tight">
                A simpler way to
                <br />
                run your quizzes.
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#777e83]">
                Create your first quiz, invite your students, and
                start collecting results without a complicated setup.
              </p>

              <div className="mt-10 space-y-3">
                {[
                  "Create and organize quizzes",
                  "Share quizzes with a single link",
                  "Review results as they come in",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-[#626970]"
                  >
                    <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#7895a4]">
                      ✓
                    </span>

                    {item}
                  </div>
                ))}
              </div>

            </div>
          </div>

          <p className="text-xs text-[#9a9fa2]">
            Built to keep quiz management simple.
          </p>
        </div>
      </section>

      {/* =====================================================
          RIGHT
      ===================================================== */}

      <section className="flex-1 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-[390px]">

          <div className="lg:hidden mb-12">
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[9px] bg-[#8279a9] flex items-center justify-center text-white font-bold">
                Q
              </div>

              <span className="font-display font-bold">
                Quizee
              </span>
            </a>
          </div>

          <div>
            <h1 className="font-display text-3xl font-bold tracking-[-0.035em]">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-[#858690]">
              It only takes a minute to get started.
            </p>
          </div>

          <form className="mt-8 space-y-5">

            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-[#555762] mb-2"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full h-11 rounded-lg border border-[#dddddf] bg-white px-3.5 text-sm outline-none placeholder:text-[#b4b5bb] focus:border-[#aaa2c3] focus:ring-2 focus:ring-[#aaa2c3]/10 transition"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-[#555762] mb-2"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full h-11 rounded-lg border border-[#dddddf] bg-white px-3.5 text-sm outline-none placeholder:text-[#b4b5bb] focus:border-[#aaa2c3] focus:ring-2 focus:ring-[#aaa2c3]/10 transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-[#555762] mb-2"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  className="w-full h-11 rounded-lg border border-[#dddddf] bg-white px-3.5 pr-16 text-sm outline-none placeholder:text-[#b4b5bb] focus:border-[#aaa2c3] focus:ring-2 focus:ring-[#aaa2c3]/10 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#898a93]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-[#30323c] text-white text-sm font-medium hover:bg-[#41434e] transition-colors"
            >
              Create account
            </button>
          </form>

          <div className="flex items-center gap-4 my-7">
            <div className="h-px flex-1 bg-[#e6e6e4]" />

            <span className="text-[10px] text-[#a2a3a9]">
              OR
            </span>

            <div className="h-px flex-1 bg-[#e6e6e4]" />
          </div>

          <button
            type="button"
            className="w-full h-11 rounded-lg border border-[#dddddf] bg-white text-sm font-medium text-[#555762] hover:bg-[#fafafa] transition-colors flex items-center justify-center gap-2.5"
          >
            <span className="font-semibold">G</span>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-xs text-[#85868f]">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="font-medium text-[#716895] hover:underline"
            >
              Sign in
            </a>
          </p>

          <p className="mt-8 text-center text-[10px] leading-5 text-[#a5a6ac]">
            By creating an account, you agree to Quizee's terms and
            privacy policy.
          </p>

        </div>
      </section>
    </main>
  );
}