import CreateQuiz from '@/components/forms/createQuiz';
import Dashboardlay from '@/components/reusable/Dashboardlay';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

export const dynamic = 'force-dynamic';

const page = async () => {
    const user = await getCurrentUser();
    if (!user) redirect('/login');

    const userData = {
        userId: String(user._id)
    };

    return (
        <Dashboardlay
            title="Create New Quiz"
            desc="Add your quiz title, description, category, and multiple-choice questions."
        >
            <div className="bg-white border border-[#e3e3e0] rounded-2xl p-6 sm:p-8 shadow-xs">
                <CreateQuiz user={userData} />
            </div>
        </Dashboardlay>
    );
};

export default page;