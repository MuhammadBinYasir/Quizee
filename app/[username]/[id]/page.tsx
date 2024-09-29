import React from 'react'
import QuizCard from '@/components/quiz/QuizCard';
import { fetchQuiz } from '@/lib/action/quiz.action';
import { fetchUser, hasTakenQuiz } from '@/lib/action/user.action';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { FaLongArrowAltRight } from 'react-icons/fa';
import QuizError from '@/components/quiz/QuizError';

const page = async ({ params }: { params: { username: string, id: string } }) => {

    const data = await fetchQuiz({ id: params.id })
    const CuUser = await currentUser();
    if (!CuUser) redirect("/");
    const user = await fetchUser({ clerkId: CuUser.id })
    if(user == "no-user") return;
    const takenQuiz = await hasTakenQuiz({
        userId: user.user._id,
        quizId: data._id,
    });

    return (
        <div className='w-full min-h-screen bg-primaryColor flex items-center justify-center'>
            <div className="w-[450px] p-5 rounded shadow bg-white ">
                <div className="text-center border-b border-b-slate-100 p-5">
                    <h4 className="text-xl text-slate-900 font-bold">Quizee.com</h4>
                    <p className="text-xs text-slate-700 mt-1">The Best Ever Quiz Platform For Learners.</p>
                </div>
                {takenQuiz == "exist" ?
                    <QuizError error="You have already taken quiz. You can't retake it." />
                    : data.visibility == "private" ? <QuizError error="OOPS! It's a Private Quiz. You can't take it." /> : <QuizCard data={data.questions} userId={user.user._id} quizId={data._id} />
                }
                <div className="text-center border-t border-b-slate-100 p-5">
                    <p className="text-xs text-slate-700 mt-1">The Quiz is created by {" "}
                        <Link href={`/${data.userId.username}`} className="text-slate-900 font-semibold">
                            {data.userId.name}</Link></p>
                </div>
            </div>
        </div>
    );
}

export default page