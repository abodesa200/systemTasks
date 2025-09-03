import { Column, Task } from "./tasks/types";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design main user interface",
    description:
      "Create a modern and user-friendly design for the main app interface",
    project: "E-commerce App",
    client: "Al-Noor Company",
    dueDate: "2024-01-15",
    priority: "high",
    assignees: [
      {
        id: "1",
        name: "Ahmed Mohamed",
        initials: "AM",
        avatar: "/file.svg",
      },
      {
        id: "2",
        name: "Fatima Ali",
        initials: "FA",
        avatar: "/file.svg",
      },
    ],
    tags: [
      {
        id: "1",
        name: "Design",
        color: "bg-[#00c4b4]/20 text-[#00a69c] border-[#00c4b4]/30",
      },
      {
        id: "2",
        name: "UI",
        color: "bg-purple-500/20 text-purple-700 border-purple-500/30",
      },
    ],
    progress: 75,
    comments: 5,
    attachments: 3,
    status: "progress",
    createdAt: "2024-01-01",
    estimatedHours: 40,
    spentHours: 30,
  },
  {
    id: "2",
    title: "Develop payment system",
    description:
      "Build a secure and fully integrated payment system with multiple gateways",
    project: "E-commerce App",
    client: "Al-Noor Company",
    dueDate: "2024-01-20",
    priority: "medium",
    assignees: [
      {
        id: "3",
        name: "Mohamed Hassan",
        initials: "MH",
        avatar: "/file.svg",
      },
    ],
    tags: [
      {
        id: "3",
        name: "Development",
        color: "bg-emerald-500/20 text-emerald-700 border-emerald-500/30",
      },
      {
        id: "4",
        name: "Payment",
        color: "bg-amber-500/20 text-amber-700 border-amber-500/30",
      },
    ],
    progress: 30,
    comments: 2,
    attachments: 1,
    status: "todo",
    createdAt: "2024-01-02",
    estimatedHours: 60,
    spentHours: 18,
  },
  {
    id: "3",
    title: "Final code review",
    description:
      "Perform a thorough review of the code to ensure quality and security",
    project: "Company Website",
    client: "Tech Company",
    dueDate: "2024-01-10",
    priority: "low",
    assignees: [
      {
        id: "4",
        name: "Sarah Ahmed",
        initials: "SA",
        avatar: "/file.svg",
      },
      {
        id: "5",
        name: "Ali Mahmoud",
        initials: "AM",
        avatar: "/file.svg",
      },
    ],
    tags: [
      {
        id: "5",
        name: "Review",
        color: "bg-rose-500/20 text-rose-700 border-rose-500/30",
      },
    ],
    progress: 90,
    comments: 8,
    attachments: 0,
    status: "review",
    createdAt: "2023-12-28",
    estimatedHours: 20,
    spentHours: 18,
  },
  {
    id: "4",
    title: "Fix bugs in payment page",
    description:
      "Resolve technical issues in the payment process and improve performance",
    project: "E-commerce App",
    client: "Al-Noor Company",
    dueDate: "2024-01-18",
    priority: "high",
    assignees: [
      {
        id: "1",
        name: "Ahmed Mohamed",
        initials: "AM",
        avatar: "/file.svg",
      },
    ],
    tags: [
      {
        id: "3",
        name: "Development",
        color: "bg-emerald-500/20 text-emerald-700 border-emerald-500/30",
      },
      {
        id: "6",
        name: "Bugs",
        color: "bg-orange-500/20 text-orange-700 border-orange-500/30",
      },
    ],
    progress: 20,
    comments: 3,
    attachments: 2,
    status: "progress",
    createdAt: "2024-01-05",
    estimatedHours: 25,
    spentHours: 5,
  },
  {
    id: "5",
    title: "Improve mobile user experience",
    description:
      "Enhance the app’s interface for mobile devices and improve responsiveness",
    project: "Mobile App",
    client: "Tech Company",
    dueDate: "2024-01-25",
    priority: "medium",
    assignees: [
      {
        id: "2",
        name: "Fatima Ali",
        initials: "FA",
        avatar: "/file.svg",
      },
    ],
    tags: [
      {
        id: "1",
        name: "Design",
        color: "bg-[#00c4b4]/20 text-[#00a69c] border-[#00c4b4]/30",
      },
      {
        id: "7",
        name: "UX",
        color: "bg-cyan-500/20 text-cyan-700 border-cyan-500/30",
      },
    ],
    progress: 40,
    comments: 4,
    attachments: 1,
    status: "todo",
    createdAt: "2024-01-03",
    estimatedHours: 35,
    spentHours: 14,
  },
];

