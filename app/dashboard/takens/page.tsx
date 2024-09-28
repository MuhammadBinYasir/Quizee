import Dashboardlay from '@/components/reusable/Dashboardlay'
import React from 'react'

import { Type, columns } from "@/components/tables/userTakens/colums"
import { DataTable } from "@/components/tables/userTakens/data-table"
import { fetchUser } from '@/lib/action/user.action'

import { currentUser } from '@clerk/nextjs/server'


const page = async () => {
    const c_user = await currentUser();
    if (!c_user) return;
    const fetchData = await fetchUser({ clerkId: c_user.id })

    const data = fetchData.user.takens.map((taken: any) => ({
        id: taken.quizId._id,
        username: taken.quizId.userId.username,
        title: taken.quizId.title,
        obtained: taken.obtained,
        total: taken.total,
        percentage: ((taken.obtained / taken.total) * 100).toFixed(2),
      }));
      
    return (
        <Dashboardlay title={'Taken Quiz'} desc="You Performance in Quizzes you have taken ever.">
            <div className="mt-4"><DataTable columns={columns} data={data} /></div>
        </Dashboardlay>
    )

}

export default page