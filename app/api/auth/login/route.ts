import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/user.model';
import { comparePassword, signJWT, authCookieOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    // Validation
    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Please provide both your email/username and password.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const cleanIdentifier = identifier.trim().toLowerCase();

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: cleanIdentifier }, { username: cleanIdentifier }],
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email/username or password.' },
        { status: 401 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { error: 'This account was registered with another provider or has no password set.' },
        { status: 400 }
      );
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email/username or password.' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await signJWT({
      userId: user._id.toString(),
      email: user.email,
      username: user.username,
    });

    // Return response and set HTTP-only cookie
    const response = NextResponse.json(
      {
        success: true,
        message: 'Logged in successfully!',
        user: {
          id: user._id.toString(),
          name: user.name,
          username: user.username,
          email: user.email,
          img: user.img,
        },
      },
      { status: 200 }
    );

    response.cookies.set(authCookieOptions.name, token, authCookieOptions.options);

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error?.message || 'Something went wrong during login.' },
      { status: 500 }
    );
  }
}
