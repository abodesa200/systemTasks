import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Category, SubCategory } from "../types/category";

interface CategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (category: Omit<Category, "id" | "subCategories">) => void;
  editingCategory?: Category | null;
}

export const CategoryForm = ({
  open,
  onOpenChange,
  onSubmit,
  editingCategory,
}: CategoryFormProps) => {
  const [form, setForm] = useState({
    name: editingCategory?.name || "",
    description: editingCategory?.description || "",
  });

  const handleSubmit = () => {
    if (!form.name) return;
    onSubmit(form);
    setForm({ name: "", description: "" });
  };

  const handleClose = () => {
    onOpenChange(false);
    setForm({ name: "", description: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingCategory ? "تعديل الفئة" : "إضافة فئة جديدة"}
          </DialogTitle>
          <DialogDescription>
            {editingCategory
              ? "قم بتعديل معلومات الفئة"
              : "أضف فئة جديدة إلى النظام"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              اسم الفئة *
            </label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="أدخل اسم الفئة"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              الوصف
            </label>
            <Input
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="أدخل وصف الفئة"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            إلغاء
          </Button>
          <Button onClick={handleSubmit}>
            {editingCategory ? "تعديل" : "إضافة"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface SubCategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (subCategory: Omit<SubCategory, "id">) => void;
  editingSubCategory?: SubCategory | null;
  categories: Category[];
}

export const SubCategoryForm = ({
  open,
  onOpenChange,
  onSubmit,
  editingSubCategory,
  categories,
}: SubCategoryFormProps) => {
  const [form, setForm] = useState({
    name: editingSubCategory?.name || "",
    description: editingSubCategory?.description || "",
    categoryId: editingSubCategory?.categoryId.toString() || "",
  });

  const handleSubmit = () => {
    if (!form.name || !form.categoryId) return;
    onSubmit({
      name: form.name,
      description: form.description,
      categoryId: parseInt(form.categoryId),
    });
    setForm({ name: "", description: "", categoryId: "" });
  };

  const handleClose = () => {
    onOpenChange(false);
    setForm({ name: "", description: "", categoryId: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingSubCategory
              ? "تعديل الفئة الفرعية"
              : "إضافة فئة فرعية جديدة"}
          </DialogTitle>
          <DialogDescription>
            {editingSubCategory
              ? "قم بتعديل معلومات الفئة الفرعية"
              : "أضف فئة فرعية جديدة إلى النظام"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="subCategoryName" className="text-sm font-medium">
              اسم الفئة الفرعية *
            </label>
            <Input
              id="subCategoryName"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="أدخل اسم الفئة الفرعية"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="subCategoryDescription"
              className="text-sm font-medium"
            >
              الوصف
            </label>
            <Input
              id="subCategoryDescription"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="أدخل وصف الفئة الفرعية"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="category" className="text-sm font-medium">
              الفئة الرئيسية *
            </label>
            <Select
              value={form.categoryId}
              onValueChange={(value) => setForm({ ...form, categoryId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الفئة الرئيسية" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            إلغاء
          </Button>
          <Button onClick={handleSubmit}>
            {editingSubCategory ? "تعديل" : "إضافة"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
