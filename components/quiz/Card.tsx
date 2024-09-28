import React from 'react'
import { FaRegQuestionCircle, FaRegUserCircle, FaPercentage, FaCheckCircle, FaEye, FaCommentAlt } from "react-icons/fa";
import Link from 'next/link';
import mongoose from 'mongoose';
import { HiEmojiHappy } from "react-icons/hi";
import { MdSportsCricket } from "react-icons/md";
import { RiComputerFill } from "react-icons/ri";
import { FaGraduationCap, FaBook } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";
import { truncateText } from '@/lib/utils';

const QuizCard = ({
    title, desc, category, visibility, attempt, ratio, total, id
}: {
    title: string;
    desc: string;
    category: string;
    visibility: string;
    attempt: number;
    ratio: number;
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

    return (
        <div className="rounded overflow-hidden bg-white shadow-md">
            <div className="w-full h-28 bg-primaryColor text-white flex items-center text-3xl justify-center">{icon}</div>
            <div className="m-4 text-slate-900">
                <Link href={`/dashboard/edit/${id}`} className='text-base font-bold flex gap-2 items-center'>{title} {visibility == "public" && <FaCheckCircle className="text-primaryColor" />} </Link>
                <p className="text-xs text-slate-700">{truncateText(desc, 50)}</p>
                <div className="flex gap-2 items-center text-xs text-slate-600 mt-1"><FaRegQuestionCircle /> {total} Questions</div>

                <div className="grid grid-cols-2 mt-3 gap-3">
                    <div className="flex gap-2 items-center text-xs text-slate-700 border-r border-r-slate-100">
                        <FaRegUserCircle />
                        <div className="text-center">
                            <p>{attempt}</p>
                            <p>Attempts</p>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center text-xs text-slate-700">
                        <FaPercentage />
                        <div className="text-center">
                            <p>{ratio}</p>
                            <p>Avg. Result</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default QuizCard