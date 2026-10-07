import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const ENV_FILE = path.join(ROOT_DIR, '.env');

// Read environment variables directly
function loadEnv(): Record<string, string> {
  const env: Record<string, string> = {};
  if (fs.existsSync(ENV_FILE)) {
    const lines = fs.readFileSync(ENV_FILE, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        env[key] = val;
      }
    }
  }
  return env;
}

interface Session {
  token: string;
  email: string;
  createdAt: number;
  expiresAt: number;
  ip: string;
}

interface RateLimitRecord {
  attempts: number;
  lockedUntil?: number;
  lastAttempt: number;
}

export class AuthService {
  private sessions: Map<string, Session> = new Map();
  private rateLimits: Map<string, RateLimitRecord> = new Map();

  // 7 days in milliseconds
  private readonly SESSION_TTL = 7 * 24 * 60 * 60 * 1000;

  // Maximum failed attempts before lock (relaxed for local development)
  private readonly MAX_FAILED_ATTEMPTS = 50;
  private readonly LOCKOUT_TIME = 2 * 60 * 1000;

  private getAdminCredentials(): { email: string; passwordHash: string } {
    const env = loadEnv();
    const email = process.env.ADMIN_EMAIL || env.ADMIN_EMAIL || 'admin@divyarao.in';
    const passwordHash = process.env.ADMIN_PASSWORD_HASH || env.ADMIN_PASSWORD_HASH || '';
    return { email, passwordHash };
  }

  public checkRateLimit(ip: string): { allowed: boolean; waitSeconds?: number } {
    const record = this.rateLimits.get(ip);
    if (!record) return { allowed: true };

    const now = Date.now();
    if (record.lockedUntil && record.lockedUntil > now) {
      const waitSeconds = Math.ceil((record.lockedUntil - now) / 1000);
      return { allowed: false, waitSeconds };
    }

    // Reset lock if expired
    if (record.lockedUntil && record.lockedUntil <= now) {
      this.rateLimits.delete(ip);
      return { allowed: true };
    }

    return { allowed: true };
  }

  public recordFailedAttempt(ip: string) {
    const now = Date.now();
    const record = this.rateLimits.get(ip) || { attempts: 0, lastAttempt: now };
    record.attempts += 1;
    record.lastAttempt = now;

    if (record.attempts >= this.MAX_FAILED_ATTEMPTS) {
      record.lockedUntil = now + this.LOCKOUT_TIME;
    }

    this.rateLimits.set(ip, record);
  }

  public recordSuccessfulAttempt(ip: string) {
    this.rateLimits.delete(ip);
  }

  public login(identifier: string, plaintextPass: string, ip: string): { success: boolean; token?: string; error?: string } {
    const rateCheck = this.checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return {
        success: false,
        error: `Too many failed attempts. Please wait ${rateCheck.waitSeconds} seconds.`,
      };
    }

    const { email, passwordHash } = this.getAdminCredentials();

    if (!passwordHash) {
      console.error('SERVER ERROR: ADMIN_PASSWORD_HASH is missing in .env');
      return { success: false, error: 'Invalid credentials.' };
    }

    // Check identifier (case-insensitive email or username)
    const normId = identifier.trim().toLowerCase();
    const matchesIdentifier =
      normId === email.toLowerCase() ||
      normId === 'admin' ||
      normId === 'divya' ||
      normId === 'divyarao' ||
      normId === 'divss' ||
      normId === 'divss72' ||
      normId === 'divyarao2403@gmail.com' ||
      normId.includes('divya') ||
      normId.includes('admin');

    if (!matchesIdentifier) {
      console.warn(`[AUTH] Login failed: identifier "${identifier}" not recognized.`);
      this.recordFailedAttempt(ip);
      return { success: false, error: 'Invalid credentials.' };
    }

    // Verify bcrypt password hash
    let passwordMatches = false;
    try {
      passwordMatches = bcrypt.compareSync(plaintextPass, passwordHash);
    } catch (err) {
      console.error('Bcrypt comparison failed:', err);
    }

    if (!passwordMatches) {
      this.recordFailedAttempt(ip);
      return { success: false, error: 'Invalid credentials.' };
    }

    this.recordSuccessfulAttempt(ip);

    // Create secure random session token
    const token = crypto.randomBytes(32).toString('hex');
    const now = Date.now();
    this.sessions.set(token, {
      token,
      email,
      createdAt: now,
      expiresAt: now + this.SESSION_TTL,
      ip,
    });

    return { success: true, token };
  }

  public validateSession(token?: string): { valid: boolean; email?: string } {
    if (!token) return { valid: false };

    const session = this.sessions.get(token);
    if (!session) return { valid: false };

    if (Date.now() > session.expiresAt) {
      this.sessions.delete(token);
      return { valid: false };
    }

    return { valid: true, email: session.email };
  }

  public logout(token?: string) {
    if (token) {
      this.sessions.delete(token);
    }
  }

  public changePassword(currentPass: string, newPass: string): { success: boolean; error?: string } {
    const { passwordHash, email } = this.getAdminCredentials();
    if (!passwordHash) return { success: false, error: 'Configuration missing.' };

    const currentMatches = bcrypt.compareSync(currentPass, passwordHash);
    if (!currentMatches) {
      return { success: false, error: 'Current password is incorrect.' };
    }

    if (newPass.length < 8) {
      return { success: false, error: 'New password must be at least 8 characters long.' };
    }

    const saltRounds = 12;
    const newHash = bcrypt.hashSync(newPass, saltRounds);

    // Update .env file with new hash
    try {
      let envRaw = fs.existsSync(ENV_FILE) ? fs.readFileSync(ENV_FILE, 'utf8') : '';
      if (envRaw.includes('ADMIN_PASSWORD_HASH=')) {
        envRaw = envRaw.replace(/ADMIN_PASSWORD_HASH=.*/g, `ADMIN_PASSWORD_HASH=${newHash}`);
      } else {
        envRaw += `\nADMIN_PASSWORD_HASH=${newHash}\n`;
      }
      fs.writeFileSync(ENV_FILE, envRaw, 'utf8');
      process.env.ADMIN_PASSWORD_HASH = newHash;

      // Invalidate all existing sessions for security
      this.sessions.clear();

      return { success: true };
    } catch (err) {
      console.error('Failed to update .env:', err);
      return { success: false, error: 'Failed to update credentials on server.' };
    }
  }

  public getSessionInfo(token?: string) {
    if (!token) return null;
    const session = this.sessions.get(token);
    if (!session) return null;
    return {
      email: session.email,
      activeSince: new Date(session.createdAt).toISOString(),
      expiresAt: new Date(session.expiresAt).toISOString(),
      activeSessionsCount: this.sessions.size,
    };
  }
}

export const authService = new AuthService();
