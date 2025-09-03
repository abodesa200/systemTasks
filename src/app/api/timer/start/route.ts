import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // التحقق من وجود تايمر شغال
    const existingActiveTimer = await prisma.workTime.findFirst({
      where: { userId: user.id, date: today, endTime: null }
    });

    if (existingActiveTimer) {
      return NextResponse.json({ error: "Timer already running" }, { status: 400 });
    }

    // إنشاء أو تحديث سجل اليوم
    await prisma.workTime.upsert({
      where: { userId_date: { userId: user.id, date: today } },
      update: { startTime: new Date(), endTime: null },
      create: { userId: user.id, date: today, startTime: new Date(), endTime: null, seconds: 0 },
    });

    return NextResponse.json({ message: "Timer started successfully" });
  } catch (error) {
    console.error("Start Timer API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
