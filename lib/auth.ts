import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const SECRET = process.env.SESSION_SECRET || "starfield-dev-secret";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

function sign(value: string) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = crypto.createHash("sha256").update(a).digest();
  const right = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(left, right);
}

export function checkPassword(input: string) {
  return safeEqual(input, ADMIN_PASSWORD);
}

function createToken() {
  const expires = String(Date.now() + MAX_AGE_SECONDS * 1000);
  return `${expires}.${sign(expires)}`;
}

export function verifyToken(token?: string) {
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (!Number.isFinite(Number(expires)) || Number(expires) < Date.now()) return false;
  return safeEqual(signature, sign(expires));
}

export async function isLoggedIn() {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value);
}

export async function startSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function endSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
