import OnBoard from '@/components/forms/onBoard';
import Dashboardlay from '@/components/reusable/Dashboardlay';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

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
       <Dashboardlay title='Edit Profile' desc='Would you like to update your profile? Edit your details below.'>
         <div className="flex items-center h-full mt-5 justify-center">
            <div className="w-[500px] max-w-full mt-5 p-5 bg-white shadow-lg rounded">
                <div className="pb-4 border-b border-b-slate-100">
                    <h4 className='text-lg font-bold text-slate-900'>Edit Profile</h4>
                    <p className='text-sm text-slate-700 mt-3'>Update the details and press 'Update' to continue.</p>
                    <p className='text-xs text-slate-500 mt-2'>* All Fields are Required.</p>
                </div>
                <OnBoard user={data} />
            </div>
        </div>
       </Dashboardlay>
    );
};

export default page;