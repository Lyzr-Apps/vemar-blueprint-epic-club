import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET single request
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const requestData = await prisma.request.findUnique({
      where: { id: params.id },
      include: {
        client: true,
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        attachments: true,
        agentActions: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!requestData) {
      return NextResponse.json(
        {
          success: false,
          error: 'Request not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      request: requestData,
    })
  } catch (error) {
    console.error('Error fetching request:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch request',
      },
      { status: 500 }
    )
  }
}

// PATCH update request
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const {
      status,
      priority,
      assignedAgent,
      estimatedHours,
      actualHours,
      dueDate,
    } = body

    const updateData: any = {}
    if (status) {
      updateData.status = status
      if (status === 'COMPLETED') {
        updateData.completedAt = new Date()
      }
    }
    if (priority) updateData.priority = priority
    if (assignedAgent) updateData.assignedAgent = assignedAgent
    if (estimatedHours !== undefined) updateData.estimatedHours = estimatedHours
    if (actualHours !== undefined) updateData.actualHours = actualHours
    if (dueDate) updateData.dueDate = new Date(dueDate)

    const updatedRequest = await prisma.request.update({
      where: { id: params.id },
      data: updateData,
      include: {
        client: true,
      },
    })

    return NextResponse.json({
      success: true,
      request: updatedRequest,
    })
  } catch (error) {
    console.error('Error updating request:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update request',
      },
      { status: 500 }
    )
  }
}

// DELETE request
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.request.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: 'Request deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting request:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete request',
      },
      { status: 500 }
    )
  }
}
