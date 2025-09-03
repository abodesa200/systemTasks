"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// تعريف مخطط التحقق من صحة البيانات
const formSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // تهيئة النموذج
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ تسجيل الدخول نجح", {
          description: "جاري توجيهك إلى صفحة المهام",
        });
        // إعادة التوجيه بعد تسجيل الدخول الناجح
        setTimeout(() => {
          router.push("/tasks");
        }, 1500);
      } else {
        toast.error("❌ خطأ في التسجيل", {
          description: data.error || "حدث خطأ أثناء تسجيل الدخول",
        });
      }
    } catch (error) {
      toast.error("❌ خطأ في الاتصال", {
        description: "تعذر الاتصال بالخادم",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="relative group w-full max-w-md">
        <Card className="relative bg-zinc-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-zinc-700/50 overflow-hidden w-full">
          {/* Card Header Gradient */}
          <div className="h-2 bg-gradient-to-r absolute w-full top-1 from-cyan-500 via-emerald-500 to-teal-500"></div>

          <CardHeader className="">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl transform hover:scale-110 transition-transform duration-300">
                <LogIn className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-white">
                تسجيل الدخول
              </CardTitle>
              <CardDescription className="text-zinc-400">
                مرحباً بعودتك! يرجى إدخال بياناتك
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">
                        البريد الإلكتروني
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@domain.com"
                          type="email"
                          className="bg-zinc-700/50 border border-zinc-600/50 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all duration-300 text-white placeholder-zinc-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>كلمة المرور</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="أدخل كلمة المرور"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-cyan-600 hover:via-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden h-12 mt-4"
                >
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white ml-3"></div>
                      جاري المعالجة...
                    </div>
                  ) : (
                    <>
                      <LogIn className="ml-3 h-5 w-5" />
                      تسجيل الدخول
                    </>
                  )}
                </Button>
              </form>
            </Form>

            {/* Sign Up Link */}
            <div className="mt-4 text-center">
              <p className="text-zinc-400">
                ليس لديك حساب؟{" "}
                <Link
                  href="/register"
                  className="font-semibold text-cyan-400 hover:text-cyan-300 p-0 h-auto"
                >
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
