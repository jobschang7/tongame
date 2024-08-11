// app/api/tasks/check/telegram/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { validateTelegramWebAppData } from '@/utils/server-checks';

interface CheckTelegramTaskRequestBody {
    initData: string;
    taskId: string;
}

export async function POST(req: Request) {
    const botToken = process.env.BOT_TOKEN;

    if (!botToken) {
        return NextResponse.json({ error: 'Telegram bot token is missing' }, { status: 500 });
    }

    const requestBody: CheckTelegramTaskRequestBody = await req.json();
    const { initData: telegramInitData, taskId } = requestBody;

    if (!telegramInitData || !taskId) {
        return NextResponse.json({ error: 'Invalid request: missing initData or taskId' }, { status: 400 });
    }

    const { validatedData, user } = validateTelegramWebAppData(telegramInitData);

    if (!validatedData) {
        return NextResponse.json({ error: 'Invalid Telegram data' }, { status: 403 });
    }

    const telegramId = user.id?.toString();

    if (!telegramId) {
        return NextResponse.json({ error: 'Invalid user data: missing telegramId' }, { status: 400 });
    }

    try {
        const result = await prisma.$transaction(async (prisma) => {
            // Find the user
            const dbUser = await prisma.user.findUnique({
                where: { telegramId },
            });

            if (!dbUser) {
                throw new Error('User not found in database');
            }

            // Find the task
            const task = await prisma.task.findUnique({
                where: { id: taskId },
            });

            if (!task) {
                throw new Error('Task not found in database');
            }

            // Check if the task is active
            if (!task.isActive) {
                throw new Error('This task is no longer active');
            }

            // Check if the task is of type TELEGRAM
            if (task.type !== 'TELEGRAM' || !task.taskData) {
                throw new Error('Invalid task type or missing task data for this operation');
            }

            const channelUsername = (task.taskData as any).chatId;
            if (!channelUsername) {
                throw new Error('Missing Telegram channel/group username in task data');
            }

            // Check if the user is a member of the channel/group
            let isMember = false;
            try {
                let formattedChatId = channelUsername;
                if (!channelUsername.startsWith('@') && !channelUsername.startsWith('-100')) {
                    formattedChatId = '@' + channelUsername;
                }

                const url = `https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${encodeURIComponent(formattedChatId)}&user_id=${telegramId}`;
                console.log('Checking membership with URL:', url);

                const response = await fetch(url);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Telegram API error:', response.status, errorText);
                    throw new Error(`Telegram API error: ${response.status} ${errorText}`);
                }

                const data = await response.json();
                console.log('Telegram API response:', data);

                if (data.ok) {
                    const status = data.result.status;
                    isMember = ['creator', 'administrator', 'member'].includes(status);
                } else {
                    throw new Error(`Telegram API returned false: ${JSON.stringify(data)}`);
                }
            } catch (error) {
                console.error('Error checking channel membership:', error);
                if (error instanceof Error) {
                    throw new Error(`Failed to check channel membership: ${error.message}`);
                } else {
                    throw new Error('Failed to check channel membership: Unknown error');
                }
            }

            if (!isMember) {
                return {
                    success: false,
                    message: 'You are not a member of the required Telegram channel/group.',
                };
            }

            // Check if the task is already completed
            const existingUserTask = await prisma.userTask.findUnique({
                where: {
                    userId_taskId: {
                        userId: dbUser.id,
                        taskId: task.id,
                    },
                },
            });

            if (existingUserTask?.isCompleted) {
                return {
                    success: false,
                    message: 'This task has already been completed.',
                    isCompleted: true,
                };
            }

            // Update or create the UserTask as completed
            const updatedUserTask = await prisma.userTask.upsert({
                where: {
                    userId_taskId: {
                        userId: dbUser.id,
                        taskId: task.id,
                    },
                },
                update: {
                    isCompleted: true,
                },
                create: {
                    userId: dbUser.id,
                    taskId: task.id,
                    isCompleted: true,
                },
            });

            // Add points to user's balance
            await prisma.user.update({
                where: { id: dbUser.id },
                data: {
                    points: { increment: task.points },
                    pointsBalance: { increment: task.points },
                },
            });

            return {
                success: true,
                message: 'Task completed successfully',
                isCompleted: updatedUserTask.isCompleted,
            };
        });

        return NextResponse.json(result);

    } catch (error) {
        console.error('Error checking Telegram task:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to check Telegram task' }, { status: 500 });
    }
}