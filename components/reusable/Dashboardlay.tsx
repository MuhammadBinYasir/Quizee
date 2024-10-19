import React from 'react'

const Dashboardlay = ({ title, desc, children }: {
    title: string;
    desc: string;
    children: React.ReactNode;
}) => {
    return (
        <div className="p-6 bg-[linear-gradient(180deg,#e0f2fe_300px,#fff_40%)] min-h-[calc(100vh-64px)] overflow-y-auto">
            <h4 className="text-2xl text-sky-800 font-bold">{title}</h4>
            <p className='text-slate-700 text-xs mt-1'>{desc}</p>
            {children}
        </div>
    )
}

export default Dashboardlay