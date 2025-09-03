import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // البحث عن التايمر النشط
    const activeTimer = await prisma.workTime.findFirst({
      where: { userId: user.id, date: today, endTime: null }
    });

    if (!activeTimer) {
      return NextResponse.json({ error: "No active timer found" }, { status: 400 });
    }

    const now = new Date();
    const elapsedSeconds = Math.floor((now.getTime() - activeTimer.startTime.getTime()) / 1000);

    // تحديث السجل: وضع endTime وحساب الثواني
    await prisma.workTime.update({
      where: { id: activeTimer.id },
      data: {
        endTime: now,
        seconds: activeTimer.seconds + elapsedSeconds
      }
    });

    return NextResponse.json({ message: "Timer stopped", seconds: elapsedSeconds });
  } catch (error) {
    console.error("Stop Timer API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
