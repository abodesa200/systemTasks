import { Bell, CreditCard, Palette, Settings, User } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";

interface SideSettingProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SideSetting = ({ activeTab, setActiveTab }: SideSettingProps) => {
  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-4 shadow-lg border-0 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex flex-col gap-2">
            <button
              className={`flex items-center justify-start p-3 rounded-md transition-all duration-300 ${
                activeTab === "profile"
                  ? "bg-teal-100 text-teal-700 border-r-4 border-teal-600 shadow-sm"
                  : "hover:bg-teal-50 text-gray-600 hover:text-teal-700"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <User className="h-5 w-5 ml-2" />
              الملف الشخصي
            </button>

            <button
              className={`flex items-center justify-start p-3 rounded-md transition-all duration-300 ${
                activeTab === "account"
                  ? "bg-teal-100 text-teal-700 border-r-4 border-teal-600 shadow-sm"
                  : "hover:bg-teal-50 text-gray-600 hover:text-teal-700"
              }`}
              onClick={() => setActiveTab("account")}
            >
              <Settings className="h-5 w-5 ml-2" />
              إعدادات الحساب
            </button>

            <button
              className={`flex items-center justify-start p-3 rounded-md transition-all duration-300 ${
                activeTab === "appearance"
                  ? "bg-teal-100 text-teal-700 border-r-4 border-teal-600 shadow-sm"
                  : "hover:bg-teal-50 text-gray-600 hover:text-teal-700"
              }`}
              onClick={() => setActiveTab("appearance")}
            >
              <Palette className="h-5 w-5 ml-2" />
              المظهر واللغة
            </button>

            <button
              className={`flex items-center justify-start p-3 rounded-md transition-all duration-300 ${
                activeTab === "notifications"
                  ? "bg-teal-100 text-teal-700 border-r-4 border-teal-600 shadow-sm"
                  : "hover:bg-teal-50 text-gray-600 hover:text-teal-700"
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="h-5 w-5 ml-2" />
              الإشعارات
            </button>

            <button
              className={`flex items-center justify-start p-3 rounded-md transition-all duration-300 ${
                activeTab === "billing"
                  ? "bg-teal-100 text-teal-700 border-r-4 border-teal-600 shadow-sm"
                  : "hover:bg-teal-50 text-gray-600 hover:text-teal-700"
              }`}
              onClick={() => setActiveTab("billing")}
            >
              <CreditCard className="h-5 w-5 ml-2" />
              الفواتير
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SideSetting;
