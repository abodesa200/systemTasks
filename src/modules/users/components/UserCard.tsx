// modules/clients/components/ClientCard.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Building,
  Calendar,
  Edit,
  Mail,
  MoreHorizontal,
  Phone,
  Trash2,
} from "lucide-react";
import { Client, User } from "../types/usersType";
import { getStatusBadge, getTypeBadge } from "../utils/badgeHelpers";
import { formatCurrency } from "../utils/clientHelpers";

interface ClientCardProps {
  client: Client | User;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
  type:string;
}

export const UserCard = ({ client, onEdit, onDelete,type }: ClientCardProps) => {
  return (
    <Card key={client.id} className="">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <Avatar>
            <AvatarImage src={client.avatar} />
            <AvatarFallback>
              {client.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-slate-800 border-slate-700"
            >
              <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(client)}>
                <Edit className="w-4 h-4 ml-2" /> تعديل
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-400 focus:text-red-400 focus:bg-red-500/20"
                onClick={() => onDelete(client)}
              >
                <Trash2 className="w-4 h-4 ml-2" /> حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-4">
          <CardTitle className="text-lg text-slate-200">
            {client.name}
          </CardTitle>
          <CardDescription className="flex items-center gap-1 mt-1">
            <Building className="w-4 h-4" /> {client.company}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">النوع:</span>
            {getTypeBadge(client.type).badge}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">الحالة:</span>
            {getStatusBadge(client.status).badge}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">البريد:</span>
            <span className="text-slate-200 flex items-center gap-1">
              <Mail className="w-4 h-4" /> {client.email}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">الهاتف:</span>
            <span className="text-slate-200 flex items-center gap-1">
              <Phone className="w-4 h-4" /> {client.phone}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">الحد الائتماني:</span>
            <span className="text-slate-200">
              {formatCurrency(client.creditLimit || 0)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">إجمالي الإنفاق:</span>
            <span className="text-slate-200">
              {formatCurrency(client.totalSpent || 0)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">تاريخ الانضمام:</span>
            <span className="text-slate-200 flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {client.joinDate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-700/50">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
            onClick={() => onEdit(client)}
          >
            <Edit className="w-4 h-4 ml-2" /> تعديل
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-red-600/50 text-red-400 hover:bg-red-500/20"
            onClick={() => onDelete(client)}
          >
            <Trash2 className="w-4 h-4 ml-2" /> حذف
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
