import CreateQuiz from '@/components/forms/createQuiz';
import { fetchUser } from '@/lib/action/user.action'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {
    const c_user = await currentUser();
    if (!c_user) return;
    const user = await fetchUser({ clerkId: c_user?.id })
    if(user == "no-user") return;
    const userData = {
        userId: user.user._id
    }
    return (
        <div className="p-10">
            <div className="border border-slate-100 rounded p-5">
                <h4 className="text-lg font-bold text-slate-900">Create New Quiz</h4>
                <CreateQuiz user={userData} />
            </div>
        </div>
    )
}

export default page