/**
 * ============================================================================
 * SECURITY UTILITIES - Input Validation & Sanitization
 * ============================================================================
 *
 * This module provides security utilities following OWASP best practices.
 * Use these utilities when handling any user input or external data.
 *
 * OWASP Guidelines Implemented:
 * - Input validation with strict allow-lists
 * - Type checking and length limits
 * - XSS prevention through proper escaping
 * - URL validation to prevent open redirects
 * - Safe JSON parsing
 *
 * ============================================================================
 */

// ============================================================================
// STRING VALIDATION & SANITIZATION
// ============================================================================

/**
 * Maximum safe string lengths for common use cases
 * Prevents buffer overflow and denial-of-service attacks
 */
export const MAX_LENGTHS = {
  NAME: 100,
  EMAIL: 254, // RFC 5321 maximum
  MESSAGE: 5000,
  URL: 2048,
  SEARCH_QUERY: 200,
  GENERIC_SHORT: 255,
  GENERIC_LONG: 10000,
} as const;

/**
 * Validates that a string is within acceptable length limits
 * SECURITY: Prevents denial-of-service through oversized input
 */
export function isValidLength(
  value: string,
  maxLength: number,
  minLength = 0
): boolean {
  if (typeof value !== "string") return false;
  return value.length >= minLength && value.length <= maxLength;
}

/**
 * Validates an email address format
 * SECURITY: Uses strict regex pattern, rejects malformed input
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== "string") return false;
  if (email.length > MAX_LENGTHS.EMAIL) return false;

  // RFC 5322 compliant email regex (simplified but secure)
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

/**
 * Validates a name (allows letters, spaces, hyphens, apostrophes)
 * SECURITY: Strict allow-list prevents injection attacks
 */
export function isValidName(name: string): boolean {
  if (typeof name !== "string") return false;
  if (!isValidLength(name, MAX_LENGTHS.NAME, 1)) return false;

  // Allow Unicode letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[\p{L}\s'-]+$/u;
  return nameRegex.test(name);
}

/**
 * Validates that a string contains only alphanumeric characters
 * SECURITY: Useful for IDs, codes, and other restricted inputs
 */
export function isAlphanumeric(value: string): boolean {
  if (typeof value !== "string") return false;
  return /^[a-zA-Z0-9]+$/.test(value);
}

/**
 * Validates that a string contains only digits
 * SECURITY: Prevents injection when numeric input is expected
 */
export function isNumericString(value: string): boolean {
  if (typeof value !== "string") return false;
  return /^\d+$/.test(value);
}

// ============================================================================
// HTML/XSS SANITIZATION
// ============================================================================

/**
 * HTML entities map for escaping
 * SECURITY: Prevents XSS by converting dangerous characters to safe entities
 */
const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};

/**
 * Escapes HTML special characters to prevent XSS
 * SECURITY: Always use this when displaying untrusted content in HTML context
 *
 * NOTE: React automatically escapes content in JSX, so this is mainly for:
 * - Non-React contexts
 * - Building HTML strings manually
 * - Data that will be stored and rendered elsewhere
 */
