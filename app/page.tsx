import Logo from "@/components/reusable/Logo";
import { fetchUser } from "@/lib/action/user.action";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { FaChartBar, FaFacebookF, FaGithub, FaLock, FaPen, FaQuestion, FaStar, FaUser } from "react-icons/fa"
import { MdQuiz } from "react-icons/md";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Suspense } from "react";
import HeaderButton from "@/components/HomePage/HeaderButton";
import TopQuizzes from "@/components/HomePage/TopQuizzes";

export default async function Home() {

  return (
    <div className="bg-sky-50">
      <div className="w-full min-h-screen">
        <div className="w-4/5 min-h-screen mx-auto py-8 flex flex-col justify-between">
          <div className="flex justify-between">
            <Logo href="/" />
            <Suspense>
              <HeaderButton />
            </Suspense>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-2 items-center">
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
          <Link href="https://github.com/MuhammadBinYasir/Quizee">
            <div className="h-8 bg-slate-700 rounded-full flex items-center pr-4 text-sm gap-2 w-max text-white">
              <div className="h-8 w-8 rounded-full bg-slate-900 text-white text-sm flex items-center justify-center"><FaGithub /></div>
              Rate on Github
            </div>
          </Link>
        </div>
      </div>
      <div className="w-4/5 mx-auto min-h-screen py-10">
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

      <div className="w-4/5 mx-auto min-h-screen py-10">
        <div className="space-y-2 md:w-1/2 w-full">
          <h4 className="text-2xl sm:text-4xl font-bold"><b className="bg-gradient-to-r from-slate-800 via-sky-900 to-sky-800 bg-clip-text text-transparent">Top Quizzes</b></h4>
          <p className="text-sm hidden sm:block text-slate-800">Dive into our collection of top quizzes, where knowledge meets fun! Whether you’re looking to test your skills, challenge your friends, or simply learn something new, these popular quizzes have something for everyone.</p>
        </div>
        <Suspense>
          <TopQuizzes />
        </Suspense>
      </div>
      <div className="w-4/5 mx-auto min-h-screen py-10 flex flex-col">

        <div className="space-y-2 md:w-1/2 w-full">
          <h4 className="text-2xl sm:text-4xl font-bold"><b className="bg-gradient-to-r from-slate-800 via-sky-900 to-sky-800 bg-clip-text text-transparent">Testimonials</b></h4>
          <p className="text-sm hidden sm:block text-slate-800">Discover the ultimate tools to create, manage, and analyze quizzes like never before. With powerful customization, real-time performance tracking, and secure user profiles, Quizee takes your quiz experience to the next level. Whether for learning, fun, or business, these features are designed to make your quizzes engaging and insightful.</p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <Carousel className="w-full mt-4">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="w-80 max-w-full">

                  <div>
                    <div className="w-96 max-w-full rounded bg-white mx-auto p-7">
                      <div className="flex gap-2">
                        <img src="https://utfs.io/f/030d8adc-5fba-4578-a20b-fa88b3a1ca95-woz462.jpg" className="w-10 h-10 rounded-full" alt="" />
                        <div>
                          <h4 className="text-sm font-bold text-sky-800">Muhammad Bin Yasir</h4>
                          <p className="text-xs text-slate-500">Website Developer</p>
                          <div className="flex items-center mt-1 text-orange-300">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-slate-800 mt-4 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero et minima ipsam natus repellendus quaerat accusamus rerum quibusdam ab fugiat iure quis ex quod, alias inventore. Explicabo, neque autem? Deserunt? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque repellendus quis libero enim in. Dicta enim dolores corrupti hic quas omnis quis. Numquam deleniti molestias hic deserunt, pariatur nemo at?</p>
                        <div className="mt-4 flex items-center gap-2">
                          <div className="flex rounded-full h-6 bg-sky-100 text-xs gap-1 pr-2 text-primaryColor items-center">
                            <div className="w-6 h-6 rounded-full bg-primaryColor text-white flex items-center justify-center"><FaFacebookF /></div>
                            @MuhammadBinYasir
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="w-full h-16 flex items-center justify-center px-2 text-sm text-primaryColor font-normal">
        <p>&copy; Copyright 2024. All Rights Reservered By <b>Muhammad Bin Yasir</b> </p>
      </div>
    </div>
  );
}
