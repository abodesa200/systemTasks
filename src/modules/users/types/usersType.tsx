// modules/clients/types/client.ts

// ----------- Base Interface -----------
export interface BaseUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
}

// ----------- Client Interface -----------
export interface Client extends BaseUser {
  company: string;
  type: "individual" | "corporate" | "government";
  industry: string;
  address: string;
  creditLimit?: number;
  totalSpent?: number;
  lastPurchase?: string;
}

// ----------- User Interface -----------
export interface User extends BaseUser {
  role: "admin" | "manager" | "developer" | "designer" | "viewer";
  department: string;
  location: string;
  lastActive?: string;
}

// ----------- Unified Type -----------
export type UserType = Client | User;

// ----------- Zod Schemas -----------
import * as z from "zod";

export const clientFormSchema = z.object({
  name: z.string().min(2, {
    message: "يجب أن يكون الاسم أكثر من حرفين.",
  }),
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صحيح.",
  }),
  phone: z.string().min(10, {
    message: "يجب أن يكون رقم الهاتف مكون من 10 أرقام على الأقل.",
  }),
  company: z.string().min(2, {
    message: "يجب أن يكون اسم الشركة أكثر من حرفين.",
  }),
  status: z.enum(["active", "inactive", "pending"]),
  type: z.enum(["individual", "corporate", "government"]),
  industry: z.string().optional(),
  address: z.string().optional(),
  joinDate: z.string().optional(),
  creditLimit: z.number().optional(),
});

export const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "يجب أن يكون الاسم أكثر من حرفين.",
  }),
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صحيح.",
  }),
  phone: z.string().min(10, {
    message: "يجب أن يكون رقم الهاتف مكون من 10 أرقام على الأقل.",
  }),
  role: z.enum(["admin", "manager", "developer", "designer", "viewer"]),
  status: z.enum(["active", "inactive", "pending"]),
  department: z.string(),
  location: z.string(),
  joinDate: z.string().optional(),
});

// ----------- Form Types -----------
export type ClientFormValues = z.infer<typeof clientFormSchema>;
export type UserFormValues = z.infer<typeof userFormSchema>;

// Union إذا بدك تستخدم تايب موحد للفورمات
export type FormValues = ClientFormValues | UserFormValues;
