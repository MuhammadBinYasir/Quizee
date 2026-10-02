import CreateQuiz from '@/components/forms/createQuiz';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchQuiz } from '@/lib/action/quiz.action';
import { getCurrentUser } from '@/lib/auth';
import React from 'react';
import { columns } from "@/components/tables/userTakens/colums";
import { DataTable } from "@/components/tables/userTakens/data-table";
import { redirect } from 'next/navigation';

const page = async ({ params }: { params: { id: string } }) => {
    const user = await getCurrentUser();
    if (!user) redirect('/login');

    const quiz = await fetchQuiz({ id: params.id });
    if (!quiz) { return <div className="p-10 text-slate-600">No Quiz Found</div>; }

    if (quiz.userId._id.toString() !== user._id.toString()) { 
        return <div className="p-10 text-red-500 font-semibold">Unauthorized</div>; 
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
    
    const flattenedTakens = quiz.takens.flat();
    const AnalData = flattenedTakens.map((taken: any) => ({
        id: taken._id,
        username: taken.userId?.username || "Unknown", 
        title: taken.userId?.name || "Unknown",
        obtained: taken.obtained,
        total: taken.total,
        percentage: Number(((taken.obtained / taken.total) * 100).toFixed(2)), 
    }));

    return (
        <div className="p-10">
            <div className="border border-slate-100 rounded p-5 bg-white shadow-sm">
                <Tabs defaultValue="edit" className="max-w-full w-full">
                    <TabsList className="grid w-[400px] max-w-full h-10 mx-auto grid-cols-2">
                        <TabsTrigger value="edit">Edit</TabsTrigger>
                        <TabsTrigger value="anal">Analytics</TabsTrigger>
                    </TabsList>
                    <TabsContent value="edit">
                        <h4 className="text-lg font-bold text-slate-900 mb-4">Edit Your Quiz</h4>
                        <CreateQuiz user={userData} data={data} />
                    </TabsContent>
                    <TabsContent value="anal">
                        <h4 className="text-lg font-bold text-slate-900 mb-4">Analytics of Quiz</h4>
                        <DataTable columns={columns} data={AnalData} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default page;