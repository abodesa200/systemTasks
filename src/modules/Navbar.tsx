"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useProfileStore } from "@/store/profileStore";
import { useTheme } from "@/utils/theme-provider";
import { Bell, Calendar, Clock, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import WorkTimer from "../components/shared/WorkTimer";

const Navbar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { theme, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useProfileStore();
  const router = useRouter();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "مهمة جديدة",
      description: "لقد تم تعيين مهمة جديدة لك",
      time: "منذ 10 دقائق",
      read: false,
    },
    {
      id: 2,
      title: "تذكير اجتماع",
      description: "اجتماع فريق التسويق بعد ساعة",
      time: "منذ 30 دقيقة",
      read: false,
    },
    {
      id: 3,
      title: "تقرير الأداء",
      description: "تقرير أداء الشهر جاهز للمراجعة",
      time: "منذ ساعتين",
      read: true,
    },
  ]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // حساب وقت العمل لليوم
  const calculateTodayWorkTime = () => {
    if (!user?.workTimes) return 0;

    const today = new Date().toDateString();
    return user.workTimes
      .filter((workTime) => new Date(workTime.date).toDateString() === today)
      .reduce((total, workTime) => total + (workTime.seconds || 0), 0);
  };

  // حساب وقت العمل لهذا الشهر
  const calculateMonthWorkTime = () => {
    if (!user?.workTimes) return 0;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return user.workTimes
      .filter((workTime) => {
        const workDate = new Date(workTime.date);
        return (
          workDate.getMonth() === currentMonth &&
          workDate.getFullYear() === currentYear
        );
      })
      .reduce((total, workTime) => total + (workTime.seconds || 0), 0);
  };

  const todayWorkTime = calculateTodayWorkTime();
  const monthWorkTime = calculateMonthWorkTime();

  const handleLogout = async () => {
    try {
      // Simulate logout API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("🚪 تم تسجيل الخروج بنجاح");
      router.push("/login");
    } catch (error) {
      toast.error("⚠️ خطأ في الاتصال");
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formattedDate = currentTime.toLocaleDateString("ar-SA", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <div
      className={`border-b 
     dark:border-white/10 dark:bg-black/30 border-gray-200 bg-white/95 backdrop-blur-xl sticky
      top-0 z-30 md:z-50 
     transition-all duration-300`}
    >
      <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Left Section - Logo and Date */}
        <div className="flex items-center space-x-2 md:space-x-4 min-w-0 ">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full animate-pulse"></div>
            <div className="block">
              <span className="text-xs sm:text-sm text-gray-700 dark:text-white font-medium truncate">
                {typeof window !== "undefined" && window.innerWidth < 640
                  ? currentTime.toLocaleDateString("ar-SA", {
                      month: "short",
                      day: "numeric",
                    })
                  : formattedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Middle Section - Work Time Statistics - Enhanced for mobile */}
        <div className="hidden sm:flex items-center justify-center flex-col  -translate-x-6 flex-1 gap-1 min-w-0 ">
          {/* Today's Work Time */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-[#a0aec0]" />
            <p className="text-xs text-gray-500 dark:text-[#a0aec0]">اليوم:</p>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-white font-mono">
              {formatTime(todayWorkTime)}
            </p>
          </div>

          {/* Monthly Work Time */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-[#a0aec0]" />
            <p className="text-xs text-gray-500 dark:text-[#a0aec0]">الشهر:</p>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-white font-mono">
              {formatTime(monthWorkTime)}
            </p>
          </div>
        </div>

        {/* Timer Component - Responsive visibility */}
        <div className="hidden lg:block w-40">
          <WorkTimer />
        </div>

        {/* Right Section - Actions and Profile */}
        <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-full dark:hover:bg-white/20 hover:bg-gray-200 transition-all duration-200 cursor-pointer group"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#a0aec0] transition-transform" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-black transition-transform" />
            )}
          </button>

          {/* Notifications Sheet - Enhanced for mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="relative p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 group"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-[#a0aec0] group-hover:text-gray-700 dark:group-hover:text-white" />
                {unreadCount > 0 && (
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-[8px] sm:text-[10px] text-white font-bold">
                      {unreadCount}
                    </span>
                  </div>
                )}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>الإشعارات</SheetTitle>
                <SheetDescription>
                  آخر التحديثات والأنشطة في نظامك
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4 px-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    لا توجد إشعارات حالياً
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        notification.read
                          ? "bg-gray-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700"
                          : "bg-[#00c4b4]/10 dark:bg-[#00c4b4]/10 border-[#00c4b4]/50 dark:border-[#00c4b4]/50"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">
                          {notification.title}
                        </h4>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {notification.description}
                      </p>
                      {!notification.read && (
                        <div className="mt-2 text-xs text-blue-500">
                          انقر لتحديد كمقروء
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* User Profile - Enhanced dropdown for mobile */}
          <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-1 sm:space-x-2 pl-1 sm:pl-2 border-l border-gray-200 dark:border-white/10 ml-1">
                <div className="text-right hidden md:block">
                  <p className="text-gray-800 dark:text-white font-medium text-sm truncate max-w-24">
                    {user?.name || "مستخدم"}
                  </p>
                  <p className="text-gray-500 dark:text-[#a0aec0] text-xs truncate max-w-24">
                    {user?.jobTitle || "لا يوجد وظيفة"}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300">
                    <span className="text-white font-semibold text-xs sm:text-sm">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </span>
                  </div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="text-right">
                الملف الشخصي
              </DropdownMenuItem>
              <DropdownMenuItem className="text-right">
                الإعدادات
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-right text-red-500 focus:text-red-500"
              >
                تسجيل الخروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile work time stats bar */}
      <div className="sm:hidden border-t border-gray-200 dark:border-white/10 px-3 py-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-gray-500 dark:text-[#a0aec0]" />
            <span className="text-gray-500 dark:text-[#a0aec0]">اليوم:</span>
            <span className="text-gray-700 dark:text-white font-mono">
              {formatTime(todayWorkTime)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-gray-500 dark:text-[#a0aec0]" />
            <span className="text-gray-500 dark:text-[#a0aec0]">الشهر:</span>
            <span className="text-gray-700 dark:text-white font-mono">
              {formatTime(monthWorkTime)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
