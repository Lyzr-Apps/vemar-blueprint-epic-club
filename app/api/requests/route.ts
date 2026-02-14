import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendAllNotifications } from '@/lib/notifications'

// GET all requests
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const clientId = searchParams.get('clientId')
    const assignedAgent = searchParams.get('assignedAgent')

    const where: any = {}
    if (status) where.status = status
    if (category) where.category = category
    if (clientId) where.clientId = clientId
    if (assignedAgent) where.assignedAgent = assignedAgent

    const requests = await prisma.request.findMany({
      where,
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            priority: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
        _count: {
          select: {
            messages: true,
            attachments: true,
          },
        },
      },
      orderBy: [
        { priority: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json({
      success: true,
      requests,
    })
  } catch (error) {
    console.error('Error fetching requests:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch requests',
      },
      { status: 500 }
    )
  }
}

// POST create new request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      category,
      priority,
      clientId,
      dueDate,
      estimatedHours,
    } = body

    if (!title || !description || !category || !clientId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title, description, category, and clientId are required',
        },
        { status: 400 }
      )
    }

    // Verify client exists
    const client = await prisma.client.findUnique({
      where: { id: clientId },
    })

    if (!client) {
      return NextResponse.json(
        {
          success: false,
          error: 'Client not found',
        },
        { status: 404 }
      )
    }

    // Auto-assign agent based on category
    const agentAssignment = assignAgentByCategory(category)

    const newRequest = await prisma.request.create({
      data: {
        title,
        description,
        category,
        priority: priority || 'MEDIUM',
        clientId,
        dueDate: dueDate ? new Date(dueDate) : null,
        estimatedHours,
        assignedAgent: agentAssignment,
        status: 'PENDING',
      },
      include: {
        client: true,
      },
    })

    // Create initial system message
    await prisma.message.create({
      data: {
        requestId: newRequest.id,
        content: `Request created and assigned to ${agentAssignment}. We'll get back to you shortly!`,
        sender: 'SYSTEM',
        senderName: 'System',
      },
    })

    // Send notifications (Email, SMS, WhatsApp)
    const notificationResults = await sendAllNotifications({
      clientName: client.name,
      clientEmail: client.email,
      clientPhone: client.phone || undefined,
      requestId: newRequest.id,
      requestTitle: title,
      category,
      assignedAgent: agentAssignment,
      priority: priority || 'MEDIUM',
    })

    console.log('Notifications sent:', notificationResults)

    return NextResponse.json({
      success: true,
      request: newRequest,
      notifications: notificationResults,
    })
  } catch (error) {
    console.error('Error creating request:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create request',
      },
      { status: 500 }
    )
  }
}

// Helper function to assign agent based on category
function assignAgentByCategory(category: string): string {
  const agentMap: Record<string, string> = {
    SUPPORT: 'Support Agent',
    DEVELOPMENT: 'Technical Agent',
    DESIGN: 'Creative Agent',
    CONSULTING: 'Consulting Agent',
    CONTENT: 'Content Agent',
    MARKETING: 'Marketing Agent',
    DATA_ANALYSIS: 'Analytics Agent',
    OTHER: 'General Agent',
  }

  return agentMap[category] || 'General Agent'
}
