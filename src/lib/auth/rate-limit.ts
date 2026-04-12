import { RateLimiterMemory } from "rate-limiter-flexible";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const rateLimiter = new RateLimiterMemory({
  points: 120,
  duration: 60,
});

const loginRateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 900,
  blockDuration: 900,
});

const strictPublicLimiter = new RateLimiterMemory({
  points: 20,
  duration: 60,
});

function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export async function rateLimit(
  request: NextRequest,
  limiter: RateLimiterMemory = rateLimiter
): Promise<{ success: boolean; response?: NextResponse }> {
  const identifier = getClientIdentifier(request);
  try {
    await limiter.consume(identifier);
    return { success: true };
  } catch (rejRes: unknown) {
    const error = rejRes as { msBeforeNext?: number };
    const remainingTime = Math.round((error.msBeforeNext || 0) / 1000) || 1;
    return {
      success: false,
      response: NextResponse.json(
        {
          error: "Too many requests",
          message: `Rate limit exceeded. Please try again in ${remainingTime} seconds.`,
          retryAfter: remainingTime,
        },
        {
          status: 429,
          headers: { "Retry-After": remainingTime.toString() },
        }
      ),
    };
  }
}

export async function rateLimitLogin(
  request: NextRequest
): Promise<{ success: boolean; response?: NextResponse }> {
  return rateLimit(request, loginRateLimiter);
}

export async function rateLimitPublicWrite(
  request: NextRequest
): Promise<{ success: boolean; response?: NextResponse }> {
  return rateLimit(request, strictPublicLimiter);
}
