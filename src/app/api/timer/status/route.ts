
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // البحث عن التايمر النشط لليوم
    const activeTimer = await prisma.workTime.findFirst({
      where: { 
        userId: user.id, 
        date: today, 
        endTime: null 
      }
    });

    if (activeTimer) {
      return NextResponse.json({ 
        isRunning: true, 
        startTime: activeTimer.startTime 
      });
    }

    return NextResponse.json({ isRunning: false });
  } catch (error) {
    console.error("Timer status API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}