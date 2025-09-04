import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit, FolderOpen, Tag, Trash2 } from "lucide-react";
import { Category, SubCategory } from "../types/categriesTypes";
import { Fragment } from "react";

interface CategoriesTableProps {
  categories: Category[];
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (id: number) => void;
  onEditSubCategory: (subCategory: SubCategory) => void;
  onDeleteSubCategory: (id: number, categoryId: number) => void;
  searchTerm: string;
}

export const CategoriesTable = ({
  categories,
  onEditCategory,
  onDeleteCategory,
  onEditSubCategory,
  onDeleteSubCategory,
  searchTerm,
}: CategoriesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>اسم الفئة</TableHead>
          <TableHead>الوصف</TableHead>
          <TableHead>الفئات الفرعية</TableHead>
          <TableHead className="text-center">الإجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.length > 0 ? (
          categories.map((category) => (
            <Fragment key={category.id}>
              <TableRow  className="">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <FolderOpen className="h-4 w-4 ml-2 text-blue-500" />
                    {category.name}
                  </div>
                </TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {category.subCategories.length} فئة فرعية
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditCategory(category)}
                    >
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteCategory(category.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              {category.subCategories.map((subCategory) => (
                <TableRow key={subCategory.id} className="">
                  <TableCell className="pl-10">
                    <div className="flex items-center">
                      <Tag className="h-3 w-3 ml-2 text-gray-500" />
                      {subCategory.name}
                    </div>
                  </TableCell>
                  <TableCell>{subCategory.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">فئة فرعية</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditSubCategory(subCategory)}
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          onDeleteSubCategory(subCategory.id, category.id)
                        }
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </Fragment>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center h-24">
              {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد فئات مضافة بعد"}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
