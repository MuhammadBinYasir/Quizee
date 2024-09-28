"use client"
import React from 'react'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { updateTakens } from '@/lib/action/user.action';

interface Question {
    data: {
        question: string;
        options: string[];
        ans: number;
    }[],
    userId: string;
    quizId: string;
}

const QuizCard = ({ data, userId, quizId }: Question) => {
    const [index, setIndex] = useState<number>(0)
    const [question, setQuestion] = useState<any>(data[index]);
    const [selectedAns, setSelectedAns] = useState<number | null>();
    const [lock, setLock] = useState(false)
    const [count, setCount] = useState(0);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [finish, setFinish] = useState(false)

    const [width, setWidth] = useState<number>(0);

    const updateWidth = () => {
        if (data.length > 0) {
            const percentage = ((index + 1) / data.length) * 100;
            setWidth(Math.round(percentage));
        }
    };

    useEffect(() => {
        updateWidth();
    }, [index, data.length]);


    useEffect(() => {
        setQuestion(data[index]);
    }, [index]);

    const handleClick = (index: number) => {
        if (lock) return;
        setLock(true)
        setSelectedAns(index)
        checkCorrectness(index);
    }

    const checkCorrectness = (selectedAnswer: number) => {
        if ((question.ans - 1) == selectedAnswer) {
            setCount(prevCount => prevCount + ((question.ans - 1) === selectedAnswer ? 1 : 0));
        }
    }

    const updateTaken = async () => {
        const res = await updateTakens({
            userId,
            quizId,
            total: data.length,
            obtained: count
        });
        if(res == "ok")
        {
            console.log("Data Stores to Database")
        }else{
            console.log("Error")
        }
    }

    const handleButton = async () => {
        if (!setSelectedAns) return;
        if (!lock) return;
        if (index == data.length - 2) {
            //Last Question
            if (buttonRef.current) {
                buttonRef.current.innerHTML = "Finish";
            }
        }
        if (index == data.length - 1) {
            setFinish(true)
            await updateTaken();
        }
        setIndex(index + 1);
        setLock(false)
        setSelectedAns(null)

    }

    return (
        <>
            {finish ? null : (
                <div className="w-full h-1 bg-slate-100 rounded-full">
                    <div className={`h-full bg-primaryColor mt-2 rounded-full transition-all`} style={{ width: width + '%' }}></div>
                </div>
            )}
            <div className="p-5">

                {finish ? (
                    <>
                        <h4 className="text-base font-bold">Congratulations 🎉</h4>
                        <p className="text-slate-900 text-sm mt-2">You scored {count}/{data.length}. Well done!</p>
                        <p className="text-slate-900 text-sm mt-1">Keep up the great work and keep challenging yourself!</p>
                        <p className="text-slate-900 text-sm mt-4 border-l pl-3 flex flex-col">Education is the most powerful weapon which you can use to change the world. <p className="italic font-bold mt-1">— Nelson Mandela</p></p>
                    </>
                ) : (
                    <>
                        <h4 className="text-base font-normal">{index + 1}{". "}{question.question}</h4>
                        <div className="my-4 flex flex-col gap-1">
                            {question.options.map((option: string, index: any) => (
                                <div
                                    className={`w-full p-4 text-sm rounded ${lock ? 'cursor-not-allowed' : 'cursor-pointer'
                                        } ${lock
                                            ? index === selectedAns
                                                ? selectedAns === (question.ans - 1)
                                                    ? 'bg-emerald-50 border border-emerald-500'
                                                    : 'bg-red-50 border border-red-500'
                                                : index === (question.ans - 1)
                                                    ? 'bg-emerald-50 border border-emerald-500'
                                                    : 'bg-slate-50'
                                            : 'bg-slate-50'
                                        }`}
                                    onClick={() => handleClick(index)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex justify-end">
                            {lock ? (
                                <button
                                    ref={buttonRef}
                                    className="px-3 py-2 bg-primaryColor rounded text-white text-sm"
                                    onClick={handleButton}>
                                    Next
                                </button>
                            ) : (
                                <button
                                    ref={buttonRef}
                                    className="px-3 py-2 rounded bg-slate-100 text-sm"
                                    onClick={handleButton}
                                    disabled>
                                    Next
                                </button>
                            )}

                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default QuizCard