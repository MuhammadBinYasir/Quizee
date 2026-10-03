"use client";

import React, { useEffect, useRef, useState } from "react";
import { updateTakens } from "@/lib/action/user.action";
import {
  ChevronRight,
  Trophy,
  Sparkles,
  CheckCircle2,
  XCircle,
  PartyPopper,
  Quote,
} from "lucide-react";

interface Question {
  data: {
    question: string;
    options: string[];
    ans: number;
  }[];
  userId: string;
  quizId: string;
}

const QuizCard = ({ data, userId, quizId }: Question) => {
  const [index, setIndex] = useState<number>(0);
  const [question, setQuestion] = useState<any>(data[index]);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [lock, setLock] = useState(false);
  const [count, setCount] = useState(0);
  const [finish, setFinish] = useState(false);

  const progress = data.length > 0 ? ((index + 1) / data.length) * 100 : 0;

  useEffect(() => {
    setQuestion(data[index]);
  }, [index, data]);

  const handleClick = (optIndex: number) => {
    if (lock) return;
    setLock(true);
    setSelectedAns(optIndex);
    if (question.ans - 1 === optIndex) {
      setCount((prev) => prev + 1);
    }
  };

  const updateTaken = async () => {
    const res = await updateTakens({
      userId,
      quizId,
      total: data.length,
      obtained: count,
    });
    if (res === "ok") {
      console.log("Data stored to database");
    } else {
      console.log("Error saving");
    }
  };

  const handleNext = async () => {
    if (!lock) return;
    if (index === data.length - 1) {
      setFinish(true);
      await updateTaken();
      return;
    }
    setIndex(index + 1);
    setLock(false);
    setSelectedAns(null);
  };

  const getOptionStyle = (optIndex: number) => {
    if (!lock) {
      return "border-[#e8e8e5] bg-[#fafaf8] hover:bg-[#f4f2f9] hover:border-[#cbc6dc] cursor-pointer";
    }

    const isCorrect = optIndex === question.ans - 1;
    const isSelected = optIndex === selectedAns;

    if (isCorrect) {
      return "border-[#81b98c] bg-[#edf8ef] ring-1 ring-[#81b98c]/30";
    }
    if (isSelected && !isCorrect) {
      return "border-red-300 bg-red-50 ring-1 ring-red-200/50";
    }
    return "border-[#e8e8e5] bg-[#fafaf8] opacity-50";
  };

  const getOptionIcon = (optIndex: number) => {
    if (!lock) return null;

    const isCorrect = optIndex === question.ans - 1;
    const isSelected = optIndex === selectedAns;

    if (isCorrect) {
      return <CheckCircle2 className="w-4 h-4 text-[#52885e] shrink-0" />;
    }
    if (isSelected && !isCorrect) {
      return <XCircle className="w-4 h-4 text-red-400 shrink-0" />;
    }
    return null;
  };

  const percentage = data.length > 0 ? Math.round((count / data.length) * 100) : 0;

  if (finish) {
    return (
      <div className="py-4 space-y-6 text-center">
        {/* Celebration Header */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f0eef6] to-[#e4dff4] flex items-center justify-center shadow-xs">
            <Trophy className="w-8 h-8 text-[#8279a9]" />
          </div>
        </div>

        <div>
          <h3 className="font-display text-xl font-extrabold text-[#2f313c]">
            Quiz Completed!
          </h3>
          <p className="text-xs text-[#82838c] mt-1">
            Here&apos;s how you did
          </p>
        </div>

        {/* Score Display */}
        <div className="mx-auto w-40 h-40 rounded-full border-[6px] border-[#eeeeec] flex items-center justify-center relative">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(${
                percentage >= 80
                  ? "#81b98c"
                  : percentage >= 50
                  ? "#c4a96a"
                  : "#e87171"
              } ${percentage * 3.6}deg, #eeeeec ${percentage * 3.6}deg)`,
              mask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #fff calc(100% - 6px))",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 6px), #fff calc(100% - 6px))",
            }}
          />
          <div className="text-center relative z-10">
            <p className="font-display text-3xl font-extrabold text-[#2f313c]">
              {count}
              <span className="text-base text-[#8e909a] font-bold">/{data.length}</span>
            </p>
            <p className="text-[10px] text-[#8e909a] font-medium mt-0.5">
              {percentage}% correct
            </p>
          </div>
        </div>

        {/* Performance Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold ${
            percentage >= 80
              ? "bg-[#edf3ee] text-[#52745a]"
              : percentage >= 50
              ? "bg-[#f7f3eb] text-[#8b7d62]"
              : "bg-red-50 text-red-600"
          }`}
        >
          {percentage >= 80 ? (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Excellent Performance!</span>
            </>
          ) : percentage >= 50 ? (
            <>
              <PartyPopper className="w-3.5 h-3.5" />
              <span>Good Effort!</span>
            </>
          ) : (
            <span>Keep Practicing!</span>
          )}
        </div>

        {/* Inspirational Quote */}
        <div className="mx-auto max-w-xs px-5 py-4 rounded-2xl bg-[#faf9fc] border border-[#e8e8e5]">
          <Quote className="w-4 h-4 text-[#c5bfdb] mx-auto mb-2" />
          <p className="text-[11px] text-[#666874] leading-5 italic">
            &ldquo;Education is the most powerful weapon which you can use to change the world.&rdquo;
          </p>
          <p className="text-[10px] text-[#8e909a] font-semibold mt-2">
            — Nelson Mandela
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[#8e909a]">
          Question {index + 1} of {data.length}
        </span>
        <span className="text-[11px] font-semibold text-[#8279a9]">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-[#eeeeec] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#8279a9] to-[#a89fd0] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Text */}
      <div className="pt-2">
        <h2 className="font-display text-base sm:text-[17px] font-bold text-[#2f313c] leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Options Grid */}
      <div className="space-y-2.5">
        {question.options.map((option: string, optIndex: number) => {
          const letter = String.fromCharCode(65 + optIndex);
          return (
            <button
              key={optIndex}
              type="button"
              disabled={lock}
              onClick={() => handleClick(optIndex)}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${getOptionStyle(
                optIndex
              )} ${lock ? "cursor-default" : ""}`}
            >
              {/* Letter badge */}
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition ${
                  lock && optIndex === question.ans - 1
                    ? "bg-[#81b98c] text-white"
                    : lock && optIndex === selectedAns
                    ? "bg-red-400 text-white"
                    : selectedAns === optIndex && !lock
                    ? "bg-[#8279a9] text-white"
                    : "bg-[#eeeeec] text-[#8e909a]"
                }`}
              >
                {letter}
              </span>

              {/* Option text */}
              <span className="flex-1 text-xs sm:text-sm font-medium text-[#3a3c48]">
                {option}
              </span>

              {/* Feedback icon */}
              {getOptionIcon(optIndex)}
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="pt-3 flex items-center justify-between">
        <span className="text-[11px] text-[#8e909a]">
          {count} correct so far
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={!lock}
          className={`h-10 px-5 rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition shadow-xs ${
            lock
              ? "bg-[#30323c] hover:bg-[#41434e] text-white"
              : "bg-[#eeeeec] text-[#a6a7b0] cursor-not-allowed"
          }`}
        >
          <span>{index === data.length - 1 ? "Finish" : "Next"}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default QuizCard;