import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "supersecret"
);

interface CurrentUser {
  id: number;
  email?: string;
}

export async function getCurrentUser(req: Request): Promise<CurrentUser | null> {
    try {
      const cookieHeader = req.headers.get("cookie");
      if (!cookieHeader) return null;
  
      const token = cookieHeader
        .split(";")
        .map(c => c.trim())
        .find(c => c.startsWith("token="))
        ?.split("=")[1];
  
      if (!token) return null;
  
      const { payload } = await jwtVerify(token, JWT_SECRET);
  
      // تأكد من أن userId هو رقم (كما هو متوقع في Prisma)
      const userId = typeof payload.userId === 'string' 
        ? parseInt(payload.userId, 10) 
        : payload.userId as number;
  
      return {
        id: userId,
        email: payload.email as string,
      };
    } catch (error) {
      console.error("JWT verification failed:", error);
      return null;
    }
  }