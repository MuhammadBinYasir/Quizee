import CreateQuiz from '@/components/forms/createQuiz';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
    const user = await getCurrentUser();
    if (!user) redirect('/login');

    const userData = {
        userId: String(user._id)
    };

    return (
        <div className="p-10">
            <div className="border border-slate-100 rounded p-5 bg-white">
                <h4 className="text-lg font-bold text-slate-900">Create New Quiz</h4>
                <CreateQuiz user={userData} />
            </div>
        </div>
    );
};

export default page;