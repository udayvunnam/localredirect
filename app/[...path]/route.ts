/**
 * Minimal HTTPS Redirect Service for Next.js App Router
 * Accepts path parameters and redirects with 302
 * Formats:
 * - /http/localhost:5173/callback
 * - /https/postonus.com/callback
 * - /localhost:5173/callback (defaults to http)
 * - /postonus.com/callback (defaults to https)
 */

function createResponse(
  body: string | object,
  status: number,
  headers?: Record<string, string>
): Response {
  const isJson = typeof body === 'object';
  const response = new Response(isJson ? JSON.stringify(body) : body, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      ...(isJson
        ? { 'Content-Type': 'application/json' }
        : { 'Content-Type': 'text/html; charset=utf-8' }),
      ...headers,
    },
  });
  return response;
}

function isLocalhost(host: string): boolean {
  return (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '::1' ||
    host.startsWith('localhost:') ||
    host.startsWith('127.0.0.1:') ||
    host.startsWith('[::1]:')
  );
}

function buildRedirectUrl(pathSegments: string[]): string | null {
  if (pathSegments.length === 0) {
    return null;
  }

  // Check if first segment is a scheme
  const firstSegment = pathSegments[0];
  let scheme: string;
  let remainingPath: string[];

  if (firstSegment === 'http' || firstSegment === 'https') {
    // Explicit scheme provided: /http/... or /https/...
    scheme = firstSegment;
    remainingPath = pathSegments.slice(1);
  } else {
    // No explicit scheme, need to determine default
    const target = pathSegments.join('/');

    // Check if it already has a scheme (ignore defaults if present)
    if (target.includes('://')) {
      // Scheme already present, use as-is
      return target;
    }

    // Check if it looks like localhost (default to http)
    if (isLocalhost(firstSegment)) {
      scheme = 'http';
      remainingPath = pathSegments;
    } else {
      // Domain name (default to https)
      scheme = 'https';
      remainingPath = pathSegments;
    }
  }

  // Reconstruct the URL
  const hostAndPath = remainingPath.join('/');

  // Add scheme prefix
  return `${scheme}://${hostAndPath}`;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string | string[] }> }
) {
  const { path } = await params;
  // Normalize to array (catch-all routes should always be array, but handle edge cases)
  const pathSegments = Array.isArray(path) ? path : path ? [path] : [];

  if (pathSegments.length === 0) {
    return createResponse({ error: 'Invalid redirect URL' }, 400);
  }

  // Build the redirect URL
  const redirectUrl = buildRedirectUrl(pathSegments);

  if (!redirectUrl) {
    return createResponse({ error: 'Invalid redirect URL' }, 400);
  }

  // Validate the URL
  try {
    // Decode the URL in case it's encoded
    const decodedUrl = decodeURIComponent(redirectUrl);

    // Use URL constructor to validate
    // This will throw if the URL is invalid
    const url = new URL(decodedUrl);

    // Additional validation: ensure protocol is http or https
    if (!['http:', 'https:'].includes(url.protocol)) {
      return createResponse({ error: 'Invalid redirect URL' }, 400);
    }

    // If validation passes, perform 302 redirect
    return createResponse('', 302, {
      Location: decodedUrl,
    });
  } catch {
    // URL validation failed
    return createResponse({ error: 'Invalid redirect URL' }, 400);
  }
}

export async function OPTIONS() {
  return createResponse('', 200);
}
