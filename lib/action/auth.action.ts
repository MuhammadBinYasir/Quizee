"use server";

import { cookies } from "next/headers";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/user.model";
import { hashPassword, comparePassword, signJWT, AUTH_COOKIE_NAME, authCookieOptions, verifyJWT } from "@/lib/auth";

export async function loginAction(formData: { identifier?: string; password?: string }) {
  const { identifier, password } = formData;

  if (!identifier || !password) {
    return { error: "Please provide both your email/username and password." };
  }

  try {
    await connectToDatabase();

    const cleanIdentifier = identifier.trim().toLowerCase();
    const user = await User.findOne({
      $or: [{ email: cleanIdentifier }, { username: cleanIdentifier }],
    });

    if (!user || !user.password) {
      return { error: "Invalid credentials." };
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return { error: "Invalid credentials." };
    }

    const token = await signJWT({
      userId: user._id.toString(),
      email: user.email,
      username: user.username,
    });

    const cookieStore = cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, authCookieOptions.options);

    return {
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        username: user.username,
        email: user.email,
        img: user.img,
      },
    };
  } catch (err: any) {
    console.error("Login action error:", err);
    return { error: err.message || "Failed to log in." };
  }
}

export async function signupAction(formData: {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}) {
  const { name, username, email, password } = formData;

  if (!name || !username || !email || !password) {
    return { error: "All fields are required." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  const cleanUsername = username.trim().toLowerCase();
  const cleanEmail = email.trim().toLowerCase();

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({
      $or: [{ email: cleanEmail }, { username: cleanUsername }],
    });

    if (existingUser) {
      if (existingUser.email.toLowerCase() === cleanEmail) {
        return { error: "An account with this email already exists." };
      }
      return { error: "This username is already taken." };
    }

    const hashedPassword = await hashPassword(password);
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(cleanUsername)}`;

    const newUser = await User.create({
      name: name.trim(),
      username: cleanUsername,
      email: cleanEmail,
      password: hashedPassword,
      img: avatarUrl,
      desc: "",
      yt: "",
      lkd: "",
      quiz: [],
      takens: [],
    });

    const token = await signJWT({
      userId: newUser._id.toString(),
      email: newUser.email,
      username: newUser.username,
    });

    const cookieStore = cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, authCookieOptions.options);

    return {
      success: true,
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        img: newUser.img,
      },
    };
  } catch (err: any) {
    console.error("Signup action error:", err);
    return { error: err.message || "Failed to register." };
  }
}

export async function logoutAction() {
  const cookieStore = cookies();
  cookieStore.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return { success: true };
}

export async function getSessionUserAction() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = await verifyJWT(token);
    if (!payload?.userId) return null;

    await connectToDatabase();
    const user = await User.findById(payload.userId).select("-password");
    if (!user) return null;

    return JSON.parse(JSON.stringify(user));
  } catch {
    return null;
  }
}
