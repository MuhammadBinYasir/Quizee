import React from 'react'
import { FaRegQuestionCircle, FaRegUserCircle, FaPercentage, FaCheckCircle, FaEye, FaCommentAlt } from "react-icons/fa";
import Link from 'next/link';
import mongoose from 'mongoose';
import { HiEmojiHappy } from "react-icons/hi";
import { MdSportsCricket } from "react-icons/md";
import { RiComputerFill } from "react-icons/ri";
import { FaGraduationCap, FaBook } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";
import { checkAvg, truncateText } from '@/lib/utils';

const QuizCard = async ({
    title, desc, category, visibility, attempt, ratio, total, id
}: {
    title: string;
    desc: string;
    category: string;
    visibility: string;
    attempt: number;
    ratio: any[];
    total: number;
    id: mongoose.Schema.Types.ObjectId;
}) => {
    const categoryIcons: { [key: string]: JSX.Element } = {
        "Entertainment": <HiEmojiHappy />,
        "Sports": <MdSportsCricket />,
        "Technology": <RiComputerFill />,
        "Educational": <FaGraduationCap />,
        "Games & Puzzles": <FaGamepad />,
        "General Knowledge": <FaBook />
    };

    const icon = categoryIcons[category] || null;
    const ratios = await checkAvg(ratio)

    return (
        <div className="rounded overflow-hidden bg-white shadow-lg">
            <div className="w-full h-28 bg-primaryColor text-white flex items-center text-3xl justify-center">{icon}
            </div>
            <div className="m-4 text-slate-900">
                <Link href={`/dashboard/edit/${id}`} className='text-base font-bold flex gap-2 items-center'>{title} {visibility == "public" && <FaCheckCircle className="text-primaryColor" />} </Link>
                <p className="text-xs text-slate-700">{truncateText(desc, 80)}</p>

                <div className="mt-4 flex flex-wrap gap-2 items-center">
                    <div className="flex gap-1 items-center text-xs text-sky-800 bg-sky-100 rounded-full w-max h-6 pr-2"><div className='w-6 h-6 bg-sky-800 rounded-full text-white flex items-center justify-center text-sm'><FaRegQuestionCircle /> </div> {total} Questions</div>
                    <div className="flex gap-1 items-center text-xs text-sky-800 bg-sky-100 rounded-full w-max h-6 pr-2"><div className='w-6 h-6 bg-sky-800 rounded-full text-white flex items-center justify-center text-sm'><FaRegUserCircle /> </div> {attempt} Attempts</div>
                    <div className="flex gap-1 items-center text-xs text-sky-800 bg-sky-100 rounded-full w-max h-6 pr-2 mt-2"><div className='w-6 h-6 bg-sky-800 rounded-full text-white flex items-center justify-center text-sm'><FaPercentage /> </div> {ratios.toFixed(2)}% Avg. Result</div>
                </div>

            </div>
        </div>
    )
}

export default QuizCard