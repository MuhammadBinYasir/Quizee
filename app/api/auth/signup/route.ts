import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/user.model';
import { hashPassword, signJWT, authCookieOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, username, email, password } = body;

    // Validation
    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { error: 'Please provide all required fields (name, username, email, password).' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const trimmedUsername = username.trim().toLowerCase();
    const trimmedEmail = email.trim().toLowerCase();

    // Check username format (alphanumeric and underscore)
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
    if (!usernameRegex.test(trimmedUsername)) {
      return NextResponse.json(
        { error: 'Username must be between 3-30 characters and contain only letters, numbers, and underscores.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: trimmedEmail }, { username: trimmedUsername }],
    });

    if (existingUser) {
      if (existingUser.email.toLowerCase() === trimmedEmail) {
        return NextResponse.json(
          { error: 'An account with this email address already exists.' },
          { status: 409 }
        );
      }
      if (existingUser.username.toLowerCase() === trimmedUsername) {
        return NextResponse.json(
          { error: 'This username is already taken. Please choose another.' },
          { status: 409 }
        );
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user in MongoDB
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(trimmedUsername)}`;

    const newUser = await User.create({
      name: name.trim(),
      username: trimmedUsername,
      email: trimmedEmail,
      password: hashedPassword,
      img: avatarUrl,
      desc: '',
      yt: '',
      lkd: '',
      quiz: [],
      takens: [],
    });

    // Generate JWT token
    const token = await signJWT({
      userId: newUser._id.toString(),
      email: newUser.email,
      username: newUser.username,
    });

    // Create response with auth cookie
    const response = NextResponse.json(
      {
        success: true,
        message: 'Account created successfully!',
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
          img: newUser.img,
        },
      },
      { status: 201 }
    );

    response.cookies.set(authCookieOptions.name, token, authCookieOptions.options);

    return response;
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error?.message || 'Something went wrong during registration.' },
      { status: 500 }
    );
  }
}
