"use server";

import User from "@/lib/models/user.model";
import QuizModel from "@/lib/models/quiz.model";
import connectToDatabase from "../db";
import { fetchQuiz } from "./quiz.action";

export const createUser = async ({
  username,
  name,
  email,
  image,
  desc = "",
  yt = "",
  lkd = "",
  clerkId = "",
}: {
  username: string;
  name: string;
  email: string;
  image?: string;
  desc?: string;
  yt?: string;
  lkd?: string;
  clerkId?: string;
}) => {
  await connectToDatabase();
  try {
    const res = await User.create({
      name,
      username,
      email,
      img: image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}`,
      desc,
      yt,
      lkd,
      clerkId,
    });
    return res.toObject();
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
};

export const fetchUser = async (params: { clerkId?: string; userId?: string }) => {
  await connectToDatabase();
  const query: any = {};
  if (params.userId) {
    query._id = params.userId;
  } else if (params.clerkId) {
    query.clerkId = params.clerkId;
  } else {
    return "no-user";
  }

  const user = await User.findOne(query)
    .populate({
      path: "quiz",
      model: QuizModel,
    })
    .populate({
      path: "takens.quizId",
      model: QuizModel,
      populate: {
        path: "userId",
        model: User,
      },
    })
    .exec();

  if (!user) {
    return "no-user";
  }
  const firstname = user.name?.split(" ")[0] ?? "Unknown";

  return { firstname, user: user.toObject() };
};

export const updateTakens = async ({
  userId,
  quizId,
  total,
  obtained,
}: {
  userId: string;
  quizId: string;
  total: number;
  obtained: number;
}) => {
  try {
    const quiz = await fetchQuiz({ id: quizId });
    const newAttempts = quiz.takens.length + 1;
    const newRatio = (quiz.ratio + (obtained / total) * 100) / newAttempts;
    const res = await User.findByIdAndUpdate(userId, {
      $push: { takens: { quizId, total, obtained } },
      ratio: newRatio,
      attempts: newAttempts,
    });
    if (res) {
      try {
        await QuizModel.findByIdAndUpdate(quizId, {
          $push: { takens: { userId, total, obtained } },
        });
        return "ok";
      } catch (error) {
        console.log("Error", error);
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
};

export const hasTakenQuiz = async ({
  userId,
  quizId,
}: {
  userId: string;
  quizId: string;
}) => {
  const res = await User.findOne({
    _id: userId,
    "takens.quizId": quizId,
  });

  if (res) {
    return "exist";
  } else {
    return;
  }
};

export const fetchUserWithUsername = async ({ username }: { username: string }) => {
  await connectToDatabase();
  const user = await User.findOne({ username })
    .populate({
      path: "quiz",
      model: QuizModel,
    })
    .populate({
      path: "takens.quizId",
      model: QuizModel,
      populate: {
        path: "userId",
        model: User,
      },
    })
    .exec();
  if (!user) {
    return "404";
  }
  const firstname = user.name?.split(" ")[0] ?? "Unknown";

  return { firstname, user: user.toObject() };
};

export const updateUser = async ({
  userId,
  name,
  image,
  desc,
  yt,
  lkd,
}: {
  userId: string;
  name: string;
  image: string;
  desc: string;
  yt: string;
  lkd: string;
}) => {
  await connectToDatabase();
  try {
    const res = await User.findByIdAndUpdate(userId, {
      name,
      img: image,
      desc,
      yt,
      lkd,
    });

    if (res) {
      return "ok";
    }
  } catch (error) {
    console.error("Error: ", error);
    return;
  }
};
