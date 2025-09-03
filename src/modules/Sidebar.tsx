// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { cn } from "@/lib/utils";
// import {
//   BarChart3,
//   Calendar,
//   ChevronLeft,
//   ChevronRight,
//   FileText,
//   Home,
//   Menu,
//   Settings,
//   Users,
// } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const sidebarItems = [
//   { icon: Home, label: "Tasks", href: "/tasks" },
//   { icon: BarChart3, label: "time sheets", href: "/time-sheets" },
//   { icon: Users, label: "projects", href: "/projects" },
//   { icon: FileText, label: "users", href: "/users" },
//   { icon: Calendar, label: "settings", href: "/settings" },
//   { icon: Settings, label: "categories", href: "/categories" },
//   { icon: Settings, label: "clients", href: "/clients" },
//   {
//     icon: Settings,
//     label: "financial transactions",
//     href: "/financial-transactions",
//   },
// ];

// interface SidebarProps {
//   className?: string;
// }

// export function Sidebar({ className }: SidebarProps) {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth < 768) {
//         setIsCollapsed(true);
//       }
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   if (isMobile) {
//     return (
//       <Sheet>
//         <SheetTrigger asChild>
//           <Button
//             variant="ghost"
//             size="sm"
//             className="fixed top-4 left-4 z-50 md:hidden h-8 w-8 p-0 bg-background/80 backdrop-blur-sm border"
//           >
//             <Menu className="h-4 w-4" />
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="left" className="w-64 p-0">
//           <SheetHeader className="p-4 border-b">
//             <SheetTitle className="text-left">Dashboard</SheetTitle>
//           </SheetHeader>
//           <nav className="flex-1 p-4 space-y-2">
//             {sidebarItems.map((item) => (
//               <Link key={item.href} href={item.href}>
//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
//                 >
//                   <item.icon className="h-4 w-4 mr-3" />
//                   <span className="capitalize">{item.label}</span>
//                 </Button>
//               </Link>
//             ))}
//           </nav>
//         </SheetContent>
//       </Sheet>
//     );
//   }

//   return (
//     <div
//       className={cn(
//         "relative hidden md:flex flex-col  bg-black/40 border-r border-sidebar-border transition-all duration-300 ease-in-out",
//         isCollapsed ? "w-16" : "w-64",
//         className
//       )}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b border-sidebar-border min-h-[64px]">
//         {!isCollapsed && (
//           <h2 className="text-lg font-semibold text-sidebar-foreground truncate">
//             Dashboard
//           </h2>
//         )}
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent shrink-0"
//         >
//           {isCollapsed ? (
//             <ChevronRight className="h-4 w-4" />
//           ) : (
//             <ChevronLeft className="h-4 w-4" />
//           )}
//         </Button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
//         {sidebarItems.map((item) => (
//           <Link key={item.href} href={item.href}>
//             <Button
//               variant="ghost"
//               className={cn(
//                 "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200",
//                 isCollapsed ? "px-2" : "px-3"
//               )}
//               title={isCollapsed ? item.label : undefined}
//             >
//               <item.icon
//                 className={cn("h-4 w-4 shrink-0", !isCollapsed && "mr-3")}
//               />
//               {!isCollapsed && (
//                 <span className="capitalize truncate">{item.label}</span>
//               )}
//             </Button>
//           </Link>
//         ))}
//       </nav>

//       {isCollapsed && (
//         <div className="p-2 border-t border-sidebar-border">
//           <div className="w-full h-8 flex items-center justify-center">
//             <div className="w-2 h-2 bg-sidebar-primary rounded-full animate-pulse"></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Banknote,
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  FolderKanban,
  Layers,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const sidebarItems = [
  { icon: ClipboardList, label: "Tasks", href: "/tasks" },
  { icon: Clock, label: "Time Sheets", href: "/time-sheets" },
  { icon: FolderKanban, label: "Projects", href: "/projects" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: Layers, label: "Categories", href: "/categories" },
  { icon: Building2, label: "Clients", href: "/clients" },
  {
    icon: Banknote,
    label: "Financial Transactions",
    href: "/financial-transactions",
  },
];
interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const NavItem = ({ item }: { item: (typeof sidebarItems)[0] }) => {
    const isActive = pathname === item.href;

    return (
      <Link key={item.href} href={item.href}>
        <Button
          variant={isActive ? "default" : "ghost"}
          className={cn(
            "w-full  hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all  duration-200",
            // isCollapsed ? "px-2" : "px-3",
            isCollapsed ? "justify-center" : "justify-start",
            isActive &&
              "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
          )}
          title={isCollapsed ? item.label : undefined}
        >
          <item.icon
            className={cn("h-4 w-4 shrink-0", !isCollapsed && "mr-3")}
          />
          {!isCollapsed && (
            <span className="capitalize truncate">{item.label}</span>
          )}
        </Button>
      </Link>
    );
  };

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="fixed top-4 left-4 z-50 md:hidden h-8 w-8 p-0 bg-background/80 backdrop-blur-sm border"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="text-left">Dashboard</SheetTitle>
          </SheetHeader>
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={cn(
        "relative hidden md:flex flex-col bg-black/40 border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border min-h-[64px]">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-sidebar-foreground truncate">
            BM Tasks
          </h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent shrink-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto ">
        {sidebarItems.map((item) => (
          <div key={item.href} className="space-y-2 ">
            <NavItem item={item} />
          </div>
        ))}
      </nav>
    </div>
  );
}
