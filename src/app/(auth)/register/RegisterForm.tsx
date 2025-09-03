// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Eye, EyeOff, UserPlus } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import * as z from "zod";

// // تعريف مخطط التحقق من صحة البيانات
// const formSchema = z.object({
//   email: z.string().email("البريد الإلكتروني غير صحيح"),
//   name: z.string().min(2, "اسم المستخدم يجب أن يكون على الأقل حرفين"),
//   password: z.string().min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),
// });

// const RegisterForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   // تهيئة النموذج
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       name: "",
//       password: "",
//     },
//   });

//   const handleSubmit = async (values: z.infer<typeof formSchema>) => {
//     setIsLoading(true);

//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success("✅ تم إنشاء الحساب بنجاح", {
//           description: "جاري توجيهك إلى صفحة تسجيل الدخول",
//         });
//         // إعادة التوجيه بعد التسجيل الناجح
//         setTimeout(() => {
//           router.push("/tasks");
//         }, 1500);
//       } else {
//         toast.error("❌ خطأ في التسجيل", {
//           description: data.error || "حدث خطأ أثناء إنشاء الحساب",
//         });
//       }
//     } catch (error) {
//       toast.error("❌ خطأ في الاتصال", {
//         description: "تعذر الاتصال بالخادم",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex-1 flex items-center justify-center p-4">
//       <div className="relative group w-full max-w-md">
//         <Card className="relative bg-zinc-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-zinc-700/50 overflow-hidden w-full">
//           {/* Card Header Gradient */}
//           <div className="h-2 bg-gradient-to-r absolute w-full top-1 from-cyan-500 via-emerald-500 to-teal-500"></div>

//           <CardHeader className="pt-8">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl transform hover:scale-110 transition-transform duration-300">
//                 <UserPlus className="h-8 w-8 text-white" />
//               </div>
//               <CardTitle className="text-3xl font-bold text-white">
//                 إنشاء حساب جديد
//               </CardTitle>
//               <CardDescription className="text-zinc-400 mt-2">
//                 انضم إلينا وابدأ في تنظيم مهامك
//               </CardDescription>
//             </div>
//           </CardHeader>

//           <CardContent className="pb-1">
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(handleSubmit)}
//                 className="space-y-4"
//               >
//                 {/* User Name Field */}
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-zinc-300">
//                         اسم المستخدم
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="ادخل اسم المستخدم"
//                           type="text"
//                           className="bg-zinc-700/50 border border-zinc-600/50 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all duration-300 text-white placeholder-zinc-400"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Email Field */}
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-zinc-300">
//                         البريد الإلكتروني
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="example@domain.com"
//                           type="email"
//                           className="bg-zinc-700/50 border border-zinc-600/50 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all duration-300 text-white placeholder-zinc-400"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Password Field */}
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-zinc-300">كلمة المرور</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Input
//                             type={showPassword ? "text" : "password"}
//                             placeholder="أدخل كلمة المرور"
//                             className="bg-zinc-700/50 border border-zinc-600/50 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all duration-300 text-white placeholder-zinc-400 pr-10"
//                             {...field}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword((prev) => !prev)}
//                             className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-300"
//                           >
//                             {showPassword ? (
//                               <EyeOff size={18} />
//                             ) : (
//                               <Eye size={18} />
//                             )}
//                           </button>
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Submit Button */}
//                 <Button
//                   type="submit"
//                   disabled={isLoading}
//                   className="group relative w-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-cyan-600 hover:via-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden h-12 mt-6"
//                 >
//                   {/* Button Shine Effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

//                   {isLoading ? (
//                     <div className="flex items-center">
//                       <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white ml-3"></div>
//                       جاري إنشاء الحساب...
//                     </div>
//                   ) : (
//                     <>
//                       <UserPlus className="ml-3 h-5 w-5" />
//                       إنشاء حساب
//                     </>
//                   )}
//                 </Button>
//               </form>
//             </Form>

