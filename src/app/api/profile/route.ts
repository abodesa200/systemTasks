import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
  
      const profile = await prisma.user.findUnique({
        where: { id: Number(user.id) }, 
        select: {
          id: true,
          name: true,
          email: true,
          jobTitle: true,
          image: true,
          role: true,
          workTimes: {
            orderBy: { date: "desc" },
            take: 1,
          },
        },
      });
  
      if (!profile) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json(profile);
    } catch (error) {
      console.error("Profile API error:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } 
