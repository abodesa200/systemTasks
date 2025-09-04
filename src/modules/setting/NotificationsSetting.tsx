"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const NotificationsSetting = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    newsletter: false,
  });

  return (
    <Card className="shadow-lg border-0 overflow-hidden">
      <CardHeader >
        <CardTitle className="text-2xl text-teal-800 flex items-center">
          <Bell className="h-5 w-5 ml-1" />
          الإشعارات
        </CardTitle>
        <CardDescription>إدارة كيفية تلقيك للإشعارات</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-teal-700">
            تفضيلات الإشعارات
          </h3>

          <div className="flex items-center justify-between p-4 rounded-lg border transition-colors">
            <div className="space-y-0.5">
              <Label
                htmlFor="email-notifications"
                className="text-base text-teal-800"
              >
                البريد الإلكتروني
              </Label>
              <p className="text-sm text-teal-600">
                استلام الإشعارات عبر البريد الإلكتروني
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={notifications.email}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, email: checked })
              }
              className="data-[state=checked]:bg-teal-600"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border  transition-colors">
            <div className="space-y-0.5">
              <Label
                htmlFor="push-notifications"
                className="text-base text-teal-800"
              >
                الإشعارات الدفعية
              </Label>
              <p className="text-sm text-teal-600">
                استلام الإشعارات على جهازك
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={notifications.push}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, push: checked })
              }
              className="data-[state=checked]:bg-teal-600"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border transition-colors">
            <div className="space-y-0.5">
              <Label
                htmlFor="sms-notifications"
                className="text-base text-teal-800"
              >
                رسائل SMS
              </Label>
              <p className="text-sm text-teal-600">
                استلام الإشعارات عبر الرسائل النصية
              </p>
            </div>
            <Switch
              id="sms-notifications"
              checked={notifications.sms}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, sms: checked })
              }
              className="data-[state=checked]:bg-teal-600"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border transition-colors">
            <div className="space-y-0.5">
              <Label
                htmlFor="newsletter-notifications"
                className="text-base text-teal-800"
              >
                النشرة الإخبارية
              </Label>
              <p className="text-sm text-teal-600">
                استلام آخر التحديثات والعروض
              </p>
            </div>
            <Switch
              id="newsletter-notifications"
              checked={notifications.newsletter}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, newsletter: checked })
              }
              className="data-[state=checked]:bg-teal-600"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2">
            <Save className="h-4 w-4" />
            حفظ التغييرات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsSetting;
