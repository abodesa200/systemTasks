// app/api/tasks/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: params.id },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            client: true
          }
        },
        tags: true,
        assignees: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
                email: true
              }
            }
          }
        }
      }
    })

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    // تحويل البيانات إلى التنسيق المتوقع
    const formattedTask = {
      ...task,
      assignees: task.assignees.map(assignment => assignment.user),
      dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : null,
      createdAt: task.createdAt.toISOString().split('T')[0],
      updatedAt: task.updatedAt.toISOString().split('T')[0]
    }

    return NextResponse.json(formattedTask)
  } catch (error) {
    console.error('Error fetching task:', error)
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      status,
      priority,
      progress,
      comments,
      attachments,
      projectId,
      dueDate,
      estimatedHours,
      spentHours,
      assignees,
      tags
    } = body

    // الحصول على المهمة الحالية
    const currentTask = await prisma.task.findUnique({
      where: { id: params.id },
      include: {
        assignees: true
      }
    })

    if (!currentTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    // تحديث المهمة
    const task = await prisma.task.update({
      where: { id: params.id },
      data: {
        title,
        description,
        status,
        priority,
        progress: parseInt(progress) || 0,
        comments: parseInt(comments) || 0,
        attachments: parseInt(attachments) || 0,
        dueDate: dueDate ? new Date(dueDate) : null,
        estimatedHours: parseInt(estimatedHours) || 0,
        spentHours: parseInt(spentHours) || 0,
        projectId: projectId || null,
        tags: {
          set: tags?.map((tagId: string) => ({ id: tagId })) || []
        },
        assignees: {
          deleteMany: {},
          create: assignees?.map((userId: string) => ({
            user: { connect: { id: userId } }
          })) || []
        }
      },
      include: {
        project: true,
        tags: true,
        assignees: {
          include: {
            user: true
          }
        }
      }
    })

    // تحويل البيانات إلى التنسيق المتوقع
    const formattedTask = {
      ...task,
      assignees: task.assignees.map(assignment => assignment.user),
      dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : null,
      createdAt: task.createdAt.toISOString().split('T')[0],
      updatedAt: task.updatedAt.toISOString().split('T')[0]
    }

    return NextResponse.json(formattedTask)
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.task.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    )
  }
}