import { NextRequest, NextResponse } from 'next/server'
import {
  createApiKey,
  revokeApiKey,
  listApiKeys,
  withApiSecurity,
} from '@/lib/apiSecurity'

// GET - List all API keys
export async function GET(request: NextRequest) {
  // Apply API security - requires admin permission
  const securityError = await withApiSecurity(request, {
    requireAuth: true,
    requiredPermissions: ['admin:api-keys'],
  })

  if (securityError) {
    return securityError
  }

  try {
    const apiKeys = listApiKeys()

    return NextResponse.json({
      success: true,
      apiKeys,
    })
  } catch (error) {
    console.error('Error listing API keys:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to list API keys',
      },
      { status: 500 }
    )
  }
}

// POST - Create new API key
export async function POST(request: NextRequest) {
  // Apply API security - requires admin permission
  const securityError = await withApiSecurity(request, {
    requireAuth: true,
    requiredPermissions: ['admin:api-keys'],
  })

  if (securityError) {
    return securityError
  }

  try {
    const body = await request.json()
    const { name, permissions, rateLimit, expiresInDays } = body

    if (!name || !permissions || !Array.isArray(permissions)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name and permissions array are required',
        },
        { status: 400 }
      )
    }

    const { key, keyData } = createApiKey(
      name,
      permissions,
      rateLimit || 100,
      expiresInDays
    )

    return NextResponse.json({
      success: true,
      message: 'API key created successfully',
      apiKey: key, // Only return the key once during creation
      keyData: {
        id: keyData.id,
        name: keyData.name,
        permissions: keyData.permissions,
        rateLimit: keyData.rateLimit,
        createdAt: keyData.createdAt,
        expiresAt: keyData.expiresAt,
      },
    })
  } catch (error) {
    console.error('Error creating API key:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create API key',
      },
      { status: 500 }
    )
  }
}

// DELETE - Revoke API key
export async function DELETE(request: NextRequest) {
  // Apply API security - requires admin permission
  const securityError = await withApiSecurity(request, {
    requireAuth: true,
    requiredPermissions: ['admin:api-keys'],
  })

  if (securityError) {
    return securityError
  }

  try {
    const { searchParams } = new URL(request.url)
    const apiKey = searchParams.get('key')

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'API key is required',
        },
        { status: 400 }
      )
    }

    const revoked = revokeApiKey(apiKey)

    if (!revoked) {
      return NextResponse.json(
        {
          success: false,
          error: 'API key not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'API key revoked successfully',
    })
  } catch (error) {
    console.error('Error revoking API key:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to revoke API key',
      },
      { status: 500 }
    )
  }
}
