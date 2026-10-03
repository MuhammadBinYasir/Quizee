"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError("Please enter your email or username.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to log in. Please try again.");
        setIsLoading(false);
        return;
      }

      // Hard redirect to ensure browser attaches cookies and triggers layout re-fetch
      window.location.href = redirectUrl;
    } catch (err: any) {
      console.error("Login request error:", err);
      setError("Network error. Please verify your connection and try again.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f8f6] text-[#292b35] flex">
      {/* =====================================================
          LEFT SIDE
      ===================================================== */}
      <section className="hidden lg:flex lg:w-[48%] relative overflow-hidden bg-[#eeedf3]">
        {/* Soft decorations */}
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#ddd9eb] blur-3xl opacity-70" />
        <div className="absolute bottom-[-120px] right-[-80px] w-[380px] h-[380px] rounded-full bg-[#e1ebef] blur-3xl opacity-70" />

        <div className="relative z-10 w-full p-12 flex flex-col">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[10px] bg-[#8279a9] flex items-center justify-center text-white font-bold">
              Q
            </div>
            <span className="font-display font-bold text-lg">Quizee</span>
          </Link>

          {/* Center content */}
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-md">
              <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#8279a9]">
                Welcome back
              </p>

              <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.04em] leading-tight">
                Pick up where
                <br />
                you left off.
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#777984]">
                Your quizzes, questions, and results are waiting for you. Sign in to
                continue managing your classroom.
              </p>

              {/* Mini product card */}
              <div className="mt-10 rounded-2xl border border-[#dddbe4] bg-white/80 p-5 shadow-[0_15px_45px_rgba(50,48,65,.06)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-[#a0a1a8]">
                      Recent quiz
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#363844]">
                      Physics — Chapter 3
                    </p>
                  </div>

                  <span className="text-[9px] px-2 py-1 rounded-full bg-[#edf3ee] text-[#718879]">
                    Active
                  </span>
                </div>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-[#343640]">84%</p>
                    <p className="text-[9px] text-[#a0a1a8] mt-1">Average score</p>
                  </div>

                  <div className="w-32">
                    <div className="flex items-end gap-1 h-10">
                      {[35, 48, 42, 61, 55, 70, 66, 82].map((height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-sm bg-[#aaa3c2]"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#9b9ca4]">
            Simple quiz management for classrooms.
          </p>
        </div>
      </section>

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}
      <section className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[390px]">
          {/* Mobile logo */}
          <div className="lg:hidden mb-12">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[9px] bg-[#8279a9] flex items-center justify-center text-white font-bold">
                Q
              </div>
              <span className="font-display font-bold">Quizee</span>
            </Link>
          </div>

          <div>
            <h1 className="font-display text-3xl font-bold tracking-[-0.035em]">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-[#858690]">
              Sign in to your Quizee account.
            </p>
          </div>

          {error && (
            <div className="mt-5 p-3.5 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="identifier"
                className="block text-xs font-medium text-[#555762] mb-2"
              >
                Email or Username
              </label>

              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@example.com or username"
                required
                disabled={isLoading}
                className="w-full h-11 rounded-lg border border-[#dddddf] bg-white px-3.5 text-sm text-[#33353f] outline-none placeholder:text-[#b4b5bb] focus:border-[#aaa2c3] focus:ring-2 focus:ring-[#aaa2c3]/10 transition disabled:opacity-60"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-[#555762]"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                  className="w-full h-11 rounded-lg border border-[#dddddf] bg-white px-3.5 pr-16 text-sm text-[#33353f] outline-none placeholder:text-[#b4b5bb] focus:border-[#aaa2c3] focus:ring-2 focus:ring-[#aaa2c3]/10 transition disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#898a93] hover:text-[#555762] transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-lg bg-[#30323c] text-white text-sm font-medium hover:bg-[#41434e] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="h-px flex-1 bg-[#e6e6e4]" />
            <span className="text-[10px] text-[#a2a3a9]">OR</span>
            <div className="h-px flex-1 bg-[#e6e6e4]" />
          </div>

          {/* Signup link */}
          <p className="text-center text-xs text-[#85868f]">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#716895] hover:underline"
            >
              Create one
            </Link>
          </p>

          <p className="mt-8 text-center text-[10px] leading-5 text-[#a5a6ac]">
            By continuing, you agree to Quizee's terms and privacy policy.
          </p>
        </div>
      </section>
    </main>
  );
}