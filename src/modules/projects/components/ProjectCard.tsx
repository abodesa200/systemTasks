// modules/projects/components/ProjectCard.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Project } from "../types/projects";
import {
  getStatusColor,
  getPriorityColor,
  getStatusText,
  getPriorityText,
} from "../utils/projectHelpers";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onView: (project: Project) => void;
}

export const ProjectCard = ({
  project,
  onEdit,
  onDelete,
  onView,
}: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {project.description}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(project.status)}>
            {getStatusText(project.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-muted-foreground">التقدم</span>
          <span className="text-sm font-medium">{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-2" />

        <div className="flex justify-between items-center mt-4">
          <Badge
            variant="outline"
            className={getPriorityColor(project.priority)}
          >
            {getPriorityText(project.priority)}
          </Badge>
          <div className="text-sm text-muted-foreground">
            {project.completedTasks} / {project.tasksCount} مهام
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-3 border-t">
        <Button variant="outline" size="sm" onClick={() => onView(project)}>
          عرض
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(project)}>
            تعديل
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(project.id)}
          >
            حذف
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
