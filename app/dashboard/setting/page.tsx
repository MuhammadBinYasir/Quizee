import OnBoard from '@/components/forms/onBoard'
import { fetchUser } from '@/lib/action/user.action';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const clerkUser = await currentUser();
    if (!clerkUser) redirect('/sign-in')
    const dbUser = await fetchUser({ clerkId: clerkUser.id })
    if (dbUser == "no-user") redirect('/sign-in')
    const data = {
        username: clerkUser.username ?? "no-username",
        image: dbUser.user.img,
        email: clerkUser.emailAddresses?.[0]?.emailAddress ?? "no-email",
        clerkId: clerkUser.id ?? "no-id",
        name: dbUser.user.name,
        desc: dbUser.user.desc,
        yt: dbUser.user.yt,
        lkd: dbUser.user.lkd,
        id: dbUser.user._id
    };
    return (
        <div className="flex items-center w-full mx-auto mt-5 justify-center">
            <div className="w-[500px] max-w-full p-5 bg-white shadow rounded">
                <div className="pb-4 border-b border-b-slate-100">
                    <h4 className='text-lg font-bold text-slate-900'>Edit Profile</h4>
                    <p className='text-sm text-slate-700 mt-3'>Update the details and press 'Update' to continue.</p>
                    <p className='text-xs text-slate-500 mt-2'>* All Fields are Required.</p>
                </div>
                <OnBoard user={data} />
            </div >
        </div>
    )
}

export default page