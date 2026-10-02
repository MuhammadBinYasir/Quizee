import React from 'react';
import QuizCard from '@/components/quiz/QuizCard';
import { fetchQuiz } from '@/lib/action/quiz.action';
import { hasTakenQuiz } from '@/lib/action/user.action';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import QuizError from '@/components/quiz/QuizError';

const page = async ({ params }: { params: { username: string; id: string } }) => {
    const data = await fetchQuiz({ id: params.id });
    const user = await getCurrentUser();
    if (!user) redirect(`/login?redirect=/${params.username}/${params.id}`);
    
    const takenQuiz = await hasTakenQuiz({
        userId: user._id,
        quizId: data._id,
    });

    return (
        <div className='w-full min-h-screen bg-[#f8f8f6] flex items-center justify-center p-4'>
            <div className="w-[450px] max-w-full p-6 rounded-2xl shadow-lg border border-[#e3e3e0] bg-white">
                <div className="text-center border-b border-b-slate-100 pb-5">
                    <h4 className="text-xl text-slate-900 font-bold">Quizee</h4>
                    <p className="text-xs text-slate-500 mt-1">Interactive Quiz Platform</p>
                </div>
                {takenQuiz === "exist" ? (
                    <QuizError error="You have already taken this quiz. You can't retake it." />
                ) : data.visibility === "private" ? (
                    <QuizError error="OOPS! It's a Private Quiz. You can't take it." />
                ) : (
                    <QuizCard data={data.questions} userId={user._id} quizId={data._id} />
                )}
                <div className="text-center border-t border-slate-100 pt-4 mt-4">
                    <p className="text-xs text-slate-500">
                        Quiz created by{" "}
                        <Link href={`/${data.userId?.username}`} className="text-slate-800 font-semibold hover:underline">
                            {data.userId?.name || "Author"}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default page;