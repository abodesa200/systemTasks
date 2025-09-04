import { Category, SubCategory } from "../types/category";

// هذه خدمة وهمية - يمكن استبدالها باتصالات API حقيقية
export const categoriesApi = {
  getCategories: async (): Promise<Category[]> => {
    // محاكاة استجابة API
    return [
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
  },

  addCategory: async (
    category: Omit<Category, "id" | "subCategories">
  ): Promise<Category> => {
    // محاكاة إضافة فئة
    return {
      id: Math.floor(Math.random() * 1000),
      ...category,
      subCategories: [],
    };
  },

  updateCategory: async (category: Category): Promise<Category> => {
    // محاكاة تحديث فئة
    return category;
  },

  deleteCategory: async (id: number): Promise<void> => {
    // محاكاة حذف فئة
  },

  addSubCategory: async (
    subCategory: Omit<SubCategory, "id">
  ): Promise<SubCategory> => {
    // محاكاة إضافة فئة فرعية
    return {
      id: Math.floor(Math.random() * 1000),
      ...subCategory,
    };
  },

  updateSubCategory: async (subCategory: SubCategory): Promise<SubCategory> => {
    // محاكاة تحديث فئة فرعية
    return subCategory;
  },

  deleteSubCategory: async (id: number): Promise<void> => {
    // محاكاة حذف فئة فرعية
  },
};
