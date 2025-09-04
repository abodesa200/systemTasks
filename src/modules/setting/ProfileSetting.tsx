import { Camera, Edit3, Save, User, X } from "lucide-react";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProfileSetting = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "أحمد السعدي",
    email: "ahmed@example.com",
    phone: "+966 55 123 4567",
    avatar: "/avatar.jpg",
    jobTitle: "مطور واجهات أمامية",
    bio: "أحب تطوير تطبيقات ويب مبتكرة وتجربة تقنيات جديدة.",
  });

  const [editedUser, setEditedUser] = useState(user);
  const fileInputRef = useRef(null);

  const handleSaveProfile = () => {
    setUser(editedUser);
    setIsEditing(false);
    // هنا يمكن إضافة منطق لحفظ البيانات إلى الخادم
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedUser({
          ...editedUser,
          avatar: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="shadow-lg border-0 max-w-4xl mx-auto">
      <CardHeader >
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl text-[#00857a] flex items-center">
              <User className="h-5 w-5 ml-1" />
              الملف الشخصي
            </CardTitle>
            <CardDescription className="text-[#00857a]">
              إدارة كيفية ظهور معلوماتك على المنصة
            </CardDescription>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center bg-[#00c4b4] hover:bg-[#00a693] text-white"
            >
              <Edit3 className="h-4 w-4 ml-1" />
              تعديل الملف الشخصي
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center">
            <div className="relative mb-4 group">
              <Avatar className="h-28 w-28 border-4 border-white shadow-lg transition-all duration-300 group-hover:opacity-90">
                <AvatarImage src={editedUser.avatar} alt={editedUser.name} />
                <AvatarFallback className="text-xl bg-gradient-to-r from-[#00c4b4] to-[#00a693] text-white">
                  {getInitials(editedUser.name)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-[#00c4b4] text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-[#00a693] transition-all duration-300"
                  >
                    <Camera className="h-4 w-4" />
                    <input
                      id="avatar-upload"
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                  {editedUser.avatar && editedUser.avatar !== user.avatar && (
                    <button
                      onClick={() => {
                        setEditedUser({ ...editedUser, avatar: user.avatar });
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full cursor-pointer shadow-md hover:bg-red-600 transition-all duration-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </>
              )}
            </div>
            {isEditing && (
              <Button
                variant="outline"
                className="mt-2 border-[#00c4b4] text-[#00c4b4] hover:bg-[#00c4b4] hover:text-white"
                onClick={() => fileInputRef.current?.click()}
              >
                تغيير الصورة
              </Button>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">
                  الاسم الكامل
                </Label>
                <Input
                  id="name"
                  value={isEditing ? editedUser.name : user.name}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      name: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="disabled:opacity-75 disabled:bg-gray-100 focus-visible:ring-[#00c4b4]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={isEditing ? editedUser.email : user.email}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      email: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="disabled:opacity-75 disabled:bg-gray-100 focus-visible:ring-[#00c4b4]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">
                  رقم الهاتف
                </Label>
                <Input
                  id="phone"
                  value={isEditing ? editedUser.phone : user.phone}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      phone: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="disabled:opacity-75 disabled:bg-gray-100 focus-visible:ring-[#00c4b4]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-gray-700">
                  المسمى الوظيفي
                </Label>
                <Input
                  id="jobTitle"
                  value={isEditing ? editedUser.jobTitle : user.jobTitle}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      jobTitle: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="disabled:opacity-75 disabled:bg-gray-100 focus-visible:ring-[#00c4b4]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-700">
                نبذة عنك
              </Label>
              <textarea
                id="bio"
                rows={3}
                value={isEditing ? editedUser.bio : user.bio}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    bio: e.target.value,
                  })
                }
                disabled={!isEditing}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c4b4] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100"
              />
            </div>

            {isEditing && (
              <div className="flex justify-end gap-2 pt-4 border-t border-[#00c4b4]/20 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedUser(user);
                  }}
                  className="border-gray-300 hover:bg-gray-100"
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleSaveProfile}
                  className="bg-[#00c4b4] hover:bg-[#00a693] text-white flex items-center"
                >
                  <Save className="h-4 w-4 ml-1" />
                  حفظ التغييرات
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSetting;
