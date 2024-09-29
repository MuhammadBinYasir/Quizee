import QuizCard from '@/components/quiz/Card';
import Dashboardlay from '@/components/reusable/Dashboardlay';
import { fetchUser } from '@/lib/action/user.action';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react'
import { CiCirclePlus } from "react-icons/ci";


const page = async () => {
  const c_user = await currentUser();
  if (!c_user) return;
  const user = await fetchUser({ clerkId: c_user?.id })
  if(user == "no-user") return;
  return (
    <Dashboardlay title={`Welcome ${user.firstname},`} desc={'Would you like to create a new quiz? Edit the existing one?'}>
      <div className="flex items-center flex-wrap gap-2 mt-2">
        <div className="flex bg-emerald-100 opacity-70 px-2 py-1 rounded-full text-xs text-emerald-900">{user.user.quiz.length} Quizzes</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <Link href={`/dashboard/create`} className="flex items-center justify-center rounded overflow-hidden bg-white shadow-md text-slate-900 flex-col gap-2 min-h-32">
          <CiCirclePlus className="text-5xl" />
          <h4 className="text-sm">Create a New One</h4>
        </Link>
        {/* {console.log(user.user.quiz)} */}
        {user.user.quiz.map((item: any, index: any) => (
          <QuizCard
            key={index}
            title={item.title}
            desc={item.desc}
            category={item.category}
            visibility={item.visibility}
            ratio={item.ratio}
            attempt={item.takens.length}
            total={item.total}
            id={item._id}
          />
        ))}
      </div>
    </Dashboardlay >
  )
}

export default page