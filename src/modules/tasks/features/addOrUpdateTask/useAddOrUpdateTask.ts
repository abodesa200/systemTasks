// useAddOrUpdateTask.ts
"use client";

import { useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Task, UseAddOrUpdateTaskProps } from "../../types";
import tasksApi from "../../services/tasksApi";

export const taskFormSchema = z.object({
  title: z.string().min(1, "عنوان المهمة مطلوب"),
  description: z.string().optional(),
  project: z.string().optional(),
  client: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  estimatedHours: z.coerce
    .number()
    .min(0, "يجب أن تكون القيمة أكبر من أو تساوي 0")
    .optional(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;



export function useAddOrUpdateTask({ task, onClose }: UseAddOrUpdateTaskProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const form = useForm<TaskFormValues>({
  resolver: zodResolver(taskFormSchema) as Resolver<TaskFormValues>,
  defaultValues: {
    title: task?.title ?? "",
    description: task?.description ?? "",
    project: task?.project ?? "",
    client: task?.client ?? "",
    dueDate: task?.dueDate ?? "",
    priority: (task?.priority as "low" | "medium" | "high") ?? "medium",
    estimatedHours: task?.estimatedHours ?? 0,
  },
});

  const handleSave: SubmitHandler<TaskFormValues> = async (values) => {
    setIsLoading(true);
    setError(null);

    try {
      if (task) {
        await tasksApi.updateTask(task.id, values);
      } else {
        await tasksApi.createTask(values);
      }
      onClose();
    } catch (err) {
      console.error(err);
      setError("صار خطأ أثناء الحفظ. جرب مرة تانية.");
    } finally {
      setIsLoading(false);
    }
  };


  return {
    form,
    isLoading,
    error,
    handleSave,
  };
}
