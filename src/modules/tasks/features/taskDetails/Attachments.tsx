import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockAttachments } from "@/modules/data";
import { Download, Eye, MoreHorizontal, Paperclip, Plus } from "lucide-react";
import { formatDate } from "../../utils/taskHelpers";

const Attachments = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">إضافة مرفق جديد</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
            <Plus className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-muted-foreground mb-2">
              اسحب الملفات هنا أو انقر للتحميل
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              يدعم: PDF, DOC, XLS, PPT, الصور والفيديوهات (حد أقصى 10MB)
            </p>
            <Button variant="outline" size="sm">
              <Paperclip className="w-4 h-4 ml-2" />
              اختيار الملفات
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockAttachments.map((attachment) => (
          <Card
            key={attachment.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Paperclip className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {attachment.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {attachment.size}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    رفعه {attachment.uploadedBy}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(attachment.uploadedAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                {attachment.preview && (
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 ml-1" />
                    معاينة
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 ml-1" />
                  تحميل
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>إعادة تسمية</DropdownMenuItem>
                    <DropdownMenuItem>نسخ الرابط</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Attachments;
