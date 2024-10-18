import { fetchUser } from "@/lib/action/user.action";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { FaChartBar, FaGithub, FaLock, FaPen, FaQuestion, FaUser } from "react-icons/fa"
import { MdQuiz } from "react-icons/md";

export default async function Home() {
  const checkUser = async () => {
    const clerk = await currentUser();
    if (clerk) {
      const user = await fetchUser({ clerkId: clerk.id })
      if (user != "no-user") {
        return "ok"
      }
    }
  }
  const res = await checkUser();
  return (
    // <div className="w-full h-screen bg-white flex flex-col">
    //   <div className="w-full h-20 flex items-center justify-between p-5">
    //     <h2 className="text-3xl text-primaryColor font-extrabold font-sans">Quizee</h2>
    //     <div className="flex items-center gap-3">
    //       <Link href="/sign-in" className="text-xs sm:text-sm px-3 py-2 text-primaryColor ">Login</Link>
    //       <Link href="/sign-up" className="text-xs sm:text-sm px-4 py-2 bg-primaryColor rounded-full text-white">Create Account</Link>
    //     </div>
    //   </div>
    //   <div className="flex lg:flex-row flex-col items-center justify-center w-full flex-1 p-5">
    //     <div className="p-6 h-full justify-center flex flex-col">
    //       <div>
    //         <h4 className="text-primaryColor text-4xl font-extrabold font-sans">Create Stunning Quizzs For Free</h4>
    //         <p className="text-slate-700 text-xsm mt-2">We are here to help you to create create quizzes and share it with other using our plarform.</p>
    //         <div className="mt-4">
    //           <Link href="/sign-up" className="text-sm px-4 py-2 bg-primaryColor rounded text-white">Get Started</Link>
    //         </div>
    //       </div>
    //       <div className="mt-10">
    //         <Link href="https://github.com/MuhammadBinYasir/Quizee" className="w-10 h-10 text-2xl text-white bg-slate-900 rounded-full flex items-center justify-center"><FaGithub /></Link>
    //       </div>
    //     </div>
    //     <img src="header-cover.png" className="h-full" />
    //   </div>
    // </div>
    <div className="bg-sky-100">
      <div className="w-full min-h-screen">
        <div className="w-4/5 mx-auto py-8">
          <div className="flex justify-between">
            <h4 className="text-lg font-bold text-sky-800 flex items-center gap-2">
              <div className="w-8 h-8 text-base flex items-center justify-center bg-sky-800 rounded-full text-white">
                <FaQuestion />
              </div>
              Quizee
            </h4>
            {res != "ok" ? (
              <div className="flex items-center gap-3">
                <Link href="/sign-in" className="w-28 h-10 sm:flex hidden items-center bg-sky-200 text-sky-800 justify-center rounded-full text-base">Login</Link>
                <Link href="/sign-up" className="w-28 h-10 flex items-center bg-sky-800 text-white justify-center rounded-full text-base">Sign up</Link>
              </div>
            ) : (
              <Link href="/dashboard" className="min-w-28 h-10 flex items-center bg-sky-800 text-white justify-center rounded-full text-base">Dashboard</Link>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-6 items-center">
            <div>
              <div className="text-white bg-slate-800 px-3 py-1 rounded-full text-sm w-max"> 🔥 Trending</div>
              <h4 className="sm:text-4xl text-2xl text-slate-900 font-normal mt-4">Elevate Your <br />
                <b className="bg-gradient-to-r from-slate-800 to-sky-800 bg-clip-text text-transparent">
                  Knowledge with Quizee
                </b><br /> Fun, Engaging, and Free! </h4>
              <p className="text-sm text-slate-800 mt-2">Quizee is your go-to platform for creating, sharing, and taking quizzes. Whether you're a student, teacher, or trivia lover, Quizee makes learning fun with personalized quizzes, performance analytics, and profile management—all for free!</p>
              <div className="mt-5">
                <Link href="/sign-in" className="w-32 h-10 flex items-center bg-gradient-to-r from-slate-800 to-sky-800 text-white justify-center rounded-full text-base">Get Started</Link>
              </div>
            </div>
            <div className="p-5">
              <img src="header.png" className="w-full aspect-square" />
            </div>
          </div>
          <div className="mt-auto mb-0">
            <div className="h-8 bg-slate-700 rounded-full flex items-center pr-4 text-sm gap-2 w-max text-white">
              <div className="h-8 w-8 rounded-full bg-slate-900 text-white text-sm flex items-center justify-center"><FaGithub /></div>
              Rate on Github
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-screen p-10">
        <div className="space-y-2 md:w-1/2 w-full">
          <h4 className="text-2xl sm:text-4xl font-bold"><b className="bg-gradient-to-r from-slate-800 via-sky-900 to-sky-800 bg-clip-text text-transparent">Features</b></h4>
          <p className="text-sm hidden sm:block text-slate-800">Discover the ultimate tools to create, manage, and analyze quizzes like never before. With powerful customization, real-time performance tracking, and secure user profiles, Quizee takes your quiz experience to the next level. Whether for learning, fun, or business, these features are designed to make your quizzes engaging and insightful.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
          <div className="bg-white p-5 rounded shadow-xl">
            <p className="text-lg text-sky-800"><FaPen /></p>
            <h4 className="text-base text-sky-800 font-bold mt-4">
              Create and Customize Quizzes
            </h4>
            <p className="text-sm text-slate-800 mt-2">
              Design interactive and engaging quizzes with a variety of question types such as multiple choice. Customize your quizzes by selecting different categories and tailoring them for different audiences, whether for education, business, or fun.
            </p>
          </div>
          <div className="bg-white p-5 rounded shadow-xl">
            <p className="text-lg text-sky-800"><FaChartBar /></p>
            <h4 className="text-base text-sky-800 font-bold mt-4">
              Track Quiz Performance
            </h4>
            <p className="text-sm text-slate-800 mt-2">
              Gain deep insights into how users are performing on your quizzes. Track quiz attempts, see detailed analytics of scores, and monitor completion rates. This feature provides a powerful way to measure knowledge, progress, and user engagement over time.
            </p>
          </div>
          <div className="bg-white p-5 rounded shadow-xl">
            <p className="text-lg text-sky-800"><FaUser /></p>
            <h4 className="text-base text-sky-800 font-bold mt-4">
              User Profiles and Scorecards
            </h4>
            <p className="text-sm text-slate-800 mt-2">
              Every user gets their own profile, allowing them to display their created quizzes and track their own performance. Other users can view their scorecards, fostering a sense of community and competition. Share your success and explore others' quizzes and results.
            </p>
          </div>
          <div className="bg-white p-5 rounded shadow-xl">
            <p className="text-lg text-sky-800"><FaLock /></p>
            <h4 className="text-base text-sky-800 font-bold mt-4">
              Secure and Private
            </h4>
            <p className="text-sm text-slate-800 mt-2">
              Our platform prioritizes the security and privacy of your data. Your quiz results, personal information, and analytics are all securely stored. You can confidently manage your content and user interactions in a safe, private environment.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
