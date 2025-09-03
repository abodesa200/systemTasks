
import { TimeTrackingBoard } from "@/modules/timesheets/features/timeTrackingBoard/TimeTrackingBoard";
import { TimeEntry } from "@/modules/timesheets/types/timeEntry";

const mockTimeEntries: TimeEntry[] = [
  {
    id: "1",
    user: { id: "1", name: "Abdullatif", avatar: "" },
    task: "munaseb",
    project: "Munasb",
    startTime: "00:24:54",
    endTime: "00:26:59",
    date: "08-28-2025",
    type: "Timer Tracked",
    invoiced: false,
    totalHours: 0.03,
    status: "completed",
  },
  {
    id: "2",
    user: { id: "1", name: "Abdullatif", avatar: "" },
    task: "training nextjs",
    project: "Front end Training",
    startTime: "Added Manually",
    endTime: "Added Manually",
    date: "08-27-2025",
    type: "Added Manually",
    invoiced: false,
    totalHours: 1.5,
    status: "completed",
  },
  {
    id: "3",
    user: { id: "1", name: "Abdullatif", avatar: "" },
    task: "company website",
    project: "Company Website",
    startTime: "20:46:43",
    endTime: "20:46:56",
    date: "08-27-2025",
    type: "Timer Tracked",
    invoiced: false,
    totalHours: 0.004,
    status: "completed",
  },
  {
    id: "4",
    user: { id: "1", name: "Abdullatif", avatar: "" },
    task: "training nextjs",
    project: "Front end Training",
    startTime: "11:54:59",
    endTime: "18:32:50",
    date: "08-27-2025",
    type: "Timer Tracked",
    invoiced: false,
    totalHours: 6.63,
    status: "completed",
  },
  {
    id: "5",
    user: { id: "1", name: "Abdullatif", avatar: "" },
    task: "dashboard fix",
    project: "Alnassinan Store",
    startTime: "Added Manually",
    endTime: "Added Manually",
    date: "08-25-2025",
    type: "Added Manually",
    invoiced: false,
    totalHours: 1.0,
    status: "active",
  },
];

export default function TimeSheetsPage() {
  return <TimeTrackingBoard initialEntries={mockTimeEntries} />;
}