import React from "react";
import OnBoard from "@/components/forms/onBoard";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/action/user.action";

const page = async () => {

  const user = await currentUser()
  if (!user) redirect("/sign-in");

  const db_user = await fetchUser({ clerkId: user.id })
  if (db_user !== "no-user") {
    redirect("/dashboard")
  }

  const data = {
    username: user.username ?? "no-username",
    image: user.imageUrl ?? "no-img",
    email: user.emailAddresses?.[0]?.emailAddress ?? "no-email",
    clerkId: user.id ?? "no-id",
  };

  return (
    <>
      <div className="w-[500px] max-w-full p-5 bg-white shadow rounded">
        <div className="pb-4 border-b border-b-slate-100">
          <h4 className='text-lg font-bold text-slate-900'>Onboarding</h4>
          <p className='text-sm text-slate-700 mt-3'>Fill the Complete details and press 'submit' to continue.</p>
          <p className='text-xs text-slate-500 mt-2'>* All Fields are Required.</p>
        </div>
        <OnBoard user={data} />
      </div >
    </>
  );
}

export default page