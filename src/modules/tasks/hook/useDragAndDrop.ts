import { useCallback, useState } from "react";
import { Column } from "../types";

export function useDragAndDrop(
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>
) {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = useCallback((taskId: string) => {
    setDraggedTaskId(taskId);
  }, []);

  const handleDrop = useCallback(
    (targetColumnId: string) => {
      if (!draggedTaskId) return;

      setColumns((prevColumns) => {
        const sourceColumn = prevColumns.find((col) =>
          col.tasks.some((task) => task.id === draggedTaskId)
        );
        if (!sourceColumn) return prevColumns;

        const draggedTask = sourceColumn.tasks.find(
          (task) => task.id === draggedTaskId
        );
        if (!draggedTask) return prevColumns;

        // إذا المهمة نازلة بنفس العمود ما نغير شي
        if (sourceColumn.id === targetColumnId) return prevColumns;

        const updatedTask = { ...draggedTask, status: targetColumnId };

        return prevColumns.map((column) => {
          if (column.id === sourceColumn.id) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== draggedTaskId),
            };
          } else if (column.id === targetColumnId) {
            return {
              ...column,
              tasks: [...column.tasks, updatedTask],
            };
          }
          return column;
        });
      });

      setDraggedTaskId(null);
    },
    [draggedTaskId, setColumns]
  );

  return { handleDragStart, handleDrop };
}
