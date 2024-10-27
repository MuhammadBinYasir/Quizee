import CreateQuiz from '@/components/forms/createQuiz';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchQuiz } from '@/lib/action/quiz.action';
import { fetchUser } from '@/lib/action/user.action';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'
import { Type, columns } from "@/components/tables/userTakens/colums"
import { DataTable } from "@/components/tables/userTakens/data-table"


const page = async ({ params }: { params: { id: string } }) => {

    const c_user = await currentUser();
    if (!c_user) return "Please SignIn";

    const quiz = await fetchQuiz({ id: params.id });
    if (!quiz) { return "No Quiz Found"; }

    const user = await fetchUser({ clerkId: c_user?.id })
    if(user == "no-user") return;
    if (quiz.userId._id.toString() != user.user._id.toString()) { return `unauthorized`; }
    const userData = {
        userId: String(user.user._id)
    }

    const data = {
        id: String(quiz._id),
        title: quiz.title,
        desc: quiz.desc,
        category: quiz.category,
        visibility: quiz.visibility,
        questions: quiz.questions.map((q: any) => ({
            question: q.question, // Ensure this is a string
            options: Array.isArray(q.options) ? [...q.options] : [], // Ensure this is a string array
            ans: q.ans // Ensure this is a string
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
            <div className="border border-slate-100 rounded p-5">
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

}

export default page