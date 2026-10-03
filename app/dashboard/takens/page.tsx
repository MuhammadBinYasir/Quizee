import Dashboardlay from '@/components/reusable/Dashboardlay';
import React from 'react';
import { columns } from "@/components/tables/userTakens/colums";
import { DataTable } from "@/components/tables/userTakens/data-table";
import { fetchUser } from '@/lib/action/user.action';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const page = async () => {
    const user = await getCurrentUser();
    if (!user) redirect('/login');

    const fetchData = await fetchUser({ userId: String(user._id) });
    if (fetchData === "no-user") return null;

    const data = (fetchData.user.takens || []).map((taken: any) => ({
        id: taken.quizId?._id.toString(),
        username: taken.quizId?.userId?.username || "Unknown",
        title: taken.quizId?.title || "Untitled Quiz",
        obtained: taken.obtained,
        total: taken.total,
        percentage: Number(((taken.obtained / taken.total) * 100).toFixed(2)),
    }));

    return (
        <Dashboardlay
            title="Taken Quizzes & History"
            desc="Track and review your past quiz performances, total questions, and scores."
        >
            <div className="bg-white border border-[#e3e3e0] rounded-2xl p-6 shadow-xs">
                <DataTable columns={columns} data={data} />
            </div>
        </Dashboardlay>
    );
};

export default page;