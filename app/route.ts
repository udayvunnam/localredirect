/**
 * Minimal HTTPS Redirect Service for Next.js App Router
 * Accepts path parameters and redirects with 302
 * Handles root path: https://redirect.example.com/
 */

const HELP_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirect Service - Usage</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-sans antialiased bg-gray-50 text-gray-900">
  <div class="max-w-2xl mx-auto px-6 py-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">🔀 Redirect Service</h1>
    <p class="text-lg text-gray-700 mb-6">This service performs HTTP 302 redirects using path parameters. Use the path to specify your target URL.</p>

    <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Usage</h2>
    <p class="text-gray-700 mb-6">Specify the scheme and target URL in the path. The service supports explicit schemes and smart defaults.</p>

    <div class="bg-gray-50 border-l-4 border-blue-500 p-4 my-6 rounded-r">
      <strong class="text-gray-900 block mb-3">✅ Explicit Scheme:</strong>
      <div class="space-y-2 font-mono text-sm">
        <div>
          <code class="bg-white px-2 py-1 rounded block">/http/localhost:5173/callback</code>
          <span class="text-gray-600 text-xs block mt-1">→ http://localhost:5173/callback</span>
        </div>
        <div>
          <code class="bg-white px-2 py-1 rounded block">/https/postonus.com/callback</code>
          <span class="text-gray-600 text-xs block mt-1">→ https://postonus.com/callback</span>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 border-l-4 border-green-500 p-4 my-6 rounded-r">
      <strong class="text-gray-900 block mb-3">✅ Smart Defaults:</strong>
      <div class="space-y-2 font-mono text-sm">
        <div>
          <code class="bg-white px-2 py-1 rounded block">/localhost:5173/callback</code>
          <span class="text-gray-600 text-xs block mt-1">→ http://localhost:5173/callback (defaults to http)</span>
        </div>
        <div>
          <code class="bg-white px-2 py-1 rounded block">/postonus.com/callback</code>
          <span class="text-gray-600 text-xs block mt-1">→ https://postonus.com/callback (defaults to https)</span>
        </div>
        <div>
          <code class="bg-white px-2 py-1 rounded block">/127.0.0.1:3000/auth</code>
          <span class="text-gray-600 text-xs block mt-1">→ http://127.0.0.1:3000/auth (localhost detected)</span>
        </div>
      </div>
    </div>

    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-r">
      <strong class="text-gray-900 block mb-2">ℹ️ Note:</strong>
      <p class="text-gray-700 text-sm">If a URL already includes a scheme (http:// or https://), defaults are ignored and the URL is used as-is.</p>
    </div>

    <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Features</h2>
    <ul class="list-disc list-inside space-y-2 text-gray-700">
      <li>✅ Supports localhost and custom ports (perfect for OAuth local dev)</li>
      <li>✅ Smart defaults: http for localhost, https for domains</li>
      <li>✅ Explicit scheme override when needed</li>
      <li>✅ Validates URL format</li>
      <li>✅ Returns 400 for invalid URLs</li>
      <li>✅ Includes CORS headers</li>
    </ul>
  </div>
</body>
</html>
`;

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

export async function GET() {
  // Show help page at root
  return createResponse(HELP_HTML, 200);
}

export async function OPTIONS() {
  return createResponse('', 200);
}
