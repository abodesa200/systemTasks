import TaskSummaryCard from "@/components/shared/SummaryCard";
import TasksBoard from "@/modules/tasks/features/tasksBoard/TasksBoard";

import { CheckSquare, Clock, Eye, Pause } from "lucide-react";

const TasksPage = () => {
  return (
    <div className="space-y-4 overflow-x-auto">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 p-1 mb-6 ">
        <TaskSummaryCard
          title="TO DO"
          count={12}
          icon={
            <CheckSquare className="w-5 h-5" style={{ color: "#3b82f6" }} />
          }
          variant="todo"
        />
        <TaskSummaryCard
          title="IN PROGRESS"
          count={2}
          icon={<Clock className="w-5 h-5" style={{ color: "#f59e0b" }} />}
          variant="progress"
        />
        <TaskSummaryCard
          title="IN REVIEW"
          count={5}
          icon={<Eye className="w-5 h-5" style={{ color: "#a855f7" }} />}
          variant="review"
        />
        <TaskSummaryCard
          title="ON HOLD"
          count={62}
          icon={<Pause className="w-5 h-5" style={{ color: "#64748b" }} />}
          variant="hold"
        />
      </div>
      <TasksBoard />
    </div>
  );
};

export default TasksPage;
