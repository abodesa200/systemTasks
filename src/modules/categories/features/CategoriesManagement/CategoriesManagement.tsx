"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import { toast } from "sonner";

import { useCategories } from "../../hooks/useCategories";
import { CategoryForm, SubCategoryForm } from "../../components/CategoryForms";
import { CategoriesTable } from "../../components/CategoriesTable";
import { Category, SubCategory } from "../../types/categriesTypes";
import { CategoryStats } from "../../components/CategoryStats";

export default function CategoriesManagement() {
  const {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
  } = useCategories();

  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [subCategoryDialogOpen, setSubCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubCategory, setEditingSubCategory] =
    useState<SubCategory | null>(null);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(
        (category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          category.subCategories.some(
            (sub) =>
              sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              sub.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredCategories(filtered);
    }
  }, [searchTerm, categories]);

  useEffect(() => { 
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleCategorySubmit = async (
    categoryData: Omit<Category, "id" | "subCategories">
  ) => {
    try {
      if (editingCategory) {
        await updateCategory({ ...editingCategory, ...categoryData });
        toast.success("تم تعديل الفئة بنجاح");
      } else {
        await addCategory(categoryData);
        toast.success("تم إضافة الفئة بنجاح");
      }
      setCategoryDialogOpen(false);
      setEditingCategory(null);
    } catch (err) {
      // يتم التعامل مع الخطأ في الـ hook
    }
  };

  const handleSubCategorySubmit = async (
    subCategoryData: Omit<SubCategory, "id">
  ) => {
    try {
      if (editingSubCategory) {
        await updateSubCategory({ ...editingSubCategory, ...subCategoryData });
        toast.success("تم تعديل الفئة الفرعية بنجاح");
      } else {
        await addSubCategory(subCategoryData);
        toast.success("تم إضافة الفئة الفرعية بنجاح");
      }
      setSubCategoryDialogOpen(false);
      setEditingSubCategory(null);
    } catch (err) {
      // يتم التعامل مع الخطأ في الـ hook
    }
  };

  const openEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  const openEditSubCategory = (subCategory: SubCategory) => {
    setEditingSubCategory(subCategory);
    setSubCategoryDialogOpen(true);
  };

  const handleDeleteCategory = async (id: number) => {
    if (
      window.confirm(
        "هل أنت متأكد من حذف هذه الفئة؟ سيتم حذف جميع الفئات الفرعية التابعة لها."
      )
    ) {
      try {
        await deleteCategory(id);
        toast.success("تم حذف الفئة بنجاح");
      } catch (err) {
        // يتم التعامل مع الخطأ في الـ hook
      }
    }
  };

  const handleDeleteSubCategory = async (id: number, categoryId: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الفئة الفرعية؟")) {
      try {
        await deleteSubCategory(id, categoryId);
        toast.success("تم حذف الفئة الفرعية بنجاح");
      } catch (err) {
        // يتم التعامل مع الخطأ في الـ hook
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        جاري التحميل...
      </div>
    );
  }

  return (
    <div className=" ">
      <div className="">
        <CategoryStats categories={categories} />

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="ابحث عن فئة أو فئة فرعية..."
                  className="pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={() => setCategoryDialogOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة فئة
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setSubCategoryDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة فئة فرعية
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>قائمة الفئات والفئات الفرعية</CardTitle>
            <CardDescription>
              جميع الفئات الرئيسية والفئات الفرعية في النظام
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-b-lg overflow-hidden">
              <CategoriesTable
                categories={filteredCategories}
                onEditCategory={openEditCategory}
                onDeleteCategory={handleDeleteCategory}
                onEditSubCategory={openEditSubCategory}
                onDeleteSubCategory={handleDeleteSubCategory}
                searchTerm={searchTerm}
              />
            </div>
          </CardContent>
        </Card>

        <CategoryForm
          open={categoryDialogOpen}
          onOpenChange={setCategoryDialogOpen}
          onSubmit={handleCategorySubmit}
          editingCategory={editingCategory}
        />

        <SubCategoryForm
          open={subCategoryDialogOpen}
          onOpenChange={setSubCategoryDialogOpen}
          onSubmit={handleSubCategorySubmit}
          editingSubCategory={editingSubCategory}
          categories={categories}
        />
      </div>
    </div>
  );
}