export const summaryData = [
  {
    count: 12,
    status: "todo" as const,
  },
  {
    count: 2,
    status: "progress" as const,
  },
  {
    count: 5,
    status: "review" as const,
  },
  {
    count: 62,
    status: "hold" as const,
  },
];

export const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "border-l-4 border-l-zinc-400",
    tasks: mockTasks.filter((task) => task.status === "todo"),
  },
  {
    id: "progress",
    title: "In Progress",
    color: "border-l-4 border-l-[#00c4b4]",
    tasks: mockTasks.filter((task) => task.status === "progress"),
  },
  {
    id: "review",
    title: "In Review",
    color: "border-l-4 border-l-amber-500",
    tasks: mockTasks.filter((task) => task.status === "review"),
  },
  {
    id: "hold",
    title: "On Hold",
    color: "border-l-4 border-l-rose-500",
    tasks: mockTasks.filter((task) => task.status === "hold"),
  },
  {
    id: "completed",
    title: "Completed",
    color: "border-l-4 border-l-emerald-500",
    tasks: mockTasks.filter((task) => task.status === "completed"),
  },
];

  export const mockComments = [
    {
      id: 1,
      author: "أحمد محمد",
      avatar: "",
      initials: "أح",
      content:
        "تم البدء في العمل على هذه المهمة. سأحتاج لمراجعة بعض التفاصيل مع العميل.",
      timestamp: "2024-03-15T10:30:00Z",
      edited: false,
      reactions: [{ emoji: "👍", count: 2, users: ["سارة أحمد", "محمد علي"] }],
    },
    {
      id: 2,
      author: "سارة أحمد",
      avatar: "",
      initials: "سأ",
      content:
        "ممتاز! لقد أرسلت لك الملفات المطلوبة عبر البريد الإلكتروني. يرجى المراجعة وإعلامي بأي استفسارات.",
      timestamp: "2024-03-15T14:45:00Z",
      edited: true,
      reactions: [{ emoji: "❤️", count: 1, users: ["أحمد محمد"] }],
    },
  ];

  export const mockAttachments = [
    {
      id: 1,
      name: "requirements-document.pdf",
      size: "2.4 MB",
      type: "application/pdf",
      uploadedBy: "أحمد محمد",
      uploadedAt: "2024-03-15T09:00:00Z",
      preview: true,
    },
    {
      id: 2,
      name: "design-mockups.figma",
      size: "15.7 MB",
      type: "application/figma",
      uploadedBy: "سارة أحمد",
      uploadedAt: "2024-03-15T11:30:00Z",
      preview: false,
    },
    {
      id: 3,
      name: "project-timeline.xlsx",
      size: "856 KB",
      type: "application/excel",
      uploadedBy: "محمد علي",
      uploadedAt: "2024-03-15T13:15:00Z",
      preview: true,
    },
  ];

  export const mockTimeEntries = [
    {
      id: "1",
      date: "2024-03-15",
      hours: 3.5,
      description: "تحليل المتطلبات والتخطيط الأولي",
      user: "أحمد محمد",
    },
    {
      id: "2",
      date: "2024-03-16",
      hours: 4,
      description: "تطوير النماذج الأولية",
      user: "سارة أحمد",
    },
    {
      id: "3",
      date: "2024-03-17",
      hours: 2.5,
      description: "مراجعة التصميم مع العميل",
      user: "أحمد محمد",
    },
  ];

  export const mockSubtasks = [
    {
      id: "1",
      title: "تحليل المتطلبات",
      completed: true,
      assignee: "أحمد محمد",
    },
    {
      id: "2",
      title: "إنشاء النماذج الأولية",
      completed: true,
      assignee: "سارة أحمد",
    },
    {
      id: "3",
      title: "تطوير واجهة المستخدم",
      completed: false,
      assignee: "محمد علي",
    },
    {
      id: "4",
      title: "اختبار الوظائف",
      completed: false,
      assignee: "فاطمة حسن",
    },
    {
      id: "5",
      title: "مراجعة نهائية",
      completed: false,
      assignee: "أحمد محمد",
    },
  ];