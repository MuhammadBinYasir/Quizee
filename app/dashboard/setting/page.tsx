import OnBoard from '@/components/forms/onBoard';
import Dashboardlay from '@/components/reusable/Dashboardlay';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

export const dynamic = 'force-dynamic';

const page = async () => {
    const user = await getCurrentUser();
    if (!user) redirect('/login');

    const data = {
        username: user.username,
        image: user.img || '',
        email: user.email,
        clerkId: user.clerkId || '',
        name: user.name,
        desc: user.desc || '',
        yt: user.yt || '',
        lkd: user.lkd || '',
        id: String(user._id)
    };

    return (
       <Dashboardlay
         title="Account Settings"
         desc="Update your name, bio, profile image, and social links visible to learners."
       >
         <div className="flex items-center justify-center">
            <div className="w-[560px] max-w-full bg-white shadow-xs border border-[#e3e3e0] rounded-2xl p-6 sm:p-8">
                <div className="pb-4 border-b border-[#eeeeeb]">
                    <h3 className="font-display text-lg font-bold text-[#353640]">Profile Details</h3>
                    <p className="text-xs text-[#858690] mt-1">Update your information and click save to apply changes.</p>
                </div>
                <OnBoard user={data} />
            </div>
        </div>
       </Dashboardlay>
    );
};

export default page;