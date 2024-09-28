import { fetchUserWithUsername } from '@/lib/action/user.action';
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { HiEmojiHappy } from "react-icons/hi";
import { MdSportsCricket } from "react-icons/md";
import { RiComputerFill } from "react-icons/ri";
import { FaGraduationCap, FaBook } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";
import Link from 'next/link';
import { FaRegQuestionCircle, FaRegUserCircle, FaPercentage, FaCheckCircle, FaEye, FaCommentAlt } from "react-icons/fa";
import { truncateText } from '@/lib/utils';

const page = async ({ params }: { params: { username: string; } }) => {
    const user = await fetchUserWithUsername({ username: params.username })

    const categoryIcons: { [key: string]: JSX.Element } = {
        "Entertainment": <HiEmojiHappy />,
        "Sports": <MdSportsCricket />,
        "Technology": <RiComputerFill />,
        "Educational": <FaGraduationCap />,
        "Games & Puzzles": <FaGamepad />,
        "General Knowledge": <FaBook />
    };
    return (
        <>
            <div className="w-full h-16 flex gap-3 items-center justify-between px-10">
                <h4 className="text-lg text-primaryColor font-extrabold">Quizee</h4>
            </div>
            {user == "404" ? "No User Found" : (
                <div className="p-6 overflow-hidden">
                    <div className="flex w-full sm:w-2/4">
                        <img src={user.user.img} alt="" className="w-24 h-24 rounded-full" />
                        <div className="ml-6">
                            <h4 className="text-base text-slate-900">{user.user.name}</h4>
                            <p className="text-xs text-neutral-500">@{user.user.username}</p>
                            <p className="text-sm mt-2 text-slate-700">{user.user.desc}</p>
                            <div className="mt-4 flex items-center flex-wrap gap-3 text-xs text-white">
                                <div className="px-3 py-2 bg-primaryColor rounded">{user.user.quiz.length} Quizzes Created</div>
                                <div className="px-3 py-2 bg-primaryColor rounded">{user.user.takens.length} Quizzes Taken</div>
                            </div>
                        </div>
                    </div>
                    {user.user.quiz.length <= 0 ? null : (
                        <>
                            <h4 className="text-lg font-bold text-slate-900 mt-8 text-center">Created Quizzes</h4>
                            <Carousel className="w-4/5 mx-auto mt-4">
                                <CarouselContent>

                                    {user.user.quiz.map((item: any, index: any) => (
                                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                            <Link href={`/${params.username}/${item._id}`}>
                                                <div className="border rounded h-full p-5">
                                                    <div className="text-3xl text-primaryColor">
                                                        {categoryIcons[item.category]}</div>
                                                    <h4 className="text-base text-slate-900 font-extrabold mt-4">{item.title}</h4>
                                                    <p className="text-slate-700 text-xs mt-2 ">{truncateText(item.desc, 50)}</p>
                                                    <div className="flex gap-2 mt-4 items-center text-xs text-slate-600"><FaRegQuestionCircle /> {item.total} Questions</div>
                                                    <div className="flex gap-2 items-center text-xs text-slate-600 mt-1"><FaRegUserCircle /> {item.takens.length} Attempts</div>
                                                </div>
                                            </Link>
                                        </CarouselItem>
                                    ))}


                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </>
                    )}
                    {user.user.takens.length <= 0 ? null : (
                        <>
                            <h4 className="text-lg font-bold text-slate-900 mt-8 text-center">Taken Quizzes</h4>
                            <Carousel className="w-4/5 mx-auto mt-4">
                                <CarouselContent>
                                    {user.user.takens.map((item: any, index: any) => (
                                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                            <div className="border rounded h-full p-5">
                                                <div className="flex items-end gap-3">
                                                    <h2 className="text-2xl text-primaryColor font-extrabold">{((item.obtained / item.total) * 100).toFixed(0)}%</h2>
                                                    <p className="text-slate-500 text-xs">({item.obtained}/{item.total})</p>
                                                </div>
                                                <h4 className="text-sm text-slate-900 font-extrabold mt-2">{item.quizId.title}</h4>
                                            </div>
                                        </CarouselItem>
                                    ))}


                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default page