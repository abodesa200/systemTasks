import Navbar from "@/modules/Navbar";
import { Sidebar } from "@/modules/Sidebar";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    template: "%s | موقعي",
    default: "موقعي - الصفحة الرئيسية",
  },
  description: "وصف الموقع",
  keywords: ["كلمة مفتاحية 1", "كلمة مفتاحية 2"],
  authors: [{ name: "اسم المؤلف" }],
  creator: "اسم المنشئ",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://example.com",
    siteName: "اسم الموقع",
  },
};
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
}


// "use client";

// import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/modules/AppSidebar";
// import Navbar from "@/modules/Navbar";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <SidebarProvider>
//       {/* الـ Sidebar عاليسار */}
//       <AppSidebar />

//       {/* المساحة الباقية */}
//       <SidebarInset>
//         {/* الـ Navbar بيضل فوق */}
//         <Navbar />

//         {/* المحتوى قابل للسكرول */}
//         <main className="flex-1 overflow-y-auto p-6">{children}</main>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }
