// import { useState, useEffect } from "react";
// import { toast } from "sonner";

// interface Category {
//   id: number;
//   name: string;
//   description: string;
//   subCategories: SubCategory[];
// }

// interface SubCategory {
//   id: number;
//   name: string;
//   description: string;
//   categoryId: number;
// }

// export const  useCategories= () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [subDialogOpen, setSubDialogOpen] = useState(false);

//   const [editingCategory, setEditingCategory] = useState<Category | null>(null);
//   const [editingSubCategory, setEditingSubCategory] =
//     useState<SubCategory | null>(null);

//   const [categoryForm, setCategoryForm] = useState({
//     name: "",
//     description: "",
//   });
//   const [subCategoryForm, setSubCategoryForm] = useState({
//     name: "",
//     description: "",
//     categoryId: "",
//   });

//   // تصفية الفئات حسب البحث
//   useEffect(() => {
//     if (!searchTerm) {
//       setFilteredCategories(categories);
//     } else {
//       const filtered = categories.filter(
//         (category) =>
//           category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           category.description
//             .toLowerCase()
//             .includes(searchTerm.toLowerCase()) ||
//           category.subCategories.some(
//             (sub) =>
//               sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               sub.description.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//       );
//       setFilteredCategories(filtered);
//     }
//   }, [searchTerm, categories]);

//   // إضافة / تعديل الفئة
//   const handleCategorySubmit = () => {
//     if (!categoryForm.name) return toast.error("يرجى إدخال اسم الفئة");

//     if (editingCategory) {
//       setCategories(
//         categories.map((cat) =>
//           cat.id === editingCategory.id
//             ? {
//                 ...cat,
//                 name: categoryForm.name,
//                 description: categoryForm.description,
//               }
//             : cat
//         )
//       );
//       toast.success("تم تعديل الفئة بنجاح");
//     } else {
//       const newCategory: Category = {
//         id: categories.length + 1,
//         name: categoryForm.name,
//         description: categoryForm.description,
//         subCategories: [],
//       };
//       setCategories([...categories, newCategory]);
//       toast.success("تم إضافة الفئة بنجاح");
//     }

//     setDialogOpen(false);
//     setCategoryForm({ name: "", description: "" });
//     setEditingCategory(null);
//   };

//   // إضافة / تعديل الفئة الفرعية
//   const handleSubCategorySubmit = () => {
//     if (!subCategoryForm.name || !subCategoryForm.categoryId)
//       return toast.error("يرجى إكمال جميع الحقول المطلوبة");

//     const categoryId = parseInt(subCategoryForm.categoryId);

//     if (editingSubCategory) {
//       setCategories(
//         categories.map((cat) =>
//           cat.id === categoryId
//             ? {
//                 ...cat,
//                 subCategories: cat.subCategories.map((sub) =>
//                   sub.id === editingSubCategory.id
//                     ? { ...sub, ...subCategoryForm, categoryId }
//                     : sub
//                 ),
//               }
//             : cat
//         )
//       );
//       toast.success("تم تعديل الفئة الفرعية بنجاح");
//     } else {
//       const newSubCategory: SubCategory = {
//         id:
//           Math.max(
//             ...categories.flatMap((c) => c.subCategories.map((s) => s.id)),
//             0
//           ) + 1,
//         name: subCategoryForm.name,
//         description: subCategoryForm.description,
//         categoryId,
//       };
//       setCategories(
//         categories.map((cat) =>
//           cat.id === categoryId
//             ? { ...cat, subCategories: [...cat.subCategories, newSubCategory] }
//             : cat
//         )
//       );
//       toast.success("تم إضافة الفئة الفرعية بنجاح");
//     }

//     setSubDialogOpen(false);
//     setSubCategoryForm({ name: "", description: "", categoryId: "" });
//     setEditingSubCategory(null);
//   };

//   const openEditCategory = (category: Category) => {
//     setEditingCategory(category);
//     setCategoryForm({ name: category.name, description: category.description });
//     setDialogOpen(true);
//   };

//   const openEditSubCategory = (subCategory: SubCategory) => {
//     setEditingSubCategory(subCategory);
//     setSubCategoryForm({
//       name: subCategory.name,
//       description: subCategory.description,
//       categoryId: subCategory.categoryId.toString(),
//     });
//     setSubDialogOpen(true);
//   };

