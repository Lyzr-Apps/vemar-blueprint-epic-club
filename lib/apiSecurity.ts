import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// API Key structure
export interface ApiKey {
  id: string
  key: string
  name: string
  permissions: string[]
  rateLimit: number
  createdAt: Date
  lastUsedAt?: Date
  expiresAt?: Date
  isActive: boolean
}

// Rate limiting storage (in-memory, could be Redis in production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

// API Keys storage (would be in database in production)
const apiKeysStore = new Map<string, ApiKey>()

// Generate a secure API key
export function generateApiKey(): string {
  const prefix = 'vemar_'
  const randomBytes = crypto.randomBytes(32).toString('hex')
  return `${prefix}${randomBytes}`
}

// Hash API key for storage
export function hashApiKey(apiKey: string): string {
  return crypto.createHash('sha256').update(apiKey).digest('hex')
}

// Verify API key
export function verifyApiKey(apiKey: string): ApiKey | null {
  const hashedKey = hashApiKey(apiKey)
  return apiKeysStore.get(hashedKey) || null
}

// Check rate limit
export function checkRateLimit(apiKey: string, limit: number): boolean {
  const now = Date.now()
  const windowMs = 60000 // 1 minute window

  const current = rateLimitStore.get(apiKey)

  if (!current || now > current.resetAt) {
    rateLimitStore.set(apiKey, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (current.count >= limit) {
    return false
  }

  current.count++
  return true
}

// Validate request signature (HMAC)
export function validateRequestSignature(
  request: NextRequest,
  secret: string
): boolean {
  const signature = request.headers.get('x-signature')
  const timestamp = request.headers.get('x-timestamp')

  if (!signature || !timestamp) {
    return false
  }

  // Check if timestamp is within 5 minutes
  const now = Date.now()
  const requestTime = parseInt(timestamp)
  if (Math.abs(now - requestTime) > 300000) {
    return false
  }

  // Compute expected signature
  const payload = `${timestamp}:${request.method}:${request.url}`
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  return signature === expectedSignature
}

// API Security Middleware
export async function withApiSecurity(
  request: NextRequest,
  options?: {
    requireAuth?: boolean
    requiredPermissions?: string[]
    rateLimit?: number
    requireSignature?: boolean
    allowInternal?: boolean
  }
): Promise<NextResponse | null> {
  const {
    requireAuth = true,
    requiredPermissions = [],
    rateLimit = 100,
    requireSignature = false,
    allowInternal = true,
  } = options || {}

  // Allow internal frontend requests in development
  if (allowInternal && process.env.NODE_ENV === 'development') {
    const internalMarker = request.headers.get('X-Internal-Request')
    if (internalMarker === 'true') {
      return null
    }
  }

  // Extract API key from header
  const authHeader = request.headers.get('authorization')

  if (requireAuth && !authHeader) {
    return NextResponse.json(
      {
        success: false,
        error: 'Missing authorization header',
        code: 'MISSING_AUTH',
      },
      { status: 401 }
    )
  }

  if (authHeader) {
    const apiKey = authHeader.replace('Bearer ', '')

    // Verify API key
    const keyData = verifyApiKey(apiKey)

    if (!keyData) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid API key',
          code: 'INVALID_KEY',
        },
        { status: 401 }
      )
    }

    if (!keyData.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: 'API key is inactive',
          code: 'INACTIVE_KEY',
        },
        { status: 401 }
      )
    }

    if (keyData.expiresAt && new Date() > keyData.expiresAt) {
      return NextResponse.json(
        {
          success: false,
          error: 'API key has expired',
          code: 'EXPIRED_KEY',
        },
        { status: 401 }
      )
    }

    // Check permissions
    if (requiredPermissions.length > 0) {
      const hasPermission = requiredPermissions.every((perm) =>
        keyData.permissions.includes(perm)
      )

      if (!hasPermission) {
        return NextResponse.json(
          {
            success: false,
            error: 'Insufficient permissions',
            code: 'INSUFFICIENT_PERMISSIONS',
            required: requiredPermissions,
            current: keyData.permissions,
          },
          { status: 403 }
        )
      }
    }

    // Check rate limit
    if (!checkRateLimit(apiKey, keyData.rateLimit || rateLimit)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded',
          code: 'RATE_LIMIT_EXCEEDED',
          limit: keyData.rateLimit || rateLimit,
        },
        { status: 429 }
      )
    }

    // Validate signature if required
    if (requireSignature) {
      if (!validateRequestSignature(request, apiKey)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid request signature',
            code: 'INVALID_SIGNATURE',
          },
          { status: 401 }
        )
      }
    }

    // Update last used timestamp
    keyData.lastUsedAt = new Date()
  }

  // All checks passed
  return null
}

