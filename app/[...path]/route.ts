/**
 * Minimal HTTPS Redirect Service for Next.js App Router
 * Accepts path parameters and redirects with 302
 * Formats:
 * - /http/localhost:5173/callback
 * - /https/postonus.com/callback
 * - /localhost:5173/callback (defaults to http)
 * - /postonus.com/callback (defaults to https)
 */

// Use Edge Runtime for faster cold starts and lower latency
export const runtime = 'edge';

// Pre-allocated error response to reduce allocations
const ERROR_RESPONSE = new Response(JSON.stringify({ error: 'Invalid redirect URL' }), {
  status: 400,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
});

// Optimized localhost check using early returns
function isLocalhost(host: string): boolean {
  if (host === 'localhost' || host === '127.0.0.1' || host === '::1') {
    return true;
  }
  // Check prefixes more efficiently
  return (
    host.startsWith('localhost:') || host.startsWith('127.0.0.1:') || host.startsWith('[::1]:')
  );
}

// Optimized URL builder with reduced allocations
function buildRedirectUrl(pathSegments: string[]): string | null {
  const len = pathSegments.length;
  if (len === 0) {
    return null;
  }

  const firstSegment = pathSegments[0];

  // Check for explicit scheme first (most common case)
  if (firstSegment === 'http' || firstSegment === 'https') {
    // Explicit scheme: reconstruct URL
    if (len === 1) return null; // Need at least host
    // Optimize: avoid join if single remaining segment
    if (len === 2) {
      return `${firstSegment}://${pathSegments[1]}`;
    }
    return `${firstSegment}://${pathSegments.slice(1).join('/')}`;
  }

  // Check if already contains scheme (fast path)
  // Use first segment as quick check, then full join if needed
  if (firstSegment.includes('://')) {
    // Optimize: avoid join if single segment
    return len === 1 ? firstSegment : pathSegments.join('/');
  }

  // Determine scheme based on host
  const scheme = isLocalhost(firstSegment) ? 'http' : 'https';
  return `${scheme}://${pathSegments.join('/')}`;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string | string[] }> }
) {
  const { path } = await params;

  // Normalize to array (optimized path)
  let pathSegments: string[];
  if (Array.isArray(path)) {
    pathSegments = path;
  } else if (path) {
    pathSegments = [path];
  } else {
    return ERROR_RESPONSE;
  }

  if (pathSegments.length === 0) {
    return ERROR_RESPONSE;
  }

  // Build the redirect URL
  const redirectUrl = buildRedirectUrl(pathSegments);
  if (!redirectUrl) {
    return ERROR_RESPONSE;
  }

  // Validate the URL efficiently
  try {
    // Decode only if necessary (check for % encoding)
    const decodedUrl = redirectUrl.includes('%') ? decodeURIComponent(redirectUrl) : redirectUrl;

    // Use URL constructor to validate (throws on invalid URLs)
    const url = new URL(decodedUrl);

    // Validate protocol (only http/https allowed)
    const protocol = url.protocol;
    if (protocol !== 'http:' && protocol !== 'https:') {
      return ERROR_RESPONSE;
    }

    // Preserve query parameters and hash from the original request
    const requestUrl = new URL(request.url);

    // Extract hash from query parameter (for API-to-API calls)
    // Since HTTP requests don't include hash fragments, they can be passed as ?hash=value
    let hashFragment = '';
    const requestParams = new URLSearchParams(requestUrl.search);

    // Check for hash in query params (supports both 'hash' and '_hash' keys)
    const hashParam = requestParams.get('hash') || requestParams.get('_hash');
    if (hashParam) {
      // Remove hash from params so it doesn't appear in query string
      requestParams.delete('hash');
      requestParams.delete('_hash');
      // Add # prefix if not already present
      hashFragment = hashParam.startsWith('#') ? hashParam : `#${hashParam}`;
    }

    // Append query parameters if present (excluding hash params which we handled above)
    if (requestParams.toString()) {
      // If the redirect URL already has query params, merge them
      if (url.search) {
        const existingParams = new URLSearchParams(url.search);
        // Merge params, with request params taking precedence
        for (const [key, value] of requestParams.entries()) {
          existingParams.set(key, value);
        }
        url.search = existingParams.toString();
      } else {
        url.search = requestParams.toString();
      }
    }

    // Append hash fragment to the redirect URL
    if (hashFragment) {
      url.hash = hashFragment;
    }

    // Use Response.redirect() for optimized 302 redirect
    return Response.redirect(url.toString(), 302);
  } catch {
    // URL validation failed
    return ERROR_RESPONSE;
  }
}

export async function OPTIONS() {
  // Pre-allocated OPTIONS response
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
