import React from "react";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

const QuizError = ({ error }: { error: string }) => {
  return (
    <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
        <ShieldAlert className="w-6 h-6 text-red-400" />
      </div>

      <div>
        <h3
          className="font-bold text-sm text-[#353640]"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Access Restricted
        </h3>
        <p className="text-xs text-[#82838c] mt-1 max-w-xs leading-5">
          {error}
        </p>
      </div>

      <Link
        href="/dashboard"
        className="h-9 px-4 rounded-xl border border-[#dddddf] bg-white text-xs font-semibold text-[#5a5c66] hover:bg-[#fafaf8] transition inline-flex items-center gap-1.5 shadow-2xs mt-2"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Dashboard</span>
      </Link>
    </div>
  );
};

export default QuizError;