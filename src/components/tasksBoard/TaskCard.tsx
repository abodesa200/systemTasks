"use client"
import Image from "next/image";
import { useState } from "react";

export function TaskCard({
    task,
    onDragStart,
    onDragEnd,
    isDragging,
    onEdit,
    onDelete,
  }) {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const handleDragStart = (e) => {
      onDragStart(task.id, e);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", task.id);
    };
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    };
  
    const getDaysUntilDue = (dueDate) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const due = new Date(dueDate);
      due.setHours(0, 0, 0, 0);
      const diffTime = due - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };
  
    const getPriorityText = (priority) => {
      const priorityMap = {
        high: "High",
        medium: "Medium",
        low: "Low"
      };
      return priorityMap[priority] || priority;
    };
  
    const daysUntilDue = getDaysUntilDue(task.dueDate);
    const isOverdue = daysUntilDue < 0;
    const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;
  
    return (
      <div
        className={`mb-3 cursor-grab hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 rounded-lg group relative
          ${isDragging ? "opacity-100 bg-gray-50 rotate-1 shadow-xl scale-105" : ""}
          ${isOverdue ? "border-l-4 border-l-red-500" : ""}
          ${isDueSoon ? "border-l-4 border-l-amber-500" : ""}
        `}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="p-4 pb-2 pr-4">
          <div className="flex items-start justify-between">
            <h3
              className="font-semibold text-sm leading-tight text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {task.title}
            </h3>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button
                className="h-6 w-6 text-gray-400 hover:text-gray-600 rounded-md flex items-center justify-center"
                onClick={() => onEdit(task)}
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                className="h-6 w-6 text-gray-400 hover:text-red-500 rounded-md flex items-center justify-center"
                onClick={() => onDelete(task.id)}
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button className="h-6 w-6 text-gray-400 hover:text-gray-600 rounded-md flex items-center justify-center">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
          </div>
  
          {isExpanded && task.description && (
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              {task.description}
            </p>
          )}
  
          <div className="text-xs text-gray-500 space-y-1 mt-2">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-6 0H5m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>{task.project}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Client: {task.client}</span>
            </div>
          </div>
        </div>
  
        <div className="pt-0 px-4 pb-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div
                className={`flex items-center gap-1 ${
                  isOverdue
                    ? "text-red-600"
                    : isDueSoon
                    ? "text-amber-600"
                    : "text-gray-500"
                }`}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(task.dueDate)}</span>
                {isOverdue && (
                  <span className="text-red-600 font-medium">
                    (Overdue by {Math.abs(daysUntilDue)} days)
                  </span>
                )}
                {isDueSoon && (
                  <span className="text-amber-600 font-medium">
                    (Due in {daysUntilDue} days)
                  </span>
                )}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full border ${
                task.priority === 'high' 
                  ? 'border-red-200 bg-red-50 text-red-700' 
                  : task.priority === 'medium'
                  ? 'border-amber-200 bg-amber-50 text-amber-700'
                  : 'border-green-200 bg-green-50 text-green-700'
              }`}>
                {getPriorityText(task.priority)}
              </span>
            </div>
  
            <div className="flex flex-wrap gap-1">
              {task.tags.map((tag) => (
                <span
                  key={tag.id}
                  className={`text-xs px-2 py-1 rounded-full border ${tag.color}`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
  
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium text-gray-900">
                  {task.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-full rounded-full transition-all ${
                    task.progress < 30
                      ? "bg-red-500"
                      : task.progress < 70
                      ? "bg-amber-500"
                      : "bg-teal-500"
                  }`}
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
  
            {/* Time information */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  {task.spentHours}h / {task.estimatedHours}h
                </span>
              </div>
              <div className="text-xs">
                {Math.round((task.spentHours / task.estimatedHours) * 100)}% of estimated time
              </div>
            </div>
  
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{task.comments}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span>{task.attachments}</span>
                </div>
              </div>
              <div className="flex -space-x-2">
                {task.assignees.map((assignee) => (
                  <div
                    key={assignee.id}
                    className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs text-gray-600 overflow-hidden"
                  >
                    {assignee.avatar ? (
                      <Image fill src={assignee.avatar} alt={assignee.initials} className="w-full h-full object-cover" />
                    ) : (
                      assignee.initials
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }