"use client";

import { useState } from "react";

const roles = [
  {
    id: "teacher",
    title: "Teacher",
    description: "I create quizzes for my students.",
  },
  {
    id: "student",
    title: "Student",
    description: "I take quizzes and review my results.",
  },
  {
    id: "other",
    title: "Something else",
    description: "I'm exploring Quizee for another use.",
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f8f6] text-[#292b35]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-[#e7e7e4] bg-white/70">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[9px] bg-[#8279a9] flex items-center justify-center text-white text-sm font-bold">
              Q
            </div>

            <span className="font-display font-bold text-[16px]">
              Quizee
            </span>
          </a>

          <span className="text-[11px] text-[#999aa2]">
            Step {step} of 3
          </span>
        </div>
      </header>

      {/* =====================================================
          PROGRESS
      ===================================================== */}

      <div className="max-w-5xl mx-auto px-6 pt-7">
        <div className="h-1 rounded-full bg-[#e8e7e5] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#8279a9] transition-all duration-500"
            style={{
              width: `${(step / 3) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="max-w-xl mx-auto px-6 py-16 sm:py-20">

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#8279a9]">
              Welcome to Quizee
            </p>

            <h1 className="font-display mt-4 text-3xl sm:text-4xl font-bold tracking-[-0.04em]">
              Let's get things
              <br />
              set up.
            </h1>

            <p className="mt-4 text-sm leading-6 text-[#7d7e87]">
              A couple of quick questions will help us set up Quizee
              around the way you plan to use it.
            </p>

            <button
              onClick={nextStep}
              className="mt-9 h-11 px-6 rounded-lg bg-[#30323c] text-white text-sm font-medium hover:bg-[#41434e] transition-colors"
            >
              Let's begin →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#8279a9]">
              A little about you
            </p>

            <h1 className="font-display mt-4 text-3xl sm:text-4xl font-bold tracking-[-0.04em]">
              How will you use
              <br />
              Quizee?
            </h1>

            <p className="mt-4 text-sm text-[#7d7e87]">
              Choose the option that best describes you.
            </p>

            <div className="mt-8 space-y-3">
              {roles.map((item) => {
                const selected = role === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setRole(item.id)}
                    className={`w-full text-left rounded-xl border p-4 transition-all ${
                      selected
                        ? "border-[#aaa2c3] bg-[#f0eef6]"
                        : "border-[#dededc] bg-white hover:border-[#cfcfd0]"
                    }`}
                  >
                    <div className="flex items-start gap-3">

                      <div
                        className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${
                          selected
                            ? "border-[#8279a9]"
                            : "border-[#c5c5c8]"
                        }`}
                      >
                        {selected && (
                          <div className="w-2 h-2 rounded-full bg-[#8279a9]" />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-[#3b3d47]">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs text-[#898a92]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={previousStep}
                className="h-11 px-5 rounded-lg border border-[#dddddf] bg-white text-sm text-[#666873] hover:bg-[#fafafa]"
              >
                Back
              </button>

              <button
                onClick={nextStep}
                disabled={!role}
                className="h-11 px-6 rounded-lg bg-[#30323c] text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#41434e] transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#8279a9]">
              Almost there
            </p>

            <h1 className="font-display mt-4 text-3xl sm:text-4xl font-bold tracking-[-0.04em]">
              What should we
              <br />
              call your workspace?
            </h1>

            <p className="mt-4 text-sm leading-6 text-[#7d7e87]">
              This is usually your name, school, class, or organization.
              You can change it later.
            </p>

            <div className="mt-8">
              <label
                htmlFor="workspace"
                className="block text-xs font-medium text-[#555762] mb-2"
              >
                Workspace name
              </label>

              <input
                id="workspace"
                type="text"
                placeholder="e.g. My Classroom"
                className="w-full h-11 rounded-lg border border-[#dddddf] bg-white px-3.5 text-sm outline-none placeholder:text-[#b4b5bb] focus:border-[#aaa2c3] focus:ring-2 focus:ring-[#aaa2c3]/10 transition"
              />
            </div>

            {/* Preview */}
            <div className="mt-6 rounded-xl border border-[#e2e2df] bg-[#f3f2ef] p-4">
              <p className="text-[9px] uppercase tracking-wider text-[#a0a1a8]">
                Your workspace
              </p>

              <div className="mt-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#deddd9] flex items-center justify-center text-[#8279a9] font-semibold">
                  Q
                </div>

                <div>
                  <p className="text-xs font-medium text-[#4b4d57]">
                    Your workspace
                  </p>

                  <p className="text-[10px] text-[#999aa1]">
                    Ready to create your first quiz
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={previousStep}
                className="h-11 px-5 rounded-lg border border-[#dddddf] bg-white text-sm text-[#666873] hover:bg-[#fafafa]"
              >
                Back
              </button>

              <button
                className="h-11 px-6 rounded-lg bg-[#30323c] text-white text-sm font-medium hover:bg-[#41434e] transition-colors"
              >
                Finish setup
              </button>
            </div>
          </div>
        )}

      </section>
    </main>
  );
}