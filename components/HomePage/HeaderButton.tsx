import { fetchUser } from '@/lib/action/user.action';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react'

const HeaderButton = async () => {
    const checkUser = async () => {
        const clerk = await currentUser();
        if (clerk) {
            const user = await fetchUser({ clerkId: clerk.id })
            if (user != "no-user") {
                return "ok"
            }
        }
    }
    const res = await checkUser();
    return (
        <>
            {res != "ok" ? (
                <div className="flex items-center gap-3">
                    <Link href="/sign-in" className="w-28 h-10 sm:flex hidden items-center bg-sky-200 text-sky-800 justify-center rounded-full text-base">Login</Link>
                    <Link href="/sign-up" className="w-28 h-10 flex items-center bg-sky-800 text-white justify-center rounded-full text-base">Sign up</Link>
                </div>
            ) : (
                <Link href="/dashboard" className="min-w-32 h-10 flex items-center bg-sky-800 text-white justify-center rounded-full text-base">Dashboard</Link>
            )}
        </>
    )
}

export default HeaderButton