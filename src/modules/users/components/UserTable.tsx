// modules/clients/components/UserTable.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, Mail, Plus, Trash2, User } from "lucide-react";
import { Client, UserType } from "../types/usersType";
import { getStatusBadge, getTypeBadge } from "../utils/badgeHelpers";
import { formatCurrency } from "../utils/clientHelpers";
import Link from "next/link";

interface UserTableProps {
  clients: (Client | UserType)[];
  onEdit: (client: Client | UserType) => void;
  onDelete: (client: Client | UserType) => void;
  onAdd: () => void;
  handleAddClick: () => void;
  type: "CLIENTS" | "USERS";
}

export const UserTable = ({
  clients,
  onEdit,
  onDelete,
  onAdd,
  type,
  handleAddClick,
}: UserTableProps) => {
  if (clients.length === 0) {
    return (
      <Card>
        <CardContent className="p-0">
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-slate-700/50 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              {type === "CLIENTS" ? "لا يوجد عملاء" : "لا يوجد مستخدمين"}
            </h3>
            <p className="text-slate-500 mb-6">
              {type === "CLIENTS"
                ? "لم يتم العثور على عملاء ينطبقون على معايير البحث"
                : "لم يتم العثور على مستخدمين ينطبقون على معايير البحث"}
            </p>
            <Button
              onClick={onAdd}
              variant={'maincolor'}
            >
              <Plus className="w-4 h-4 ml-2" />
              {type === "CLIENTS" ? "إضافة عميل جديد" : "إضافة مستخدم جديد"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>
              {type === "CLIENTS" ? "قائمة العملاء" : "قائمة المستخدمين"}
            </CardTitle>

            <Badge className="bg-slate-700 text-slate-300">
              {clients.length} {type === "CLIENTS" ? "عميل" : "مستخدم"}
            </Badge>
          </div>
          <Button
            onClick={handleAddClick}
            variant={'maincolor'}
          >
            <Plus className="w-4 h-4 ml-2" />
            {type === "CLIENTS" ? "إضافة عميل" : "إضافة مستخدم"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {type === "CLIENTS" ? "العميل" : "المستخدم"}
                </TableHead>
                {type === "CLIENTS" && (
                  <>
                    <TableHead>النوع</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الشركة</TableHead>
                    <TableHead>الحد الائتماني</TableHead>
                    <TableHead>إجمالي الإنفاق</TableHead>
                  </>
                )}
                {type === "USERS" && (
                  <>
                    <TableHead>آخر نشاط</TableHead>
                  </>
                )}
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id} className="">
                  <TableCell className="py-4 px-4  w-[200px]">
                    <div className="flex items-center  gap-3">
                      <Avatar>
                        <AvatarImage src={client.avatar} />
                        <AvatarFallback>
                          {client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-slate-200 font-medium">
                          {client.name}
                        </p>
                        <p className="text-slate-400 text-sm flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {client.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {type === "CLIENTS" && (
                    <>
                      <TableCell className="py-4">
                        {getTypeBadge((client as Client).type).badge}
                      </TableCell>
                      <TableCell className="py-4">
                        {getStatusBadge((client as Client).status).badge}
                      </TableCell>
                      <TableCell className="py-4">
                        <span>{(client as Client).company}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span>
                          {formatCurrency((client as Client).creditLimit || 0)}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span>
                          {formatCurrency((client as Client).totalSpent || 0)}
                        </span>
                      </TableCell>
                    </>
                  )}

                  {/* أعمدة خاصة بالمستخدمين */}
                  {type === "USERS" && (
                    <TableCell className="py-4">
                      <span>
                        {(client as UserType).lastActive
                          ? new Date(
                              (client as UserType).lastActive
                            ).toLocaleString("ar-SY")
                          : "غير نشط"}
                      </span>
                    </TableCell>
                  )}

                  {/* الإجراءات */}
                  <TableCell className="py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-cyan-500/20 hover:text-cyan-400"
                        onClick={() => onEdit(client)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-400"
                        onClick={() => onDelete(client)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Link href={`/users/${client.id}`}>
                      <Eye/>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
