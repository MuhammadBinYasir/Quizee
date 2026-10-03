import React from 'react';

const Dashboardlay = ({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="max-w-[1240px] mx-auto space-y-6">
      <div className="border-b border-[#e8e8e5] pb-5">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-[-0.035em] text-[#2d2f39]">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-[#7f808a] mt-1">{desc}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Dashboardlay;