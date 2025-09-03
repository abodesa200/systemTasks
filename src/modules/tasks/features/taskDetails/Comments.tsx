"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { mockComments } from "@/modules/data";
import { Heart, MoreHorizontal, Paperclip, Send } from "lucide-react";
import { useState } from "react";
import { formatDate, formatTime } from "../../utils/taskHelpers";

const Comments = () => {
  const [newComment, setNewComment] = useState("");

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">إضافة تعليق جديد</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="اكتب تعليقك هنا..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Paperclip className="w-4 h-4 ml-1" />
                إرفاق ملف
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setNewComment("")}>
                إلغاء
              </Button>
              <Button disabled={!newComment.trim()}>
                <Send className="w-4 h-4 ml-2" />
                إرسال التعليق
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {mockComments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>{comment.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(comment.timestamp)} في{" "}
                      {formatTime(comment.timestamp)}
                    </span>
                    {comment.edited && (
                      <Badge variant="outline" className="text-xs">
                        معدل
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed mb-3">
                    {comment.content}
                  </p>

                  {/* Reactions */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {comment.reactions?.map((reaction, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs px-2"
                        >
                          {reaction.emoji} {reaction.count}
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                        <Heart className="w-3 h-3 ml-1" />
                        إعجاب
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                        رد
                      </Button>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>تعديل</DropdownMenuItem>
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

export default Comments;