//   const deleteCategory = (id: number) => {
//     if (
//       window.confirm(
//         "هل أنت متأكد من حذف هذه الفئة؟ سيتم حذف جميع الفئات الفرعية التابعة لها."
//       )
//     ) {
//       setCategories(categories.filter((cat) => cat.id !== id));
//       toast.success("تم حذف الفئة بنجاح");
//     }
//   };

//   const deleteSubCategory = (id: number, categoryId: number) => {
//     if (window.confirm("هل أنت متأكد من حذف هذه الفئة الفرعية؟")) {
//       setCategories(
//         categories.map((cat) =>
//           cat.id === categoryId
//             ? {
//                 ...cat,
//                 subCategories: cat.subCategories.filter((sub) => sub.id !== id),
//               }
//             : cat
//         )
//       );
//       toast.success("تم حذف الفئة الفرعية بنجاح");
//     }
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     setCategoryForm({ name: "", description: "" });
//     setEditingCategory(null);
//   };

//   const handleSubDialogClose = () => {
//     setSubDialogOpen(false);
//     setSubCategoryForm({ name: "", description: "", categoryId: "" });
//     setEditingSubCategory(null);
//   };

//   return {
//     categories,
//     filteredCategories,
//     searchTerm,
//     setSearchTerm,
//     dialogOpen,
//     subDialogOpen,
//     categoryForm,
//     setCategoryForm,
//     subCategoryForm,
//     setSubCategoryForm,
//     editingCategory,
//     editingSubCategory,
//     handleCategorySubmit,
//     handleSubCategorySubmit,
//     openEditCategory,
//     openEditSubCategory,
//     deleteCategory,
//     deleteSubCategory,
//     handleDialogClose,
//     handleSubDialogClose,
//   };
// };

import { useState, useEffect } from "react";
import { Category } from "../types/category";
import { categoriesApi } from "../services/categoriesApi";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoriesApi.getCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError("فشل في تحميل الفئات");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (
    category: Omit<Category, "id" | "subCategories">
  ) => {
    try {
      const newCategory = await categoriesApi.addCategory(category);
      setCategories((prev) => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError("فشل في إضافة الفئة");
      throw err;
    }
  };

  const updateCategory = async (category: Category) => {
    try {
      const updatedCategory = await categoriesApi.updateCategory(category);
      setCategories((prev) =>
        prev.map((cat) => (cat.id === category.id ? updatedCategory : cat))
      );
      return updatedCategory;
    } catch (err) {
      setError("فشل في تعديل الفئة");
      throw err;
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await categoriesApi.deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      setError("فشل في حذف الفئة");
      throw err;
    }
  };

  const addSubCategory = async (subCategory: Omit<SubCategory, "id">) => {
    try {
      const newSubCategory = await categoriesApi.addSubCategory(subCategory);
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === subCategory.categoryId
            ? { ...cat, subCategories: [...cat.subCategories, newSubCategory] }
            : cat
        )
      );
      return newSubCategory;
    } catch (err) {
      setError("فشل في إضافة الفئة الفرعية");
      throw err;
    }
  };

  const updateSubCategory = async (subCategory: SubCategory) => {
    try {
      const updatedSubCategory = await categoriesApi.updateSubCategory(
        subCategory
      );
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === subCategory.categoryId
            ? {
                ...cat,
                subCategories: cat.subCategories.map((sub) =>
                  sub.id === subCategory.id ? updatedSubCategory : sub
                ),
              }
            : cat
        )
      );
      return updatedSubCategory;
    } catch (err) {
      setError("فشل في تعديل الفئة الفرعية");
      throw err;
    }
  };

  const deleteSubCategory = async (id: number, categoryId: number) => {
    try {
      await categoriesApi.deleteSubCategory(id);
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                subCategories: cat.subCategories.filter((sub) => sub.id !== id),
              }
            : cat
        )
      );
    } catch (err) {
      setError("فشل في حذف الفئة الفرعية");
      throw err;
    }
  };

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
    refetch: loadCategories,
  };
};