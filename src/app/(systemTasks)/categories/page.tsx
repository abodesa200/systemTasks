"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  FolderOpen,
  FolderTree,
  Plus,
  Search,
  Tag,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// أنواع البيانات
interface Category {
  id: number;
  name: string;
  description: string;
  subCategories: SubCategory[];
}

interface SubCategory {
  id: number;
  name: string;
  description: string;
  categoryId: number;
}

export default function CategoriesManagement() {
  // حالات التخزين
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [subDialogOpen, setSubDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubCategory, setEditingSubCategory] =
    useState<SubCategory | null>(null);

  // نموذج الفئة
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
  });

  // نموذج الفئة الفرعية
  const [subCategoryForm, setSubCategoryForm] = useState({
    name: "",
    description: "",
    categoryId: "",
  });

  // تحميل البيانات الأولية (يمكن استبدالها بطلب API)
  useEffect(() => {
    // بيانات تجريبية
    const sampleData: Category[] = [
      {
        id: 1,
        name: "المبيعات",
        description: "فئات متعلقة بعمليات البيع",
        subCategories: [
          {
            id: 1,
            name: "مبيعات التجزئة",
            description: "مبيعات مباشرة للعملاء",
            categoryId: 1,
          },
          {
            id: 2,
            name: "مبيعات الجملة",
            description: "مبيعات بكميات كبيرة",
            categoryId: 1,
          },
        ],
      },
      {
        id: 2,
        name: "المشتريات",
        description: "فئات متعلقة بعمليات الشراء",
        subCategories: [
          {
            id: 3,
            name: "مواد خام",
            description: "شراء المواد الخام للإنتاج",
            categoryId: 2,
          },
          {
            id: 4,
            name: "مستلزمات مكتبية",
            description: "شراء المستلزمات المكتبية",
            categoryId: 2,
          },
        ],
      },
    ];

    setCategories(sampleData);
    setFilteredCategories(sampleData);
  }, []);

  // تصفية الفئات حسب البحث
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

  // معالجة إضافة/تعديل الفئة
  const handleCategorySubmit = () => {
    if (!categoryForm.name) {
      toast.error("يرجى إدخال اسم الفئة");
      return;
    }

    if (editingCategory) {
      // تعديل الفئة الحالية
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? {
                ...cat,
                name: categoryForm.name,
                description: categoryForm.description,
              }
            : cat
        )
      );
      toast.success("تم تعديل الفئة بنجاح");
    } else {
      // إضافة فئة جديدة
      const newCategory: Category = {
        id: categories.length + 1,
        name: categoryForm.name,
        description: categoryForm.description,
        subCategories: [],
      };
      setCategories([...categories, newCategory]);
      toast.success("تم إضافة الفئة بنجاح");
    }

    // إغلاق النافذة وإعادة تعيين النموذج
    setDialogOpen(false);
    setCategoryForm({ name: "", description: "" });
    setEditingCategory(null);
  };

  // معالجة إضافة/تعديل الفئة الفرعية
  const handleSubCategorySubmit = () => {
    if (!subCategoryForm.name || !subCategoryForm.categoryId) {
      toast.error("يرجى إكمال جميع الحقول المطلوبة");
      return;
    }

    const categoryId = parseInt(subCategoryForm.categoryId);

    if (editingSubCategory) {
      // تعديل الفئة الفرعية الحالية
      setCategories(
        categories.map((cat) => {
          if (cat.id === categoryId) {
            return {
              ...cat,
              subCategories: cat.subCategories.map((sub) =>
                sub.id === editingSubCategory.id
                  ? {
                      ...sub,
                      name: subCategoryForm.name,
                      description: subCategoryForm.description,
                      categoryId: categoryId,
                    }
                  : sub
              ),
            };
          }
          return cat;
        })
      );
      toast.success("تم تعديل الفئة الفرعية بنجاح");
    } else {
      // إضافة فئة فرعية جديدة
      const newSubCategory: SubCategory = {
        id:
          Math.max(
            ...categories.flatMap((c) => c.subCategories.map((s) => s.id)),
            0
          ) + 1,
        name: subCategoryForm.name,
        description: subCategoryForm.description,
        categoryId: categoryId,
      };

      setCategories(
        categories.map((cat) =>
          cat.id === categoryId
            ? { ...cat, subCategories: [...cat.subCategories, newSubCategory] }
            : cat
        )
      );
      toast.success("تم إضافة الفئة الفرعية بنجاح");
    }

    // إغلاق النافذة وإعادة تعيين النموذج
    setSubDialogOpen(false);
    setSubCategoryForm({ name: "", description: "", categoryId: "" });
    setEditingSubCategory(null);
  };

  // فتح نافذة تعديل الفئة
  const openEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description,
    });
    setDialogOpen(true);
  };

  // فتح نافذة تعديل الفئة الفرعية
  const openEditSubCategory = (subCategory: SubCategory) => {
    setEditingSubCategory(subCategory);
    setSubCategoryForm({
      name: subCategory.name,
      description: subCategory.description,
      categoryId: subCategory.categoryId.toString(),
    });
    setSubDialogOpen(true);
  };

  // حذف الفئة
  const deleteCategory = (id: number) => {
    if (
      window.confirm(
        "هل أنت متأكد من حذف هذه الفئة؟ سيتم حذف جميع الفئات الفرعية التابعة لها."
      )
    ) {
      setCategories(categories.filter((cat) => cat.id !== id));
      toast.success("تم حذف الفئة بنجاح");
    }
  };

  // حذف الفئة الفرعية
  const deleteSubCategory = (id: number, categoryId: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الفئة الفرعية؟")) {
      setCategories(
        categories.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                subCategories: cat.subCategories.filter((sub) => sub.id !== id),
              }
            : cat
        )
      );
      toast.success("تم حذف الفئة الفرعية بنجاح");
    }
  };

  // إعادة تعيين النماذج عند إغلاق النوافذ
  const handleDialogClose = () => {
    setDialogOpen(false);
    setCategoryForm({ name: "", description: "" });
    setEditingCategory(null);
  };

  const handleSubDialogClose = () => {
    setSubDialogOpen(false);
    setSubCategoryForm({ name: "", description: "", categoryId: "" });
    setEditingSubCategory(null);
  };

  return (
    <div className="min-h-screen p-6 ">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FolderTree className="ml-2 h-8 w-8" />
            إدارة الفئات والفئات الفرعية
          </h1>
          <p className="text-gray-600 mt-2">
            قم بإدارة الفئات والفئات الفرعية المستخدمة في تصنيف المعاملات
            والمنتجات
          </p>
        </div>

        {/* بطاقات الإحصاءات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                إجمالي الفئات
              </CardTitle>
              <FolderOpen className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
              <p className="text-xs text-gray-600 mt-1">فئة رئيسية</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                إجمالي الفئات الفرعية
              </CardTitle>
              <Tag className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categories.reduce(
                  (total, cat) => total + cat.subCategories.length,
                  0
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1">فئة فرعية</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                الفئة الأكثر استخدامًا
              </CardTitle>
              <FolderTree className="h-5 w-5 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categories.length > 0
                  ? categories.reduce((prev, current) =>
                      prev.subCategories.length > current.subCategories.length
                        ? prev
                        : current
                    ).name
                  : "لا يوجد"}
              </div>
              <p className="text-xs text-gray-600 mt-1">بعدد الفئات الفرعية</p>
            </CardContent>
          </Card>
        </div>

        {/* شريط البحث والإجراءات */}
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
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة فئة
                    </Button>
                  </DialogTrigger>
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
                          value={categoryForm.name}
                          onChange={(e) =>
                            setCategoryForm({
                              ...categoryForm,
                              name: e.target.value,
                            })
                          }
                          placeholder="أدخل اسم الفئة"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label
                          htmlFor="description"
                          className="text-sm font-medium"
                        >
                          الوصف
                        </label>
                        <Input
                          id="description"
                          value={categoryForm.description}
                          onChange={(e) =>
                            setCategoryForm({
                              ...categoryForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="أدخل وصف الفئة"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={handleDialogClose}>
                        إلغاء
                      </Button>
                      <Button onClick={handleCategorySubmit}>
                        {editingCategory ? "تعديل" : "إضافة"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={subDialogOpen} onOpenChange={setSubDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة فئة فرعية
                    </Button>
                  </DialogTrigger>
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
                        <label
                          htmlFor="subCategoryName"
                          className="text-sm font-medium"
                        >
                          اسم الفئة الفرعية *
                        </label>
                        <Input
                          id="subCategoryName"
                          value={subCategoryForm.name}
                          onChange={(e) =>
                            setSubCategoryForm({
                              ...subCategoryForm,
                              name: e.target.value,
                            })
                          }
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
                          value={subCategoryForm.description}
                          onChange={(e) =>
                            setSubCategoryForm({
                              ...subCategoryForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="أدخل وصف الفئة الفرعية"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label
                          htmlFor="category"
                          className="text-sm font-medium"
                        >
                          الفئة الرئيسية *
                        </label>
                        <Select
                          value={subCategoryForm.categoryId}
                          onValueChange={(value) =>
                            setSubCategoryForm({
                              ...subCategoryForm,
                              categoryId: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الفئة الرئيسية" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id.toString()}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={handleSubDialogClose}>
                        إلغاء
                      </Button>
                      <Button onClick={handleSubCategorySubmit}>
                        {editingSubCategory ? "تعديل" : "إضافة"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* جدول الفئات */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة الفئات والفئات الفرعية</CardTitle>
            <CardDescription>
              جميع الفئات الرئيسية والفئات الفرعية في النظام
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-b-lg overflow-hidden">
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
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <>
                        <TableRow key={category.id} className="">
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
                                onClick={() => openEditCategory(category)}
                              >
                                <Edit className="h-4 w-4 text-blue-500" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteCategory(category.id)}
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
                                  onClick={() =>
                                    openEditSubCategory(subCategory)
                                  }
                                >
                                  <Edit className="h-4 w-4 text-blue-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    deleteSubCategory(
                                      subCategory.id,
                                      category.id
                                    )
                                  }
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center h-24">
                        {searchTerm
                          ? "لا توجد نتائج للبحث"
                          : "لا توجد فئات مضافة yet"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
