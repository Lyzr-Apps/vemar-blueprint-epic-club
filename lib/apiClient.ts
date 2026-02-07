/**
 * API Client for internal frontend requests
 *
 * This provides a wrapper for frontend components to make API calls.
 * For local development and internal UI calls, this bypasses API key requirements.
 * In production, this would integrate with your authentication system.
 */

// Check if request is from internal frontend (same origin)
export function isInternalRequest(request: Request): boolean {
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')

  // In development, allow localhost requests without API key
  if (process.env.NODE_ENV === 'development') {
    return true
  }

  // In production, check if request comes from same origin
  if (origin || referer) {
    const requestUrl = new URL(request.url)
    const requestOrigin = `${requestUrl.protocol}//${requestUrl.host}`

    if (origin === requestOrigin || referer?.startsWith(requestOrigin)) {
      return true
    }
  }

  return false
}

// Create internal API client for frontend components
export async function internalApiFetch(
  url: string,
  options?: RequestInit
): Promise<Response> {
  // Add internal request marker
  const headers = new Headers(options?.headers)
  headers.set('X-Internal-Request', 'true')

  return fetch(url, {
    ...options,
    headers,
  })
}
