import CreateQuiz from '@/components/forms/createQuiz';
import Dashboardlay from '@/components/reusable/Dashboardlay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchQuiz } from '@/lib/action/quiz.action';
import { getCurrentUser } from '@/lib/auth';
import React from 'react';
import { columns } from "@/components/tables/userTakens/colums";
import { DataTable } from "@/components/tables/userTakens/data-table";
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user) redirect('/login');

    const quiz = await fetchQuiz({ id });
    if (!quiz) {
        return (
            <Dashboardlay title="Quiz Not Found" desc="We couldn't find the quiz you requested.">
                <div className="bg-white p-8 rounded-2xl border border-[#e3e3e0] text-center text-sm text-[#7f808a]">
                    No quiz found with ID: {id}
                </div>
            </Dashboardlay>
        );
    }

    if (quiz.userId._id.toString() !== user._id.toString()) {
        return (
            <Dashboardlay title="Unauthorized" desc="You do not have permission to edit this quiz.">
                <div className="bg-white p-8 rounded-2xl border border-red-200 text-center text-sm text-red-600">
                    You can only edit quizzes you created.
                </div>
            </Dashboardlay>
        );
    }

    const userData = {
        userId: String(user._id)
    };

    const data = {
        id: String(quiz._id),
        title: quiz.title,
        desc: quiz.desc,
        category: quiz.category,
        visibility: quiz.visibility,
        questions: quiz.questions.map((q: any) => ({
            question: q.question,
            options: Array.isArray(q.options) ? [...q.options] : [],
            ans: q.ans
        })),
    };

    const flattenedTakens = (quiz.takens || []).flat();
    const AnalData = flattenedTakens.map((taken: any) => ({
        id: taken._id,
        username: taken.userId?.username || "Unknown",
        title: taken.userId?.name || "Unknown",
        obtained: taken.obtained,
        total: taken.total,
        percentage: Number(((taken.obtained / taken.total) * 100).toFixed(2)),
    }));

    return (
        <Dashboardlay
            title={`Edit Quiz: ${quiz.title}`}
            desc="Update questions, options, visibility, and review participant analytics."
        >
            <div className="bg-white border border-[#e3e3e0] rounded-2xl p-6 shadow-xs">
                <Tabs defaultValue="edit" className="max-w-full w-full">
                    <TabsList className="grid w-[320px] max-w-full h-10 mb-6 mx-auto grid-cols-2 bg-[#f0eef6] rounded-xl p-1">
                        <TabsTrigger value="edit" className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-[#8279a9] data-[state=active]:shadow-xs">Edit Questions</TabsTrigger>
                        <TabsTrigger value="anal" className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-[#8279a9] data-[state=active]:shadow-xs">Analytics</TabsTrigger>
                    </TabsList>
                    <TabsContent value="edit">
                        <CreateQuiz user={userData} data={data} />
                    </TabsContent>
                    <TabsContent value="anal">
                        <DataTable columns={columns} data={AnalData} />
                    </TabsContent>
                </Tabs>
            </div>
        </Dashboardlay>
    );
};

export default page;