export function escapeHtml(untrusted: string): string {
  if (typeof untrusted !== "string") return "";
  return untrusted.replace(
    /[&<>"'`=/]/g,
    (char) => HTML_ENTITIES[char] || char
  );
}

/**
 * Strips all HTML tags from a string
 * SECURITY: Use when you need plain text only (e.g., search indexing)
 */
export function stripHtmlTags(html: string): string {
  if (typeof html !== "string") return "";
  return html.replace(/<[^>]*>/g, "");
}

// ============================================================================
// URL VALIDATION
// ============================================================================

/**
 * Allowed URL protocols (allow-list approach)
 * SECURITY: Prevents javascript: and data: URL attacks
 */
const ALLOWED_PROTOCOLS = ["http:", "https:", "mailto:"] as const;

/**
 * Validates a URL is safe to use (prevents open redirect & XSS)
 * SECURITY: Only allows http/https/mailto protocols
 */
export function isValidUrl(url: string): boolean {
  if (typeof url !== "string") return false;
  if (url.length > MAX_LENGTHS.URL) return false;

  try {
    const parsed = new URL(url);
    return (ALLOWED_PROTOCOLS as readonly string[]).includes(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * Validates that a URL is from an allowed domain (for external links)
 * SECURITY: Prevents redirects to malicious sites
 */
export function isAllowedDomain(
  url: string,
  allowedDomains: string[]
): boolean {
  if (!isValidUrl(url)) return false;

  try {
    const parsed = new URL(url);
    return allowedDomains.some(
      (domain) =>
        parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}

/**
 * Validates a relative URL path (no protocol)
 * SECURITY: Ensures path doesn't escape to external sites
 */
export function isValidRelativePath(path: string): boolean {
  if (typeof path !== "string") return false;

  // Must start with / and not contain protocol-like patterns
  if (!path.startsWith("/")) return false;
  if (path.includes("://")) return false;
  if (path.startsWith("//")) return false;

  return true;
}

// ============================================================================
// SAFE DATA PARSING
// ============================================================================

/**
 * Safely parses JSON with error handling
 * SECURITY: Prevents crashes from malformed JSON and provides type safety
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Validates that a value is a plain object (not array, null, etc.)
 * SECURITY: Prevents prototype pollution attacks
 */
export function isPlainObject(
  value: unknown
): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  if (Array.isArray(value)) return false;

  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Safely extracts allowed fields from an object (allow-list approach)
 * SECURITY: Prevents unexpected fields from reaching your code
 *
 * @example
 * const input = { name: 'John', role: 'admin', __proto__: malicious };
 * const safe = pickAllowedFields(input, ['name']);
 * // safe = { name: 'John' } - 'role' and '__proto__' are stripped
 */
export function pickAllowedFields<T extends Record<string, unknown>>(
  obj: T,
  allowedFields: (keyof T)[]
): Partial<T> {
  if (!isPlainObject(obj)) return {};

  const result: Partial<T> = {};
  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(obj, field)) {
      result[field] = obj[field];
    }
  }
  return result;
}

// ============================================================================
// RATE LIMITING UTILITIES (Client-Side)
// ============================================================================

/**
 * Simple in-memory rate limiter for client-side use
 * SECURITY: Prevents rapid-fire requests (defense in depth)
 *
 * NOTE: Server-side rate limiting is the primary defense.
 * This is supplementary protection for better UX.
 */
export class ClientRateLimiter {
  private timestamps: number[] = [];
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  /**
   * Check if a request is allowed
   * @returns true if allowed, false if rate limited
   */
  isAllowed(): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Remove timestamps outside the window
    this.timestamps = this.timestamps.filter((ts) => ts > windowStart);

    if (this.timestamps.length >= this.maxRequests) {
      return false;
    }

    this.timestamps.push(now);
    return true;
  }

  /**
   * Get remaining time until next request is allowed (in ms)
   */
  getRetryAfter(): number {
    if (this.timestamps.length === 0) return 0;

    const oldestTimestamp = this.timestamps[0];
    const retryAfter = oldestTimestamp + this.windowMs - Date.now();
    return Math.max(0, retryAfter);
  }

  /**
   * Reset the rate limiter
   */
  reset(): void {
    this.timestamps = [];
  }
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard for string values
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Type guard for number values (excludes NaN and Infinity)
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/**
 * Type guard for integer values within safe range
 * SECURITY: Prevents integer overflow issues
 */
export function isSafeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value);
}

/**
 * Type guard for boolean values
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

// ============================================================================
// ERROR RESPONSES
// ============================================================================

/**
 * Standard error response format for API errors
 * SECURITY: Provides consistent, safe error messages without leaking internals
 */
export interface SecurityError {
  code: string;
  message: string;
  retryAfter?: number;
}

/**
 * Create a rate limit error response
 * SECURITY: Returns proper 429 response format
 */
export function createRateLimitError(retryAfterSeconds: number): SecurityError {
  return {
    code: "RATE_LIMITED",
    message: "Too many requests. Please try again later.",
    retryAfter: retryAfterSeconds,
  };
}

/**
 * Create a validation error response
 * SECURITY: Generic message prevents enumeration attacks
 */
export function createValidationError(field?: string): SecurityError {
  return {
    code: "VALIDATION_ERROR",
    message: field
      ? `Invalid value for field: ${field}`
      : "Invalid request data",
  };
}
