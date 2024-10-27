import QuizCardLoading from '@/components/loading/Card';
import QuizCard from '@/components/quiz/Card';
import Dashboardlay from '@/components/reusable/Dashboardlay';
import { fetchQuiz } from '@/lib/action/quiz.action';
import { fetchUser } from '@/lib/action/user.action';
import { checkAvg, checkUserAvg } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import React, { Suspense } from 'react'
import { CiCirclePlus } from "react-icons/ci";


const page = async () => {
  const c_user = await currentUser();
  if (!c_user) return;
  const user = await fetchUser({ clerkId: c_user?.id })
  if (user == "no-user") return;

  const avg_result = await checkUserAvg(user.user.takens)

  return (
    <Dashboardlay title={`Welcome ${user.firstname},`} desc={'Would you like to create a new quiz? Edit the existing one?'}>
      <div className="flex items-center flex-wrap gap-2 mt-2">
        <div className="flex bg-sky-200 opacity-70 px-2 py-1 rounded-full text-xs text-sky-800">{user.user.quiz.length} Quizzes</div>
        <div className="flex bg-sky-200 opacity-70 px-2 py-1 rounded-full text-xs text-sky-800">{avg_result}% Avg. Result</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
        <Link href={`/dashboard/create`} className="flex items-center justify-center rounded overflow-hidden bg-white shadow-lg text-slate-900 flex-col gap-2 min-h-44">
          <CiCirclePlus className="text-5xl" />
          <h4 className="text-sm">Create a New One</h4>
        </Link>

        {user.user.quiz.map((item: any, index: any) => (
          <Suspense fallback={<QuizCardLoading />} key={index}>
            <QuizCard
              key={index}
              title={item.title}
              desc={item.desc}
              category={item.category}
              visibility={item.visibility}
              ratio={item.takens}
              attempt={item.takens.length}
              total={item.total}
              id={item._id}
            />
          </Suspense>
        ))}
      </div>
    </Dashboardlay >
  )
}

export default page