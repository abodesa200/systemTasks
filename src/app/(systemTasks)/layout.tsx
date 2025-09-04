import Navbar from "@/components/shared/Navbar";
import { Sidebar } from "@/components/shared/Sidebar";
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
