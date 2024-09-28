"use server"

import User from "@/lib/models/user.model"
import QuizModel from "@/lib/models/quiz.model"
import connectToDatabase from "../db";
import { fetchQuiz } from "./quiz.action";

export const createUser = async ({ username, name, email, image, desc, yt, lkd, clerkId }: {
  username: string;
  name: string;
  email: string;
  image: string;
  desc: string;
  yt: string;
  lkd: string;
  clerkId: string;
}) => {
  await connectToDatabase()
  try {
    const res = await User.create({ name, username, email, img: image, desc, yt, lkd, clerkId })
    return;
  } catch (error) {
    console.log("Error: ", error)
    return;
  }
}

export const fetchUser = async ({ clerkId }: { clerkId: string }) => {
  await connectToDatabase();
  const user = await User.findOne({ clerkId }).populate({
    path: "quiz",
    model: QuizModel,
  }).populate({
    path: 'takens.quizId',
    model: QuizModel,
    populate: {
      path: 'userId',
      model: User,
    }
  }).exec();
  if (!user) {
    throw new Error("User not found");
  }
  const firstname = user.name?.split(' ')[0] ?? 'Unknown'; // Handles undefined name

  return { firstname, user: user.toObject() };
};

export const updateTakens = async ({ userId, quizId, total, obtained }:
  { userId: string, quizId: string, total: number, obtained: number }) => {

  try {
    const quiz = await fetchQuiz({ id: quizId });
    const newAttempts = quiz.takens.length + 1
    const newRatio = (quiz.ratio + ((obtained / total) * 100)) / newAttempts;
    const res = await User.findByIdAndUpdate(userId, {
      $push: { takens: { quizId, total, obtained } },
      ratio: newRatio,
      attempts: newAttempts
    });
    if (res) {
      try {
        await QuizModel.findByIdAndUpdate(quizId, {
          $push: { takens: { userId, total, obtained } }
        });
        return "ok";
      } catch (error) {
        console.log("Error", error)
      }
    }
  } catch (error) {
    console.log("Error", error)
  }


}

export const hasTakenQuiz = async ({ userId, quizId }:
  {
    userId: string;
    quizId: string;
  }) => {
  const res = await User.findOne({
    _id: userId,
    'takens.quizId': quizId // Check if the quizId exists in the takens array
  });

  if (res) {
    return "exist"
  } else {
    return;
  }

}

export const fetchUserWithUsername = async ({ username }: { username: string }) => {
  await connectToDatabase();
  const user = await User.findOne({ username }).populate({
    path: "quiz",
    model: QuizModel,
  }).populate({
    path: "takens.quizId",
    model: QuizModel,
    select: 'title'
  }).exec();
  if (!user) {
    return "404"
  }
  const firstname = user.name?.split(' ')[0] ?? 'Unknown';

  return { firstname, user: user.toObject() };
};
