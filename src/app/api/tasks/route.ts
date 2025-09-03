// app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const projectId = searchParams.get('projectId')
    const assigneeId = searchParams.get('assigneeId')
    const priority = searchParams.get('priority')

    const where = {
      ...(status && { status }),
      ...(projectId && { projectId }),
      ...(priority && { priority }),
      ...(assigneeId && {
        assignees: {
          some: {
            userId: assigneeId
          }
        }
      })
    }

    const tasks = await prisma.task.findMany({
      where,
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // تحويل البيانات إلى التنسيق المتوقع
    const formattedTasks = tasks.map(task => ({
      ...task,
      assignees: task.assignees.map(assignment => assignment.user),
      dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : null,
      createdAt: task.createdAt.toISOString().split('T')[0],
      updatedAt: task.updatedAt.toISOString().split('T')[0]
    }))

    return NextResponse.json(formattedTasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      status,
      priority,
      projectId,
      dueDate,
      estimatedHours,
      assignees,
      tags
    } = body

    // إنشاء المهمة
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || 'todo',
        priority: priority || 'medium',
        dueDate: dueDate ? new Date(dueDate) : null,
        estimatedHours: parseInt(estimatedHours) || 0,
        projectId: projectId || null,
        tags: {
          connect: tags?.map((tagId: string) => ({ id: tagId })) || []
        },
        assignees: {
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

    return NextResponse.json(formattedTask, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}