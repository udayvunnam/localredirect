# Local Redirect

A minimal HTTPS redirect service for Vercel that enables OAuth callbacks and redirects to localhost during development. Perfect for local development workflows where you need to redirect to `localhost` with custom ports.

## Features

- ✅ **Path-based redirects** - No query parameters needed
- ✅ **Smart defaults** - Automatically uses `http://` for localhost, `https://` for domains
- ✅ **Explicit scheme override** - Use `/http/` or `/https/` to specify the protocol
- ✅ **Localhost support** - Redirects to `localhost`, `127.0.0.1`, and custom ports
- ✅ **Query parameter preservation** - Automatically preserves and forwards query parameters to the redirect target
- ✅ **Hash fragment support** - Supports hash fragments via `?hash=` or `?_hash=` query parameter (perfect for API-to-API calls)
- ✅ **URL validation** - Ensures all redirects are valid before executing
- ✅ **CORS enabled** - Includes `Access-Control-Allow-Origin: *` headers
- ✅ **Beautiful help page** - Interactive documentation at the root URL

## Usage

### Explicit Scheme

Specify the protocol explicitly in the path:

```
https://localredirect.vercel.app/http/localhost:5173/callback
→ http://localhost:5173/callback

https://localredirect.vercel.app/https/postonus.com/callback
→ https://postonus.com/callback
```

### Smart Defaults

The service automatically detects and applies defaults:

```
https://localredirect.vercel.app/localhost:5173/callback
→ http://localhost:5173/callback (defaults to http)

https://localredirect.vercel.app/postonus.com/callback
→ https://postonus.com/callback (defaults to https)

https://localredirect.vercel.app/127.0.0.1:3000/auth
→ http://127.0.0.1:3000/auth (localhost detected)
```

### OAuth Development

Perfect for OAuth callbacks during local development:

```
# In your OAuth provider settings:
https://localredirect.vercel.app/localhost:5173/oauth/callback

# Or with explicit scheme:
https://localredirect.vercel.app/http/localhost:3000/auth/callback
```

### Query Parameters and Hash Fragments

Query parameters are automatically preserved and forwarded to the redirect target:

```
https://localredirect.vercel.app/localhost:5173/callback?code=abc123&state=xyz
→ http://localhost:5173/callback?code=abc123&state=xyz
```

For hash fragments (useful for API-to-API calls), use the `hash` or `_hash` query parameter:

```
https://localredirect.vercel.app/localhost:5173/callback?hash=section&foo=bar
→ http://localhost:5173/callback?foo=bar#section

https://localredirect.vercel.app/http/localhost:3000/auth?_hash=#token&code=abc
→ http://localhost:3000/auth?code=abc#token
```

**Note:** Hash fragments cannot be preserved directly from browser requests (browsers don't send them to servers). Use the `?hash=` query parameter workaround for API-to-API calls.

## API

### GET `/`

Shows the help page with usage documentation.

### GET `/{scheme?}/{host}/{path...}`

Performs a 302 redirect to the constructed URL.

**Parameters:**

- `scheme` (optional): `http` or `https`. If omitted, defaults are applied.
- `host`: The target hostname (e.g., `localhost:5173`, `postonus.com`)
- `path`: Additional path segments

**Query Parameters:**

- Any query parameters in the request URL are automatically forwarded to the redirect target
- Use `?hash=<value>` or `?_hash=<value>` to include a hash fragment in the redirect URL (the hash parameter itself won't appear in the final query string)

**Response:**

- `302` - Redirect to the target URL
- `400` - Invalid redirect URL
- Help page if accessed at root without path

**Headers:**

- `Location`: Target URL (on 302)
- `Access-Control-Allow-Origin: *`

## Development

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm/yarn

### Installation

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the help page.

### Build for Production

```bash
pnpm build
pnpm start
```

### Linting

```bash
pnpm lint
```

## Deployment

### Deploy to Vercel

This project is optimized for [Vercel](https://vercel.com) deployment:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and deploy

Or use the Vercel CLI:

```bash
pnpm install -g vercel
vercel
```

### Custom Domain Setup

1. Add your custom domain in Vercel project settings
2. Configure DNS records as instructed
3. The service will be available at `https://yourdomain.com`

### Environment Variables

No environment variables required. The service is stateless and works out of the box.

## Examples

```bash
# Redirect to localhost (defaults to http)
curl -I https://localredirect.vercel.app/localhost:5173/callback

# Redirect to domain (defaults to https)
curl -I https://localredirect.vercel.app/example.com/auth

# Explicit HTTP for domain
curl -I https://localredirect.vercel.app/http/example.com/path

# Explicit HTTPS for localhost
curl -I https://localredirect.vercel.app/https/localhost:3000/api

# With query parameters (preserved in redirect)
curl -I "https://localredirect.vercel.app/localhost:5173/callback?code=abc123&state=xyz"

# With hash fragment (via query parameter)
curl -I "https://localredirect.vercel.app/localhost:5173/callback?hash=section&foo=bar"
```

## Architecture

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: Node.js (Vercel Serverless Functions)

## Security

- ✅ URL validation prevents open redirects
- ✅ Only `http://` and `https://` protocols allowed
- ✅ Proper error handling for invalid URLs
- ✅ CORS headers included for cross-origin requests

## License

MIT

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.
