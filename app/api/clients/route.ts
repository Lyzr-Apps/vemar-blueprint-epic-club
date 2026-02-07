import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withApiSecurity } from '@/lib/apiSecurity'

// GET all clients
export async function GET(request: NextRequest) {
  // Apply API security
  const securityError = await withApiSecurity(request, {
    requireAuth: true,
    requiredPermissions: ['read:clients'],
  })

  if (securityError) {
    return securityError
  }

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')

    const where: any = {}
    if (status) where.status = status
    if (priority) where.priority = priority

    const clients = await prisma.client.findMany({
      where,
      include: {
        requests: {
          select: {
            id: true,
            status: true,
            priority: true,
          },
        },
        _count: {
          select: {
            requests: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      clients,
    })
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch clients',
      },
      { status: 500 }
    )
  }
}

// POST create new client
export async function POST(request: NextRequest) {
  // Apply API security
  const securityError = await withApiSecurity(request, {
    requireAuth: true,
    requiredPermissions: ['write:clients'],
  })

  if (securityError) {
    return securityError
  }

  try {
    const body = await request.json()
    const { name, email, company, phone, priority } = body

    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name and email are required',
        },
        { status: 400 }
      )
    }

    const client = await prisma.client.create({
      data: {
        name,
        email,
        company,
        phone,
        priority: priority || 'STANDARD',
      },
    })

    return NextResponse.json({
      success: true,
      client,
    })
  } catch (error: any) {
    console.error('Error creating client:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        {
          success: false,
          error: 'Client with this email already exists',
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create client',
      },
      { status: 500 }
    )
  }
}
