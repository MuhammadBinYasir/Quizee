import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa"

export default function Home() {
  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <div className="w-full h-20 flex items-center justify-between p-5">
        <h2 className="text-3xl text-primaryColor font-extrabold font-sans">Quizee</h2>
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="text-xs sm:text-sm px-3 py-2 text-primaryColor ">Login</Link>
          <Link href="/sign-up" className="text-xs sm:text-sm px-4 py-2 bg-primaryColor rounded-full text-white">Create Account</Link>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col items-center justify-center w-full flex-1 p-5">
        <div className="p-6 h-full justify-center flex flex-col">
          <div>
            <h4 className="text-primaryColor text-4xl font-extrabold font-sans">Create Stunning Quizzs For Free</h4>
            <p className="text-slate-700 text-xsm mt-2">We are here to help you to create create quizzes and share it with other using our plarform.</p>
            <div className="mt-4">
              <Link href="/sign-up" className="text-sm px-4 py-2 bg-primaryColor rounded text-white">Get Started</Link>
            </div>
          </div>
          <div className="mt-10">
            <Link href="https://github.com/MuhammadBinYasir/Quizee" className="w-10 h-10 text-2xl text-white bg-slate-900 rounded-full flex items-center justify-center"><FaGithub /></Link>
          </div>
        </div>
        <img src="header-cover.png" className="h-full" />
      </div>
    </div>
  );
}
