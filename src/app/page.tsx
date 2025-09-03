'use client'; // Add this line

import { summaryData } from "@/components/data";
import TasksBoard from "@/components/tasksBoard/TasksBoard";
import TaskSummaryCard from "@/components/TaskSummaryCard";

export default function Home() {
  return (
      <div className="max-w-6xl mx-auto ">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {summaryData.map((item, index) => (
            <TaskSummaryCard
              key={index}
              title={item.title}
              count={item.count}
              status={item.status}
              icon={item.icon}
              percentage={item.percentage}
            />
          ))}
        </div>
        <TasksBoard />
      
    </div>
  );
}
