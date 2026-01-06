import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// ============================================================================
// SECURITY HARDENING (OWASP Best Practices)
// ============================================================================
// This configuration implements security headers and build optimizations
// for a static frontend. Rate limiting must be configured at the hosting/CDN
// layer (e.g., Cloudflare, Vercel, Netlify, AWS CloudFront) since this is
// a client-side only application with no backend API endpoints.
//
// NOTE: CSP (Content-Security-Policy) is NOT set here because Vite's dev
// server uses inline scripts and HMR which would be blocked. CSP is instead
// configured in public/_headers for production deployments.
// ============================================================================

// Security headers for development and preview servers
// NOTE: For production, configure these at your hosting provider/CDN level
const securityHeaders = {
  // Prevents MIME-sniffing attacks (OWASP)
  "X-Content-Type-Options": "nosniff",
  // Prevents clickjacking attacks (OWASP)
  "X-Frame-Options": "DENY",
  // Controls referrer information leakage
  "Referrer-Policy": "strict-origin-when-cross-origin",
  // Restricts browser features for privacy/security
  "Permissions-Policy": "geolocation=(), microphone=(), camera=(), payment=()",
  // Prevents cross-origin attacks
  "Cross-Origin-Opener-Policy": "same-origin",
  // CSP is configured in public/_headers for production only
  // Vite dev server requires inline scripts which CSP would block
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // SECURITY: Apply security headers in development
    headers: securityHeaders,
  },
  // SECURITY: Preview server also gets security headers
  preview: {
    headers: securityHeaders,
  },
  // Security/ownership: remove third-party tagging plugin so builds/dev are fully ours.
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // SECURITY: Build optimizations
  build: {
    // Generate source maps only in development for debugging
    // Disabled in production to prevent exposing source code
    sourcemap: mode === "development",
    // Minify output to reduce attack surface and improve performance
    minify: "esbuild",
    // Target modern browsers for better security features
    target: "es2020",
  },
}));
