import React from 'react';
import QuizCard from '@/components/quiz/QuizCard';
import { fetchQuiz } from '@/lib/action/quiz.action';
import { hasTakenQuiz } from '@/lib/action/user.action';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import QuizError from '@/components/quiz/QuizError';
import {
  BookOpen,
  Clock,
  Layers,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const page = async ({ params }: { params: { username: string; id: string } }) => {
    const data = await fetchQuiz({ id: params.id });
    const user = await getCurrentUser();
    if (!user) redirect(`/login?redirect=/${params.username}/${params.id}`);

    const takenQuiz = await hasTakenQuiz({
        userId: user._id,
        quizId: data._id,
    });

    const questionsCount = data.questions?.length || 0;

    return (
        <main
            className="min-h-screen bg-[#f8f8f6] text-[#292b35] flex flex-col"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap');
                .font-display { font-family: 'Manrope', sans-serif; }
            `}</style>

            {/* ===== Sticky Header ===== */}
            <header className="h-14 bg-white/90 backdrop-blur-md border-b border-[#e8e8e5] sticky top-0 z-30">
                <div className="max-w-5xl mx-auto h-full px-5 flex items-center justify-between">
                    <Link href={`/${params.username}`} className="flex items-center gap-2 text-[#6e6f7a] hover:text-[#33353f] transition text-xs font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to profile</span>
                    </Link>

                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-[8px] bg-[#8279a9] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                            Q
                        </div>
                        <span className="font-display font-bold text-base text-[#2d2f39]">
                            Quizee
                        </span>
                    </Link>
                </div>
            </header>

            {/* ===== Main Content ===== */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative">
                {/* Decorative blurs */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[#ded9eb]/30 blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-[#e1ebef]/40 blur-3xl pointer-events-none" />

                <div className="relative w-[520px] max-w-full">
                    {/* Quiz Card Container */}
                    <div className="bg-white rounded-3xl border border-[#e3e3e0] shadow-[0_20px_60px_rgba(40,40,60,0.06)] overflow-hidden">

                        {/* Quiz Header Section — always shown */}
                        <div className="px-6 pt-6 pb-5 border-b border-[#eeeeec] bg-gradient-to-b from-[#faf9fc] to-white">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#f0eef6] text-[#8279a9] flex items-center justify-center shrink-0">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h1 className="font-display text-lg sm:text-xl font-bold text-[#2f313c] leading-snug line-clamp-2">
                                        {data.title || 'Quiz'}
                                    </h1>
                                    {data.desc && (
                                        <p className="text-xs text-[#82838c] mt-1 line-clamp-2 leading-5">
                                            {data.desc}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Meta pills */}
                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                {data.category && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f0eef6] text-[10px] font-semibold text-[#746b94]">
                                        <Layers className="w-3 h-3" />
                                        {data.category}
                                    </span>
                                )}
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#edf2ed] text-[10px] font-semibold text-[#5b7d65]">
                                    <ShieldCheck className="w-3 h-3" />
                                    {questionsCount} {questionsCount === 1 ? 'question' : 'questions'}
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f1eee7] text-[10px] font-semibold text-[#8b7d62]">
                                    <Clock className="w-3 h-3" />
                                    ~{Math.max(1, Math.ceil(questionsCount * 0.5))} min
                                </span>
                            </div>
                        </div>

                        {/* Quiz Body */}
                        <div className="px-6 py-5">
                            {takenQuiz === "exist" ? (
                                <QuizError error="You have already taken this quiz. You can't retake it." />
                            ) : data.visibility === "private" ? (
                                <QuizError error="OOPS! It's a Private Quiz. You can't take it." />
                            ) : (
                                <QuizCard data={data.questions} userId={user._id} quizId={data._id} />
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-[#eeeeec] bg-[#fafaf8]">
                            <p className="text-[11px] text-[#8e909a] text-center">
                                Quiz by{" "}
                                <Link
                                    href={`/${data.userId?.username}`}
                                    className="text-[#5a5c66] font-semibold hover:text-[#8279a9] transition"
                                >
                                    {data.userId?.name || "Author"}
                                </Link>
                                {" · "}
                                Powered by{" "}
                                <Link href="/" className="text-[#8279a9] font-semibold hover:underline">
                                    Quizee
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default page;