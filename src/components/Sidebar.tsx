"use client";
import {
  Calendar,
  FileText,
  Folder,
  Home,
  Mail,
  Menu,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavItem {
  name: string;
  icon: React.ComponentType<any>;
  active?: boolean;
  badge?: number;
  link?: string;
}

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("home");

  const navItems: NavItem[] = [
    { name: "home", icon: Home, link: "/" },
    { name: "Users", icon: Users, link: "users" },
    { name: "Projects", icon: Folder, link: "users" },
    { name: "Calendar", icon: Calendar, link: "/users" },
    { name: "Messages", icon: Mail, badge: 3, link: "/users" },
    { name: "Reports", icon: FileText, link: "/users" },
  ];





  
  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      if (sidebarOpen) {
        mainContent.classList.add("ml-64");
        mainContent.classList.remove("ml-20");
      } else {
        mainContent.classList.add("ml-20");
        mainContent.classList.remove("ml-64");
      }
    }
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {!sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      <div
        className={`${
          sidebarOpen
            ? "w-64 translate-x-0"
            : "w-20 -translate-x-full md:translate-x-0"
        }  
          dark:bg-black/40 bg-white dark:border-white/10 border-gray-200 backdrop-blur-xl border-r 
          transition-all duration-300 fixed h-screen z-30`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            {sidebarOpen ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  AdminPanel
                </h1>
              </div>
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-5 h-5 text-white" />
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-lg dark:hover:bg-white/10 hover:bg-gray-100 transition-all"
            >
              {sidebarOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 mt-4">
            {navItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <Link
                  key={item.name}
                  href={`/${item.link.toLowerCase()}`}
                  onClick={() => setActiveItem(item.name)}
                  className={`flex items-center rounded-lg px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[#00c4b4] to-[#00a69c]"
                      : "dark:hover:bg-white/10 dark:text-gray-300 hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {sidebarOpen && (
                    <>
                      <span className="ml-3 capitalize">{item.name}</span>
                      {item.badge && (
                        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t dark:border-white/10 border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">AM</span>
              </div>
              {sidebarOpen && (
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium dark:text-white text-gray-900">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-400">admin@example.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


