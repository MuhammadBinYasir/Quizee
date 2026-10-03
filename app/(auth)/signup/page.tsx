"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { name, username, email, password, confirmPassword } = formData;

    // Basic Validations
    if (!name.trim() || !username.trim() || !email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          username: username.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create account. Please try again.");
        setIsLoading(false);
        return;
      }

      // Successful registration
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Signup request error:", err);
      setError("Network error. Please check your connection and try again.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f8f6] text-[#292b35] flex">
      {/* =====================================================
          LEFT SIDE HERO / BRANDING
      ===================================================== */}
      <section className="hidden lg:flex lg:w-[48%] relative overflow-hidden bg-[#eeedf3]">
        {/* Soft decorations */}
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#ddd9eb] blur-3xl opacity-70" />
        <div className="absolute bottom-[-120px] right-[-80px] w-[380px] h-[380px] rounded-full bg-[#e1ebef] blur-3xl opacity-70" />

        <div className="relative z-10 w-full p-12 flex flex-col justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[10px] bg-[#8279a9] flex items-center justify-center text-white font-bold">
              Q
            </div>
            <span className="font-display font-bold text-lg">Quizee</span>
          </Link>

          {/* Center Content */}
          <div className="max-w-md my-auto">
            <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#8279a9]">
              Start in seconds
            </p>

            <h2 className="font-display mt-4 text-4xl font-bold tracking-[-0.04em] leading-tight">
              Create and share
              <br />
              quizzes seamlessly.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#777984]">
              Join educators, learners, and quiz enthusiasts. Build interactive
              assessments, track real-time analytics, and boost classroom engagement.
            </p>

            {/* Feature Highlights */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#50525e]">
                <CheckCircle2 className="w-4 h-4 text-[#8279a9] shrink-0" />
                <span>Instant quiz creation & automated scoring</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#50525e]">
                <CheckCircle2 className="w-4 h-4 text-[#8279a9] shrink-0" />
                <span>Comprehensive student & participant analytics</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#50525e]">
                <CheckCircle2 className="w-4 h-4 text-[#8279a9] shrink-0" />
                <span>Clean, modern and distraction-free experience</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#9b9ca4]">
            Simple quiz management for classrooms & teams.
          </p>
        </div>
      </section>

      {/* =====================================================
          RIGHT SIDE FORM
      ===================================================== */}
      <section className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[9px] bg-[#8279a9] flex items-center justify-center text-white font-bold">
                Q
              </div>
              <span className="font-display font-bold">Quizee</span>
            </Link>
          </div>

          <div>
            <h1 className="font-display text-3xl font-bold tracking-[-0.035em]">
              Create an account
            </h1>
            <p className="mt-2 text-sm text-[#858690]">
              Sign up today and start building quizzes.
            </p>
          </div>

          {error && (
            <div className="mt-5 p-3.5 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-[#555762] mb-1.5"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Muhammad Ali"
                required
                disabled={isLoading}
                className="w-full h-11 rounded-lg border border-[#dddddf] bg-white px-3.5 text-sm text-[#33353f] outline-none placeholder:text-[#b4b5bb] focus:border-[#aaa2c3] focus:ring-2 focus:ring-[#aaa2c3]/10 transition disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-xs font-medium text-[#555762] mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="muhammad_a"
                required
                disabled={isLoading}
                className="w-full h-11 rounded-lg border border-[#dddddf] bg-white px-3.5 text-sm text-[#33353f] outline-none placeholder:text-[#b4b5bb] focus:border-[#aaa2c3] focus:ring-2 focus:ring-[#aaa2c3]/10 transition disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-[#555762] mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                disabled={isLoading}
                className="w-full h-11 rounded-lg border border-[#dddddf] bg-white px-3.5 text-sm text-[#33353f] outline-none placeholder:text-[#b4b5bb] focus:border-[#aaa2c3] focus:ring-2 focus:ring-[#aaa2c3]/10 transition disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-[#555762] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-medium text-[#555762] mb-1.5"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                required
                disabled={isLoading}
                className="w-full h-11 rounded-lg border border-[#dddddf] bg-white px-3.5 text-sm text-[#33353f] outline-none placeholder:text-[#b4b5bb] focus:border-[#aaa2c3] focus:ring-2 focus:ring-[#aaa2c3]/10 transition disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-2 rounded-lg bg-[#30323c] text-white text-sm font-medium hover:bg-[#41434e] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-[#e6e6e4]" />
            <span className="text-[10px] text-[#a2a3a9]">OR</span>
            <div className="h-px flex-1 bg-[#e6e6e4]" />
          </div>

          {/* Login link */}
          <p className="text-center text-xs text-[#85868f]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#716895] hover:underline"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-6 text-center text-[10px] leading-5 text-[#a5a6ac]">
            By signing up, you agree to Quizee's terms and privacy policy.
          </p>
        </div>
      </section>
    </main>
  );
}
