"use server"

import connectToDatabase from "@/lib/db";
import QuizModel from "@/lib/models/quiz.model";
import User from "../models/user.model";
interface type {
    id?: string;
    title: string,
    desc: string,
    category: string,
    userId: string,
    questions: {
        question: string;
        options: string[];
        ans: string;
    }[],
    total: number,
    visibility: string
}

export const createQuiz = async ({ title, desc, category, userId, questions, total, visibility }: type) => {
    await connectToDatabase()
    try {
        const res = await QuizModel.create({ title, desc, category, userId, questions, total, visibility });

        if (res) {
            await User.findByIdAndUpdate(userId, {
                $push: { quiz: res._id }
            });
            return "ok";
        }
    } catch (error) {
        console.error("Error: ", error);
        return;
    }


}

export const updateQuiz = async ({ id, title, desc, category, userId, questions, total, visibility }: type) => {
    await connectToDatabase()
    try {
        const res = await QuizModel.findByIdAndUpdate(id , 
            { title, desc, category, questions, total, visibility }
        );

        if (res) {
            return "ok";
        }
    } catch (error) {
        console.error("Error: ", error);
        return;
    }


}

export const fetchQuiz = async ({ id }: { id: string }) => {
    await connectToDatabase();

    const res = await QuizModel.findById(id).populate({
        path: 'userId',
        model: User
    }).populate({
        path: 'takens.userId',
        model: User,
        select: 'name username'
    }).exec();

    if (!res) {
        return null;
    }

    return res.toObject();
}