// store/profileStore.ts
import { create } from "zustand";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  // ضيف الحقول حسب الـ API تبعك
}

interface ProfileState {
  user: UserProfile | null;
  error: string | null;
  loading: boolean;
  fetchProfile: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  user: null,
  error: null,
  loading: false,
  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/profile");
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("غير مصرح به، يرجى تسجيل الدخول");
        } else if (res.status === 404) {
          throw new Error("المستخدم غير موجود");
        } else {
          throw new Error("فشل في جلب بيانات الملف الشخصي");
        }
      }
      const data: UserProfile = await res.json();
      set({ user: data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "حدث خطأ غير معروف",
        loading: false,
      });
    }
  },
}));
