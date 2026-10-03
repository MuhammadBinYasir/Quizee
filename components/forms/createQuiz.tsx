"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowLeft,
  Loader2,
  Globe,
  Lock,
  Layers,
  Upload,
} from "lucide-react";
import { createQuiz, updateQuiz } from "@/lib/action/quiz.action";

interface QuestionData {
  question: string;
  options: string[];
  ans: string;
}

interface CreateQuizProps {
  user: {
    userId: string;
  };
  data?: {
    id: string;
    title: string;
    desc: string;
    category: string;
    visibility: string;
    questions: QuestionData[];
  };
}

const CATEGORIES = [
  "General Knowledge",
  "Technology",
  "Educational",
  "Science",
  "Mathematics",
  "History",
  "Entertainment",
  "Sports",
  "Games & Puzzles",
];

export default function CreateQuiz({ user, data }: CreateQuizProps) {
  const router = useRouter();

  const [title, setTitle] = useState(data?.title || "");
  const [desc, setDesc] = useState(data?.desc || "");
  const [category, setCategory] = useState(data?.category || "Technology");
  const [visibility, setVisibility] = useState(data?.visibility || "public");
  const [questions, setQuestions] = useState<QuestionData[]>(
    data?.questions && data.questions.length > 0
      ? data.questions
      : [
          {
            question: "",
            options: ["", "", "", ""],
            ans: "1",
          },
        ]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleJSONUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.desc) setDesc(parsed.desc);
        if (parsed.category) setCategory(parsed.category);
        if (parsed.visibility) setVisibility(parsed.visibility);
        if (Array.isArray(parsed.questions)) {
          setQuestions(
            parsed.questions.map((q: any) => ({
              question: q.question || "",
              options: Array.isArray(q.options) ? q.options : ["", "", "", ""],
              ans: q.ans || "1",
            }))
          );
        }
      } catch (err) {
        setError("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
    // Reset the input so the same file can be re-uploaded
    e.target.value = "";
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        question: "",
        options: ["", "", "", ""],
        ans: "1",
      },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length <= 1) {
      setError("A quiz must have at least one question.");
      return;
    }
    setError(null);
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleQuestionTextChange = (index: number, text: string) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[index].question = text;
      return copy;
    });
  };

  const handleOptionChange = (
    qIndex: number,
    optIndex: number,
    value: string
  ) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIndex].options[optIndex] = value;
      return copy;
    });
  };

  const handleCorrectAnswerChange = (qIndex: number, optNumberStr: string) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIndex].ans = optNumberStr;
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validations
    if (!title.trim()) {
      setError("Please enter a quiz title.");
      return;
    }
    if (!desc.trim()) {
      setError("Please provide a short description for your quiz.");
      return;
    }
    if (questions.length === 0) {
      setError("Please add at least one question.");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        setError(`Question ${i + 1} cannot be blank.`);
        return;
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          setError(`Option ${String.fromCharCode(65 + j)} for Question ${i + 1} cannot be blank.`);
          return;
        }
      }
    }

    setLoading(true);

    try {
      if (data?.id) {
        const res = await updateQuiz({
          id: data.id,
          title: title.trim(),
          desc: desc.trim(),
          category,
          visibility,
          questions,
          total: questions.length,
          userId: user.userId,
        });

        if (res === "ok") {
          window.location.href = "/dashboard";
        } else {
          setError("Failed to update quiz. Please try again.");
          setLoading(false);
        }
      } else {
        const res = await createQuiz({
          title: title.trim(),
          desc: desc.trim(),
          category,
          visibility,
          questions,
          total: questions.length,
          userId: user.userId,
        });

        if (res === "ok") {
          window.location.href = "/dashboard";
        } else {
          setError("Failed to create quiz. Please try again.");
          setLoading(false);
        }
      }
    } catch (err: any) {
      console.error("Quiz submit error:", err);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center justify-between">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-800 text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* =====================================================
          SECTION 1: QUIZ ESSENTIALS
      ===================================================== */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 pb-2 border-b border-[#eeeeeb]">
          <Sparkles className="w-4 h-4 text-[#8279a9]" />
          <h2 className="font-display font-bold text-base text-[#353640]">
            1. Quiz Details
          </h2>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#525460] mb-2">
            Quiz Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Introduction to Physics: Newton's Laws"
            required
            className="w-full h-11 px-4 rounded-xl border border-[#dedee2] bg-[#fafaf8] text-sm text-[#33353f] placeholder:text-[#a6a7b0] outline-none focus:border-[#8279a9] focus:bg-white focus:ring-2 focus:ring-[#8279a9]/10 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#525460] mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Provide brief context or instructions for your students taking this quiz..."
            required
            className="w-full p-4 rounded-xl border border-[#dedee2] bg-[#fafaf8] text-sm text-[#33353f] placeholder:text-[#a6a7b0] outline-none focus:border-[#8279a9] focus:bg-white focus:ring-2 focus:ring-[#8279a9]/10 transition resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#525460] mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-[#dedee2] bg-[#fafaf8] text-xs font-medium text-[#33353f] outline-none focus:border-[#8279a9] focus:bg-white transition"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#525460] mb-2">
              Visibility
            </label>
            <div className="grid grid-cols-2 gap-2 h-11">
              <button
                type="button"
                onClick={() => setVisibility("public")}
                className={`flex items-center justify-center gap-2 rounded-xl text-xs font-medium border transition ${
                  visibility === "public"
                    ? "bg-[#f0eef6] border-[#8279a9] text-[#706891] font-semibold"
                    : "border-[#dedee2] bg-[#fafaf8] text-[#787a85] hover:bg-white"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Public</span>
              </button>

              <button
                type="button"
                onClick={() => setVisibility("private")}
                className={`flex items-center justify-center gap-2 rounded-xl text-xs font-medium border transition ${
                  visibility === "private"
                    ? "bg-[#f0eef6] border-[#8279a9] text-[#706891] font-semibold"
                    : "border-[#dedee2] bg-[#fafaf8] text-[#787a85] hover:bg-white"
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Private</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          IMPORT FROM JSON
      ===================================================== */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#eeeeeb]">
          <Upload className="w-4 h-4 text-[#8279a9]" />
          <h2 className="font-display font-bold text-base text-[#353640]">
            Import from JSON
          </h2>
        </div>

        <p className="text-xs text-[#7d7f8a]">
          Upload a <code className="bg-[#f0eef6] text-[#8279a9] px-1.5 py-0.5 rounded font-mono text-[11px]">.json</code> file matching the format below to bulk-import your quiz data.
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="h-10 px-4 rounded-xl bg-[#8279a9] text-white text-xs font-semibold inline-flex items-center gap-2 hover:bg-[#746b9a] active:scale-[0.97] transition shadow-xs"
          >
            <Upload className="w-4 h-4" />
            Choose JSON File
          </button>
          <input
            type="file"
            accept=".json"
            ref={fileInputRef}
            onChange={handleJSONUpload}
            className="hidden"
          />
        </div>

        <details className="group">
          <summary className="cursor-pointer text-xs font-semibold text-[#8279a9] select-none hover:underline">
            View sample JSON format
          </summary>
          <pre className="mt-2 p-4 rounded-xl border border-[#e3e3e0] bg-[#fafaf8] text-[11px] font-mono text-[#525460] overflow-x-auto leading-relaxed">
{`{
  "title": "Introduction to Physics",
  "desc": "Test your knowledge of Newton's Laws",
  "category": "Science",
  "visibility": "public",
  "questions": [
    {
      "question": "What is Newton's first law?",
      "options": [
        "Law of Inertia",
        "Law of Acceleration",
        "Law of Reaction",
        "Law of Gravity"
      ],
      "ans": "1"
    },
    {
      "question": "F = ma is which law?",
      "options": [
        "First Law",
        "Second Law",
        "Third Law",
        "Zeroth Law"
      ],
      "ans": "2"
    }
  ]
}`}
          </pre>
        </details>
      </div>

      {/* =====================================================
          SECTION 2: QUESTIONS BUILDER
      ===================================================== */}
      <div className="space-y-5 pt-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#eeeeeb]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#8279a9]" />
            <h2 className="font-display font-bold text-base text-[#353640]">
              2. Questions ({questions.length})
            </h2>
          </div>

          <button
            type="button"
            onClick={handleAddQuestion}
            className="h-9 px-3.5 rounded-lg bg-[#8279a9] text-white text-xs font-medium inline-flex items-center gap-1.5 hover:bg-[#746b9a] transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Question</span>
          </button>
        </div>

        <div className="space-y-6">
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="bg-[#fbfbfa] rounded-2xl border border-[#dedee2] p-5 sm:p-6 transition hover:border-[#cbc6dc]"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#8279a9] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {String(qIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8279a9]">
                    Question {qIndex + 1}
                  </span>
                </div>

                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(qIndex)}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition"
                    title="Delete question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Question Prompt */}
              <div className="mb-5">
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionTextChange(qIndex, e.target.value)
                  }
                  placeholder="Enter the question prompt here..."
                  required
                  className="w-full h-11 px-4 rounded-xl border border-[#dedee2] bg-white text-sm text-[#33353f] placeholder:text-[#a6a7b0] outline-none focus:border-[#8279a9] focus:ring-2 focus:ring-[#8279a9]/10 transition"
                />
              </div>

              {/* Options & Correct Answer Selector */}
              <div>
                <p className="text-[11px] font-semibold text-[#7d7f8a] uppercase tracking-wider mb-2.5">
                  Answer Options & Correct Key (Click the radio to set correct answer)
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, optIndex) => {
                    const optKey = String(optIndex + 1);
                    const isCorrect = q.ans === optKey;
                    const letter = String.fromCharCode(65 + optIndex);

                    return (
                      <div
                        key={optIndex}
                        className={`flex items-center gap-2.5 p-2 rounded-xl border transition ${
                          isCorrect
                            ? "border-[#8279a9] bg-[#f2eff9]"
                            : "border-[#e3e3e6] bg-white"
                        }`}
                      >
                        {/* Radio select button */}
                        <button
                          type="button"
                          onClick={() =>
                            handleCorrectAnswerChange(qIndex, optKey)
                          }
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition ${
                            isCorrect
                              ? "bg-[#8279a9] text-white shadow-xs"
                              : "bg-[#eeeeef] text-[#8e909a] hover:bg-[#dedee3]"
                          }`}
                          title={
                            isCorrect
                              ? "Correct Answer"
                              : `Set option ${letter} as correct answer`
                          }
                        >
                          {letter}
                        </button>

                        {/* Option text input */}
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) =>
                            handleOptionChange(
                              qIndex,
                              optIndex,
                              e.target.value
                            )
                          }
                          placeholder={`Option ${letter}...`}
                          required
                          className="w-full h-8 px-2 bg-transparent text-xs text-[#33353f] placeholder:text-[#b0b1b8] outline-none font-medium"
                        />

                        {isCorrect && (
                          <span className="text-[10px] font-semibold text-[#8279a9] px-2 py-0.5 rounded bg-white shrink-0 shadow-2xs">
                            Correct
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add more button */}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="w-full py-3.5 rounded-2xl border-2 border-dashed border-[#dcd9eb] bg-[#f9f8fc] hover:bg-[#f2eff8] hover:border-[#8279a9]/60 text-xs font-semibold text-[#8279a9] flex items-center justify-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Another Question</span>
        </button>
      </div>

      {/* =====================================================
          SUBMIT ACTIONS
      ===================================================== */}
      <div className="pt-6 border-t border-[#eeeeeb] flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="h-11 px-5 rounded-xl border border-[#dddddf] bg-white text-xs font-semibold text-[#666874] hover:bg-[#fafaf8] transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="h-11 px-7 rounded-xl bg-[#30323c] hover:bg-[#41434e] text-white text-xs font-semibold inline-flex items-center gap-2 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-xs"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Quiz...</span>
            </>
          ) : (
            <span>{data?.id ? "Update Quiz" : "Publish Quiz"}</span>
          )}
        </button>
      </div>
    </form>
  );
}