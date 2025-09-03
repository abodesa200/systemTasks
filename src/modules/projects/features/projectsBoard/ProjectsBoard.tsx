// modules/projects/features/projectsBoard/ProjectsBoard.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, FolderOpen } from "lucide-react";
import { ProjectsStats } from "../../components/ProjectsStats";
import { ProjectsFilters } from "../../components/ProjectsFilters";
import { ProjectCard } from "../../components/ProjectCard";
import { ProjectDialog } from "../../components/ProjectDialog";
import { useProjects } from "../../hooks/useProjects";
import { Project } from "../../types/projects";
import { Suspense, useState } from "react";

interface ProjectsBoardProps {
  initialProjects: Project[];
}

export const ProjectsBoard = ({ initialProjects }: ProjectsBoardProps) => {
  const {
    projects,
    setProjects,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    stats,
    filteredProjects,
  } = useProjects(initialProjects);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddProject = () => {
    setEditingProject(null);
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المشروع؟")) {
      setProjects(projects.filter((p) => p.id !== projectId));
    }
  };

  const handleViewProject = (project: Project) => {
    console.log("عرض المشروع:", project);
  };

  const handleSaveProject = (projectData: Partial<Project>) => {
    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id ? { ...p, ...projectData } : p
        )
      );
    } else {
      const newProject: Project = {
        ...projectData,
        id: Math.random().toString(36).substr(2, 9),
        progress: 0,
        tasksCount: 0,
        completedTasks: 0,
      } as Project;
      setProjects([...projects, newProject]);
    }
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Suspense fallback={<div>Loading...</div>}>
            <ProjectsStats stats={stats} />
          </Suspense>
          {/* <ProjectsStats stats={stats} /> */}
          <Suspense fallback={<div>Loading...</div>}>
            <ProjectsFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterStatus={filterStatus}
              onFilterStatusChange={setFilterStatus}
              filterPriority={filterPriority}
              onFilterPriorityChange={setFilterPriority}
            />
          </Suspense>

          <Button onClick={handleAddProject} className="gap-2 py-3 px-6 h-auto">
            <Plus className="w-5 h-5" />
            مشروع جديد
          </Button>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onView={handleViewProject}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                لا توجد مشاريع
              </h3>
              <p className="text-muted-foreground mb-6">
                لم يتم العثور على أي مشاريع تطابق المعايير المحددة
              </p>
              <Button onClick={handleAddProject} className="gap-2">
                <Plus className="w-5 h-5" />
                إنشاء مشروع جديد
              </Button>
            </CardContent>
          </Card>
        )}

        <ProjectDialog
          project={editingProject}
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingProject(null);
          }}
          onSave={handleSaveProject}
          isEditing={!!editingProject}
        />
      </div>
    </div>
  );
};

export default ProjectsBoard;
