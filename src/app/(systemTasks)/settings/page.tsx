"use client";

import AccountSeting from "@/modules/setting/AccountSetting";
import AppearanceSetting from "@/modules/setting/AppearanceSetting";
import BillingSetting from "@/modules/setting/BillingSetting";
import NotificationsSetting from "@/modules/setting/NotificationsSetting";
import ProfileSetting from "@/modules/setting/ProfileSetting";
import SideSetting from "@/modules/setting/SideSetting";
import { Settings } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gradient-to-br  px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Settings className="h-8 w-8 text-indigo-600 ml-2" />
          <h1 className="text-3xl font-bold text-gray-900">الإعدادات</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* القائمة الجانبية */}
          <SideSetting activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* المحتوى الرئيسي */}
          <div className="lg:col-span-3">
            {/* الملف الشخصي */}
            {activeTab === "profile" && <ProfileSetting />}

            {/* إعدادات الحساب */}
            {activeTab === "account" && <AccountSeting />}

            {/* المظهر واللغة */}
            {activeTab === "appearance" && <AppearanceSetting />}

            {/* الإشعارات */}
            {activeTab === "notifications" && <NotificationsSetting />}

            {/* الفواتير */}
            {activeTab === "billing" && <BillingSetting />}
          </div>
        </div>
      </div>
    </div>
  );
}
