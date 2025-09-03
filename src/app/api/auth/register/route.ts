// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { prisma } from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const { name, email, password } = await req.json();

//     // فحص إذا الإيميل موجود
//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return NextResponse.json({ error: "Email already registered" }, { status: 400 });
//     }

//     // تشفير الباسورد
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // إنشاء المستخدم
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });

//     return NextResponse.json({ user }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { SignJWT } from "jose";
import { writeFile } from "fs/promises";
import path from "path";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "supersecret"
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const file = formData.get("image") as File | null;
    // فحص إذا الإيميل موجود
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // تشفير الباسورد
    const hashedPassword = await bcrypt.hash(password, 10);

    // تخزين الصورة محلياً (مثال)
    let imageUrl = null;
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name}`;
      const filepath = path.join(process.cwd(), "public/uploads", filename);

      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    // إنشاء المستخدم
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        jobTitle,
        image: imageUrl,
      },
    });

    // توليد JWT وتخزينه بالكوكي
    const token = await new SignJWT({
      userId: user.id,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(JWT_SECRET);

    const response = NextResponse.json({
      message: "Register successful",
      user: { id: user.id, email: user.email, name: user.name, jobTitle: user.jobTitle, image: user.image },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
