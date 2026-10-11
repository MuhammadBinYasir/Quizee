import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import connectToDatabase from './db';
import User from './models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'quizee-super-secret-jwt-key-change-in-production-min32chars!';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export const AUTH_COOKIE_NAME = 'quizee_auth_token';

export interface JWTPayloadData {
  userId: string;
  email: string;
  username: string;
}

/**
 * Hash password using bcryptjs
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

/**
 * Verify password against hashed password
 */
export async function comparePassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

/**
 * Sign JWT token with jose (Edge and Node compatible)
 */
export async function signJWT(payload: JWTPayloadData, expiresIn: string = '7d'): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

/**
 * Verify JWT token with jose (Edge and Node compatible)
 */
export async function verifyJWT(token: string): Promise<JWTPayloadData | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      username: payload.username as string,
    };
  } catch {
    return null;
  }
}

/**
 * Get the current authenticated user from cookies (Server Components / Server Actions)
 */
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const decoded = await verifyJWT(token);
    if (!decoded?.userId) {
      return null;
    }

    await connectToDatabase();
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return null;
    }

    return user.toObject();
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

/**
 * Auth cookie options
 */
export const authCookieOptions = {
  name: AUTH_COOKIE_NAME,
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};
