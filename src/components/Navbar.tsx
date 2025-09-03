
import { Bell, Calendar, Clock, Settings } from "lucide-react";
import React from "react";

const Navbar: React.FC = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
    className={`border-b  dark:border-white/10 dark:bg-black/20  border-gray-200 bg-white  backdrop-blur-xl sticky top-0 z-20`}

    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Date and Time */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-[#a0aec0]">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#00c4b4] rounded-full animate-pulse"></div>
            <span className="text-sm text-white font-medium">
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Right Section - Actions and Profile */}
        <div className="flex items-center space-x-4">
          {/* Time Display */}
          <div className="flex items-center space-x-2 text-[#a0aec0]">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">
              {currentDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          </div>

          {/* Notifications */}
          <button
            className="
            relative p-2 rounded-lg hover:bg-[#2d3748] transition-colors
            group
          "
          >
            <Bell className="w-5 h-5 text-[#a0aec0] group-hover:text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff8c00] rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </button>

          {/* Settings */}
          <button
            className="
            p-2 rounded-lg hover:bg-[#2d3748] transition-colors
            group
          "
          >
            <Settings className="w-5 h-5 text-[#a0aec0] group-hover:text-white" />
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-[#4a5568]">
            <div className="text-right">
              <p className="text-white font-medium text-sm">Abdullah</p>
              <p className="text-[#a0aec0] text-xs">Project Manager</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-[#ff8c00] to-[#e67e00] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <span className="text-white font-semibold text-sm">AB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
