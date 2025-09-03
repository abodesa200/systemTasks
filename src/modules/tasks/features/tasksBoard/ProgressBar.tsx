import { Progress } from "@/components/ui/progress";
import React from "react";
import { getProgressColor } from "../../utils/taskHelpers";

interface ProgressBarProps {
  value: number;
  className?: string;
  showPercentage?: boolean;
}

export const ProgressBar = React.memo(
  ({ value, className = "", showPercentage = false }: ProgressBarProps) => {
    const colorClass = getProgressColor(value);

    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Progress value={value} className="h-2 flex-1">
          <div
            className={`h-full transition-all duration-300 rounded-full ${colorClass}`}
            style={{ width: `${value}%` }}
          />
        </Progress>
        {showPercentage && (
          <span className="text-xs text-muted-foreground min-w-[2rem]">
            {value}%
          </span>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";
