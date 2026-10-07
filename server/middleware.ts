import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.js';

export interface AuthenticatedRequest extends Request {
  adminEmail?: string;
}

/**
 * Middleware requiring active administrator session cookie or token.
 * Returns 401 Unauthorized if missing, invalid, or expired.
 */
export function requireAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  // Check cookie first, fallback to Authorization Bearer header
  const token = req.cookies?.dr_admin_session || 
    (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : undefined);

  if (!token) {
    return res.status(401).json({
      error: 'Authentication required. Please sign in to the Private Studio.',
    });
  }

  const validation = authService.validateSession(token);
  if (!validation.valid) {
    // Clear invalid cookie
    res.clearCookie('dr_admin_session', { path: '/' });
    return res.status(401).json({
      error: 'Session expired or invalid. Please sign in again.',
    });
  }

  req.adminEmail = validation.email;
  next();
}

/**
 * Rate limiting middleware for login endpoint.
 */
export function rateLimitLogin(req: Request, res: Response, next: NextFunction) {
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  const check = authService.checkRateLimit(ip);
  if (!check.allowed) {
    return res.status(429).json({
      error: `Too many login attempts. Access temporarily locked. Try again in ${check.waitSeconds} seconds.`,
      locked: true,
      waitSeconds: check.waitSeconds,
    });
  }

  next();
}

/**
 * Basic XSS sanitizer for user comments
 */
export function sanitizeString(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}
