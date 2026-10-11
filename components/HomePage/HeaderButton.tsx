import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import React from 'react';

const HeaderButton = async () => {
  const user = await getCurrentUser();

  return (
    <>
      {!user ? (
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="w-28 h-10 sm:flex hidden items-center bg-sky-200 text-sky-800 justify-center rounded-full text-base font-medium hover:bg-sky-300 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="w-28 h-10 flex items-center bg-sky-800 text-white justify-center rounded-full text-base font-medium hover:bg-sky-900 transition-colors"
          >
            Sign up
          </Link>
        </div>
      ) : (
        <Link
          href="/dashboard"
          className="min-w-32 h-10 px-5 flex items-center bg-sky-800 text-white justify-center rounded-full text-base font-medium hover:bg-sky-900 transition-colors"
        >
          Dashboard
        </Link>
      )}
    </>
  );
};

export default HeaderButton;