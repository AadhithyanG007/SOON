# Security Policy

## Overview

This document outlines the security measures implemented in this static React website and provides guidance for secure deployment and maintenance.

## Project Security Classification

This is a **static frontend application** with the following characteristics:

- **No backend API endpoints** - All rate limiting must be done at the hosting/CDN layer
- **No user data collection** - No forms, authentication, or database connections
- **No API keys or secrets** - Purely presentational content
- **No server-side processing** - All content is pre-built and served as static files

## Implemented Security Measures

### 1. Content Security Policy (CSP)

Implemented via meta tags in `index.html` and headers in production:

```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com data:;
img-src 'self' data: blob:;
connect-src 'self';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
object-src 'none';
```

**What this protects against:**

- XSS (Cross-Site Scripting) attacks
- Data injection attacks
- Clickjacking attacks
- Base tag hijacking
- Form hijacking

### 2. Security Headers

The following headers are configured in `vite.config.ts` (development) and `public/_headers` (production):

| Header                       | Value                                      | Purpose                        |
| ---------------------------- | ------------------------------------------ | ------------------------------ |
| `X-Content-Type-Options`     | `nosniff`                                  | Prevents MIME-sniffing attacks |
| `X-Frame-Options`            | `DENY`                                     | Prevents clickjacking          |
| `Referrer-Policy`            | `strict-origin-when-cross-origin`          | Controls referrer leakage      |
| `Permissions-Policy`         | `geolocation=(), microphone=(), camera=()` | Restricts browser features     |
| `Cross-Origin-Opener-Policy` | `same-origin`                              | Prevents cross-origin attacks  |

### 3. Build Security

- **No source maps in production** - Prevents source code exposure
- **Minified output** - Reduces attack surface and file sizes
- **Modern ES target** - Uses modern browser security features

## Rate Limiting Configuration Guide

Since this is a static site, rate limiting must be configured at your hosting provider:

### Cloudflare

1. Go to **Security → WAF → Rate limiting rules**
2. Create a rule:
   ```
   If: (http.request.uri.path contains "/")
   Then: Block
   With response type: Default Cloudflare Rate Limiting Response
   For: Requests exceeding 100 requests per 10 seconds per IP
   ```

### Netlify

Netlify provides automatic DDoS protection. For additional limits with Netlify Functions:

```javascript
// netlify/functions/api.js
import { RateLimiter } from "rate-limiter-flexible";

const limiter = new RateLimiter({
  points: 100, // requests
  duration: 60, // per minute
});

export async function handler(event) {
  try {
    await limiter.consume(event.headers["x-forwarded-for"]);
    // Process request
  } catch {
    return {
      statusCode: 429,
      body: JSON.stringify({ error: "Too Many Requests" }),
      headers: {
        "Retry-After": "60",
        "Content-Type": "application/json",
      },
    };
  }
}
```

### Vercel

Add to `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

### AWS CloudFront

Use AWS WAF with rate-based rules:

```json
{
  "Name": "RateLimitRule",
  "Priority": 1,
  "Statement": {
    "RateBasedStatement": {
      "Limit": 2000,
      "AggregateKeyType": "IP"
    }
  },
  "Action": {
    "Block": {
      "CustomResponse": {
        "ResponseCode": 429
      }
    }
  }
}
```

## Input Validation Guidelines

While this site currently has no user input forms, if you add them in the future:

### Schema-Based Validation (using Zod)

```typescript
import { z } from "zod";

// Define strict schemas for all input
const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Invalid characters"),
  email: z.string().email("Invalid email").max(254, "Email too long"),
  message: z
    .string()
    .min(10, "Message too short")
    .max(1000, "Message too long"),
});

// Usage
function handleSubmit(data: unknown) {
  const result = ContactFormSchema.safeParse(data);

  if (!result.success) {
    // Return 400 with validation errors
    return { status: 400, errors: result.error.flatten() };
  }

  // Process validated data
  const { name, email, message } = result.data;
}
```

### XSS Prevention

```typescript
// NEVER use dangerouslySetInnerHTML with user content
// BAD:
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// GOOD: React automatically escapes content
<div>{userInput}</div>

// For URLs, validate the protocol
function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}
```

## Secret Management Guidelines

### Current Status

This project contains **no secrets or API keys**. If you add external services:

### Environment Variables Setup

1. Create `.env.local` for local development (already in `.gitignore`):

   ```env
   VITE_PUBLIC_ANALYTICS_ID=your-id-here
   ```

2. **NEVER commit secrets** - The `.env.example` file should only contain placeholder values:

   ```env
   # .env.example - Safe to commit
   VITE_PUBLIC_ANALYTICS_ID=your-analytics-id
   ```

3. **Client-side variables must be prefixed with `VITE_`** and are PUBLIC:

   ```typescript
   // These are visible to anyone viewing your site's source
   const analyticsId = import.meta.env.VITE_PUBLIC_ANALYTICS_ID;
   ```

4. **Sensitive keys must NEVER be in frontend code**:
   - API keys with write access
   - Database credentials
   - Private signing keys
   - Payment processor secrets

### Credential Rotation Procedure

If you ever need to rotate credentials:

1. **Generate new credentials** from your service provider
2. **Update environment variables** in your hosting platform
3. **Deploy with new credentials**
4. **Verify the deployment works**
5. **Revoke old credentials** only after verification
6. **Document the rotation** in your security log

## Dependency Security

Run these commands regularly:

```bash
# Check for known vulnerabilities
npm audit

# Fix automatically where possible
npm audit fix

# Review and update dependencies
npm outdated
npm update
```

## Security Checklist Before Publishing

- [ ] No API keys, secrets, or credentials in code
- [ ] No `.env` files committed to repository
- [ ] CSP headers configured correctly
- [ ] Security headers tested (use securityheaders.com)
- [ ] Dependencies audited with `npm audit`
- [ ] Source maps disabled for production build
- [ ] Rate limiting configured at hosting layer
- [ ] HTTPS enforced on all pages
- [ ] robots.txt reviewed for sensitive paths

## Reporting Security Issues

If you discover a security vulnerability, please:

1. **Do not** create a public GitHub issue
2. Contact the team directly
3. Provide detailed reproduction steps
4. Allow reasonable time for a fix before disclosure

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
