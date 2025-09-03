"use client"
import { Bell, Calendar, Filter, List, Plus, Settings } from 'lucide-react'
import React, { useState } from 'react'

const TaskBoardHeader = () => {
    const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
    const [activeFilter, setActiveFilter] = useState("all");
  return (
    <div className="mb-8">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Task Management
        </h1>
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
          <Calendar className="w-5 h-5 text-zinc-400" />
        </button>
        <button className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
          <Bell className="w-5 h-5 text-zinc-400" />
        </button>
        <button className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
          <Settings className="w-5 h-5 text-zinc-400" />
        </button>
      </div>
    </div>

    {/* Filter and Search Section */}
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 bg-zinc-800 p-1 rounded-lg">
        {["all", "todo", "progress", "review", "completed"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all
              ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }
            `}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Search and Actions */}
      <div className="flex items-center space-x-3 w-full md:w-auto">
        <div className="relative flex-1 md:flex-initial">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search tasks, assignments..."
            className="
              w-full md:w-64 pl-10 pr-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg
              text-white placeholder-zinc-500
              focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
              transition-all duration-200
            "
          />
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-zinc-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode("kanban")}
              className={`
                p-2 rounded-md transition-all duration-200
                ${
                  viewMode === "kanban"
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                    : "text-zinc-400 hover:text-white"
                }
              `}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`
                p-2 rounded-md transition-all duration-200
                ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                    : "text-zinc-400 hover:text-white"
                }
              `}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button className="flex items-center space-x-2 px-4 py-2.5 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
            <Filter className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-300 text-sm">Filters</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/20">
            <Plus className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">
              New Task
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TaskBoardHeader