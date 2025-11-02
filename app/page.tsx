/**
 * Root page - displays help/usage information for the redirect service
 */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-10 dark:opacity-20"></div>
        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/50 animate-pulse">
            <span className="text-4xl">🔀</span>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            Redirect Service
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Perform HTTP 302 redirects with path parameters. Perfect for OAuth callbacks and
            localhost development.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-20">
        {/* Usage Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></span>
            Usage
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Specify the scheme and target URL in the path. The service supports explicit schemes and
            smart defaults.
          </p>

          {/* Explicit Scheme Card */}
          <div className="mb-8 group">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 dark:border-gray-700/50 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">🔵</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Explicit Scheme</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/50 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
                  <code className="block text-sm font-mono text-gray-800 dark:text-gray-200 break-all mb-2">
                    http://localredirect.vercel.app/http/localhost:5173/callback
                  </code>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="text-green-600 dark:text-green-400">→</span>
                    <span>http://localhost:5173/callback</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/50 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
                  <code className="block text-sm font-mono text-gray-800 dark:text-gray-200 break-all mb-2">
                    http://localredirect.vercel.app/https/postonus.com/callback
                  </code>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="text-green-600 dark:text-green-400">→</span>
                    <span>https://postonus.com/callback</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Defaults Card */}
          <div className="mb-8 group">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 dark:border-gray-700/50 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">✨</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Smart Defaults</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200/50 dark:border-green-800/50 hover:border-green-400 dark:hover:border-green-600 transition-colors">
                  <code className="block text-sm font-mono text-gray-800 dark:text-gray-200 break-all mb-2">
                    http://localredirect.vercel.app/localhost:5173/callback
                  </code>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="text-green-600 dark:text-green-400">→</span>
                    <span>http://localhost:5173/callback (defaults to http)</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200/50 dark:border-green-800/50 hover:border-green-400 dark:hover:border-green-600 transition-colors">
                  <code className="block text-sm font-mono text-gray-800 dark:text-gray-200 break-all mb-2">
                    http://localredirect.vercel.app/postonus.com/callback
                  </code>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="text-green-600 dark:text-green-400">→</span>
                    <span>https://postonus.com/callback (defaults to https)</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200/50 dark:border-green-800/50 hover:border-green-400 dark:hover:border-green-600 transition-colors">
                  <code className="block text-sm font-mono text-gray-800 dark:text-gray-200 break-all mb-2">
                    http://localredirect.vercel.app/127.0.0.1:3000/auth
                  </code>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="text-green-600 dark:text-green-400">→</span>
                    <span>http://127.0.0.1:3000/auth (localhost detected)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Note Card */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 backdrop-blur-lg rounded-2xl p-6 border border-amber-200/50 dark:border-amber-800/50 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">ℹ️</span>
              </div>
              <div>
                <strong className="block text-amber-900 dark:text-amber-200 mb-2 font-semibold">
                  Note
                </strong>
                <p className="text-amber-800 dark:text-amber-300 text-sm">
                  If a URL already includes a scheme (http:// or https://), defaults are ignored and
                  the URL is used as-is.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></span>
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Supports localhost and custom ports (perfect for OAuth local dev)',
              'Smart defaults: http for localhost, https for domains',
              'Explicit scheme override when needed',
              'Validates URL format',
              'Returns 400 for invalid URLs',
              'Includes CORS headers',
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-gray-700/50 hover:scale-[1.02] group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {feature}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