//             {/* Login Link */}
//             <div className="mt-5 text-center">
//               <p className="text-zinc-400">
//                 لديك حساب بالفعل؟{" "}
//                 <Button
//                   variant="link"
//                   className="font-semibold text-cyan-400 hover:text-cyan-300 p-0 h-auto"
//                   onClick={() => router.push("/login")}
//                 >
//                   تسجيل الدخول
//                 </Button>
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;
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
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// تعريف مخطط التحقق من صحة البيانات
const formSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  name: z.string().min(2, "اسم المستخدم يجب أن يكون على الأقل حرفين"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),
  jobTitle: z.string().min(2, "المسمى الوظيفي يجب أن يكون على الأقل حرفين"),
  //   image: z.instanceof(File).optional(),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // تهيئة النموذج
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      jobTitle: "",
      //   image: undefined,
    },
  });

  //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (file) {
  //       form.setValue("image", file);

  //       // إنشاء معاينة للصورة
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         setPreviewImage(reader.result as string);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   const removeImage = () => {
  //     form.setValue("image", undefined);
  //     setPreviewImage(null);
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = "";
  //     }
  //   };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("jobTitle", values.jobTitle);

      //   if (values.image) {
      //     formData.append("image", values.image);
      //   }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ تم إنشاء الحساب بنجاح", {
          description: "جاري توجيهك إلى صفحة المهام",
        });
        // إعادة التوجيه بعد التسجيل الناجح
        setTimeout(() => {
          router.push("/tasks");
        }, 1500);
      } else {
        toast.error("❌ خطأ في التسجيل", {
          description: data.error || "حدث خطأ أثناء إنشاء الحساب",
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
    <div className="flex-1 flex items-center justify-center -mt-2 ">
      <div className="relative group w-full max-w-md">
        <Card
          className="relative bg-zinc-800/95
         backdrop-blur-xl rounded-3xl shadow-2xl border border-zinc-700/50 overflow-hidden w-full"
        >
          {/* Card Header Gradient */}
          <div className="h-2 bg-gradient-to-r absolute w-full top-0 from-cyan-500 via-emerald-500 to-teal-500"></div>

          <CardHeader className="pt-1">
            <div className="text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl transform hover:scale-110 transition-transform duration-300">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-white">
                إنشاء حساب جديد
              </CardTitle>
              <CardDescription className="text-zinc-400 mt-2">
                انضم إلينا وابدأ في تنظيم مهامك
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="-mt-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-3"
                encType="multipart/form-data"
              >
                {/* User Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">
                        اسم المستخدم
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ادخل اسم المستخدم"
                          type="text"
                          className="bg-zinc-700/50 border border-zinc-600/50 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all duration-300 text-white placeholder-zinc-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                {/* Job Title Field */}
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">
                        المسمى الوظيفي
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ادخل المسمى الوظيفي"
                          type="text"
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
                      <FormLabel className="text-zinc-300">
                        كلمة المرور
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="أدخل كلمة المرور"
                            className="bg-zinc-700/50 border border-zinc-600/50 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all duration-300 text-white placeholder-zinc-400 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-300"
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

                {/* Image Upload Field */}
                {/* <FormItem>
                    <FormLabel className="text-zinc-300">صورة الملف الشخصي</FormLabel>
                    <div className="flex flex-col items-center space-y-4">
                        {previewImage ? (
                        <div className="relative">
                            <img
                            src={previewImage}
                            alt="Preview"
                            className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500/50"
                            />
                            <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                            <X size={16} className="text-white" />
                            </button>
                        </div>
                        ) : (
                        <label
                            htmlFor="image"
                            className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-cyan-500/50 rounded-full cursor-pointer hover:border-cyan-500 transition-colors"
                        >
                            <Upload size={24} className="text-cyan-400 mb-1" />
                            <span className="text-xs text-cyan-400">رفع صورة</span>
                        </label>
                        )}
                        <FormControl>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />
                        </FormControl>
                    </div>
                    <FormMessage />
                    </FormItem> */}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-cyan-600 hover:via-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden h-12 mt-6"
                >
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white ml-3"></div>
                      جاري إنشاء الحساب...
                    </div>
                  ) : (
                    <>
                      <UserPlus className="ml-3 h-5 w-5" />
                      إنشاء حساب
                    </>
                  )}
                </Button>
              </form>
            </Form>

            {/* Login Link */}
            <div className="mt-5 text-center">
              <p className="text-zinc-400">
                لديك حساب بالفعل؟{" "}
                <Button
                  variant="link"
                  className="font-semibold text-cyan-400 hover:text-cyan-300 p-0 h-auto"
                  onClick={() => router.push("/login")}
                >
                  تسجيل الدخول
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
