export interface Category {
  id: number;
  name: string;
  description: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: number;
  name: string;
  description: string;
  categoryId: number;
}
