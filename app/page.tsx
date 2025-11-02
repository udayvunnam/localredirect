/**
 * Root page - displays help/usage information for the redirect service
 */

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 font-sans antialiased bg-gray-50 text-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">🔀 Redirect Service</h1>
      <p className="text-lg text-gray-700 mb-6">
        This service performs HTTP 302 redirects using path parameters. Use the path to specify your
        target URL.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Usage</h2>
      <p className="text-gray-700 mb-6">
        Specify the scheme and target URL in the path. The service supports explicit schemes and
        smart defaults.
      </p>

      <div className="bg-gray-50 border-l-4 border-blue-500 p-4 my-6 rounded-r">
        <strong className="text-gray-900 block mb-3">✅ Explicit Scheme:</strong>
        <div className="space-y-2 font-mono text-sm">
          <div>
            <code className="bg-white px-2 py-1 rounded block">
              http://localredirect.vercel.app/http/localhost:5173/callback
            </code>
            <span className="text-gray-600 text-xs block mt-1">
              → http://localhost:5173/callback
            </span>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded block">
              http://localredirect.vercel.app/https/postonus.com/callback
            </code>
            <span className="text-gray-600 text-xs block mt-1">
              → https://postonus.com/callback
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-l-4 border-green-500 p-4 my-6 rounded-r">
        <strong className="text-gray-900 block mb-3">✅ Smart Defaults:</strong>
        <div className="space-y-2 font-mono text-sm">
          <div>
            <code className="bg-white px-2 py-1 rounded block">
              http://localredirect.vercel.app/localhost:5173/callback
            </code>
            <span className="text-gray-600 text-xs block mt-1">
              → http://localhost:5173/callback (defaults to http)
            </span>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded block">
              http://localredirect.vercel.app/postonus.com/callback
            </code>
            <span className="text-gray-600 text-xs block mt-1">
              → https://postonus.com/callback (defaults to https)
            </span>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded block">
              http://localredirect.vercel.app/127.0.0.1:3000/auth
            </code>
            <span className="text-gray-600 text-xs block mt-1">
              → http://127.0.0.1:3000/auth (localhost detected)
            </span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-r">
        <strong className="text-gray-900 block mb-2">ℹ️ Note:</strong>
        <p className="text-gray-700 text-sm">
          If a URL already includes a scheme (http:// or https://), defaults are ignored and the URL
          is used as-is.
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Features</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>✅ Supports localhost and custom ports (perfect for OAuth local dev)</li>
        <li>✅ Smart defaults: http for localhost, https for domains</li>
        <li>✅ Explicit scheme override when needed</li>
        <li>✅ Validates URL format</li>
        <li>✅ Returns 400 for invalid URLs</li>
        <li>✅ Includes CORS headers</li>
      </ul>
    </div>
  );
}
