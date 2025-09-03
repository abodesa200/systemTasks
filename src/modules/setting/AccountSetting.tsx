"use client";
import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { Download, Settings, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const AccountSeting = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordChange = () => {
    // هنا يمكن إضافة منطق لتغيير كلمة المرور
    alert("تم طلب تغيير كلمة المرور");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleExportData = () => {
    // منطق تصدير البيانات
    alert("سيتم تصدير بياناتك قريباً");
  };

  const handleDeleteAccount = () => {
    // منطق حذف الحساب
    if (
      confirm(
        "هل أنت متأكد من رغبتك في حذف حسابك؟ لا يمكن التراجع عن هذا الإجراء."
      )
    ) {
      alert("سيتم حذف حسابك قريباً");
    }
  };

  return (
    <Card className="shadow-lg border-0 max-w-3xl mx-auto">
      <CardHeader className="">
        <CardTitle className="text-2xl text-[#00857a] flex items-center">
          <Settings className="h-5 w-5 ml-1" />
          إعدادات الحساب
        </CardTitle>
        <CardDescription className="text-[#00857a]">
          إدارة إعدادات الحساب وكلمة المرور
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#00857a]">
            تغيير كلمة المرور
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 relative">
              <Label htmlFor="current-password" className="text-gray-700">
                كلمة المرور الحالية
              </Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-[#00c4b4]"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {showPasswords.current ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="new-password" className="text-gray-700">
                كلمة المرور الجديدة
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-[#00c4b4]"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 relative">
              <Label htmlFor="confirm-password" className="text-gray-700">
                تأكيد كلمة المرور الجديدة
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-[#00c4b4]"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPasswords.confirm ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handlePasswordChange}
                className="bg-[#00c4b4] hover:bg-[#00a693] text-white"
              >
                تغيير كلمة المرور
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-[#00c4b4]/20" />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#00857a]">تصدير البيانات</h3>
          <p className="text-sm text-gray-600">
            يمكنك طلب تصدير جميع بياناتك الشخصية المخزنة في حسابك.
          </p>
          <Button
            variant="outline"
            onClick={handleExportData}
            className="flex items-center border-[#00c4b4] text-[#00c4b4] hover:bg-[#00c4b4] hover:text-white"
          >
            <Download className="h-4 w-4 ml-1" />
            طلب تصدير البيانات
          </Button>
        </div>

        <Separator className="bg-[#00c4b4]/20" />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-red-600">منطقة الخطر</h3>
          <p className="text-sm text-gray-600">
            بمجرد حذف حسابك، لا يمكن استعادة المحتوى أو البيانات التي شاركتها
            على المنصة.
          </p>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            className="flex items-center"
          >
            <Trash2 className="h-4 w-4 ml-1" />
            حذف الحساب
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSeting;