// Create API key (admin function)
export function createApiKey(
  name: string,
  permissions: string[],
  rateLimit: number = 100,
  expiresInDays?: number
): { key: string; hashedKey: string; keyData: ApiKey } {
  const key = generateApiKey()
  const hashedKey = hashApiKey(key)

  const keyData: ApiKey = {
    id: crypto.randomBytes(16).toString('hex'),
    key: hashedKey,
    name,
    permissions,
    rateLimit,
    createdAt: new Date(),
    expiresAt: expiresInDays
      ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
      : undefined,
    isActive: true,
  }

  apiKeysStore.set(hashedKey, keyData)

  return { key, hashedKey, keyData }
}

// Revoke API key
export function revokeApiKey(apiKey: string): boolean {
  const hashedKey = hashApiKey(apiKey)
  const keyData = apiKeysStore.get(hashedKey)

  if (keyData) {
    keyData.isActive = false
    return true
  }

  return false
}

// List all API keys (admin function)
export function listApiKeys(): ApiKey[] {
  return Array.from(apiKeysStore.values()).map((key) => ({
    ...key,
    key: '***' + key.key.slice(-8), // Mask the key
  }))
}

// Encrypt sensitive data
export function encryptData(data: string, secret: string): string {
  const iv = crypto.randomBytes(16)
  const key = crypto.scryptSync(secret, 'salt', 32)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)

  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  return iv.toString('hex') + ':' + encrypted
}

// Decrypt sensitive data
export function decryptData(encryptedData: string, secret: string): string {
  const [ivHex, encrypted] = encryptedData.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const key = crypto.scryptSync(secret, 'salt', 32)
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)

  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}

// Validate request body schema
export function validateRequestBody(
  body: any,
  schema: Record<string, any>
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  for (const [field, rules] of Object.entries(schema)) {
    const value = body[field]

    if (rules.required && (value === undefined || value === null)) {
      errors.push(`Field '${field}' is required`)
      continue
    }

    if (value !== undefined && value !== null) {
      if (rules.type && typeof value !== rules.type) {
        errors.push(`Field '${field}' must be of type ${rules.type}`)
      }

      if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
        errors.push(`Field '${field}' must be at least ${rules.minLength} characters`)
      }

      if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
        errors.push(`Field '${field}' must be at most ${rules.maxLength} characters`)
      }

      if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
        errors.push(`Field '${field}' format is invalid`)
      }

      if (rules.enum && !rules.enum.includes(value)) {
        errors.push(`Field '${field}' must be one of: ${rules.enum.join(', ')}`)
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// IP-based rate limiting
const ipRateLimitStore = new Map<string, { count: number; resetAt: number }>()

export function checkIpRateLimit(ip: string, limit: number = 1000): boolean {
  const now = Date.now()
  const windowMs = 3600000 // 1 hour window

  const current = ipRateLimitStore.get(ip)

  if (!current || now > current.resetAt) {
    ipRateLimitStore.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (current.count >= limit) {
    return false
  }

  current.count++
  return true
}

// Get client IP from request
export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}
