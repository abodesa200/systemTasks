"use client";
import { Palette, Monitor, Moon, Sun, Languages } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";

const AppearanceSetting = () => {
  const [appearance, setAppearance] = useState({
    theme: "light",
    language: "ar",
    fontSize: "medium",
  });

  const handleSaveChanges = () => {
    // هنا يمكن إضافة منطق لحفظ التغييرات
    alert("تم حفظ التغييرات بنجاح!");
  };

  return (
    <Card className="shadow-lg border-0 max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-[#00857a] flex items-center">
          <Palette className="h-5 w-5 ml-1" />
          المظهر واللغة
        </CardTitle>
        <CardDescription className="text-[#00857a]">
          تخصيص مظهر التطبيق واللغة
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#00857a]">المظهر</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="theme" className="text-gray-700">
                النمط
              </Label>
              <Select
                value={appearance.theme}
                onValueChange={(value) =>
                  setAppearance({ ...appearance, theme: value })
                }
              >
                <SelectTrigger id="theme" className="focus:ring-[#00c4b4]">
                  <SelectValue placeholder="اختر النمط" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4  text-amber-500" />
                      <p>فاتح</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="dark" className="flex items-center">
                    <Moon className="h-4 w-4 ml-2 text-indigo-400" />
                    داكن
                  </SelectItem>
                  <SelectItem value="system" className="flex items-center">
                    <Monitor className="h-4 w-4 ml-2 text-gray-500" />
                    نظام
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fontSize" className="text-gray-700">
                حجم الخط
              </Label>
              <Select
                value={appearance.fontSize}
                onValueChange={(value) =>
                  setAppearance({ ...appearance, fontSize: value })
                }
              >
                <SelectTrigger id="fontSize" className="focus:ring-[#00c4b4]">
                  <SelectValue placeholder="اختر حجم الخط" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">صغير</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="large">كبير</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator className="bg-[#00c4b4]/20" />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#00857a]">اللغة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="language" className="text-gray-700">
                لغة الواجهة
              </Label>
              <Select
                value={appearance.language}
                onValueChange={(value) =>
                  setAppearance({ ...appearance, language: value })
                }
              >
                <SelectTrigger id="language" className="focus:ring-[#00c4b4]">
                  <SelectValue placeholder="اختر اللغة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar" className="flex items-center">
                    <Languages className="h-4 w-4 ml-2 text-[#00c4b4]" />
                    العربية
                  </SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-[#00c4b4]/20">
          <Button
            onClick={handleSaveChanges}
            className="bg-[#00c4b4] hover:bg-[#00a693] text-white"
          >
            حفظ التغييرات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSetting;
