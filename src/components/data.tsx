import { CheckSquare, Clock, Eye, Pause } from "lucide-react";

export const mockTasks = [
  {
    id: "1",
    title: "تصميم واجهة المستخدم الرئيسية",
    description: "إنشاء تصميم حديث وسهل الاستخدام للواجهة الرئيسية للتطبيق",
    project: "تطبيق التجارة الإلكترونية",
    client: "شركة النور",
    dueDate: "2024-01-15",
    priority: "high",
    assignees: [
      { id: "1", name: "أحمد محمد", initials: "أم", avatar: "/placeholder.svg" },
      { id: "2", name: "فاطمة علي", initials: "فع", avatar: "/placeholder.svg" },
    ],
    tags: [
      { id: "1", name: "تصميم", color: "bg-[#00c4b4]/20 text-[#00a69c] border-[#00c4b4]/30" },
      { id: "2", name: "واجهة", color: "bg-purple-500/20 text-purple-700 border-purple-500/30" },
    ],
    progress: 75,
    comments: 5,
    attachments: 3,
    status: "progress",
    createdAt: "2024-01-01",
    estimatedHours: 40,
    spentHours: 30
  },
  {
    id: "2",
    title: "تطوير نظام الدفع",
    description: "تطوير نظام دفع آمن ومتكامل مع البوابات المختلفة",
    project: "تطبيق التجارة الإلكترونية",
    client: "شركة النور",
    dueDate: "2024-01-20",
    priority: "medium",
    assignees: [{ id: "3", name: "محمد حسن", initials: "مح", avatar: "/placeholder.svg" }],
    tags: [
      { id: "3", name: "تطوير", color: "bg-emerald-500/20 text-emerald-700 border-emerald-500/30" },
      { id: "4", name: "دفع", color: "bg-amber-500/20 text-amber-700 border-amber-500/30" },
    ],
    progress: 30,
    comments: 2,
    attachments: 1,
    status: "todo",
    createdAt: "2024-01-02",
    estimatedHours: 60,
    spentHours: 18
  },
  {
    id: "3",
    title: "مراجعة الكود النهائي",
    description: "مراجعة شاملة للكود والتأكد من جودته وأمانه",
    project: "موقع الشركة",
    client: "شركة التقنية",
    dueDate: "2024-01-10",
    priority: "low",
    assignees: [
      { id: "4", name: "سارة أحمد", initials: "سأ", avatar: "/placeholder.svg" },
      { id: "5", name: "علي محمود", initials: "عم", avatar: "/placeholder.svg" },
    ],
    tags: [{ id: "5", name: "مراجعة", color: "bg-rose-500/20 text-rose-700 border-rose-500/30" }],
    progress: 90,
    comments: 8,
    attachments: 0,
    status: "review",
    createdAt: "2023-12-28",
    estimatedHours: 20,
    spentHours: 18
  },
  {
    id: "4",
    title: "إصلاح الأخطاء في صفحة الدفع",
    description: "حل المشاكل التقنية في عملية الدفع وتحسين الأداء",
    project: "تطبيق التجارة الإلكترونية",
    client: "شركة النور",
    dueDate: "2024-01-18",
    priority: "high",
    assignees: [
      { id: "1", name: "أحمد محمد", initials: "أم", avatar: "/placeholder.svg" },
    ],
    tags: [
      { id: "3", name: "تطوير", color: "bg-emerald-500/20 text-emerald-700 border-emerald-500/30" },
      { id: "6", name: "أخطاء", color: "bg-orange-500/20 text-orange-700 border-orange-500/30" },
    ],
    progress: 20,
    comments: 3,
    attachments: 2,
    status: "progress",
    createdAt: "2024-01-05",
    estimatedHours: 25,
    spentHours: 5
  },
  {
    id: "5",
    title: "تحسين تجربة المستخدم للهاتف",
    description: "تحسين واجهة التطبيق للأجهزة المحمولة وتحسين الاستجابة",
    project: "تطبيق الجوال",
    client: "شركة التقنية",
    dueDate: "2024-01-25",
    priority: "medium",
    assignees: [
      { id: "2", name: "فاطمة علي", initials: "فع", avatar: "/placeholder.svg" },
    ],
    tags: [
      { id: "1", name: "تصميم", color: "bg-[#00c4b4]/20 text-[#00a69c] border-[#00c4b4]/30" },
      { id: "7", name: "تجربة", color: "bg-cyan-500/20 text-cyan-700 border-cyan-500/30" },
    ],
    progress: 40,
    comments: 4,
    attachments: 1,
    status: "todo",
    createdAt: "2024-01-03",
    estimatedHours: 35,
    spentHours: 14
  },
];

// حساب عدد المهام لكل حالة
const todoCount = mockTasks.filter(task => task.status === "todo").length;
const progressCount = mockTasks.filter(task => task.status === "progress").length;
const reviewCount = mockTasks.filter(task => task.status === "review").length;
const holdCount = mockTasks.filter(task => task.status === "hold").length;

export const summaryData = [
  {
    title: 'TO DO',
    count: 12,
    status: 'todo' as const,
    icon: CheckSquare,
    percentage: 75
  },
  {
    title: 'IN PROGRESS',
    count: 2,
    status: 'progress' as const,
    icon: Clock,
    percentage: 60
  },
  {
    title: 'IN REVIEW',
    count: 5,
    status: 'review' as const,
    icon: Eye,
    percentage: 90
  },
  {
    title: 'ON HOLD',
    count: 62,
    status: 'hold' as const,
    icon: Pause,
    percentage: 15
  }
];

export const initialColumns = [
  {
    id: "todo",
    title: "المهام المطلوبة",
    color: "border-l-4 border-l-zinc-400",
    tasks: mockTasks.filter((task) => task.status === "todo"),
  },
  {
    id: "progress",
    title: "قيد التنفيذ",
    color: "border-l-4 border-l-[#00c4b4]",
    tasks: mockTasks.filter((task) => task.status === "progress"),
  },
  {
    id: "review",
    title: "المراجعة",
    color: "border-l-4 border-l-amber-500",
    tasks: mockTasks.filter((task) => task.status === "review"),
  },
  {
    id: "hold",
    title: "متوقف مؤقتاً",
    color: "border-l-4 border-l-rose-500",
    tasks: mockTasks.filter((task) => task.status === "hold"),
  },
  {
    id: "completed",
    title: "مكتمل",
    color: "border-l-4 border-l-emerald-500",
    tasks: mockTasks.filter((task) => task.status === "completed"),
  },
];