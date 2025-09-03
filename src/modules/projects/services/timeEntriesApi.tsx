// modules/timesheets/services/timeEntriesApi.ts
import { TimeEntry } from "../types/projects";

// في الواقع، سيتم استبدال هذا بطلبات فعلية إلى API
export const timeEntriesApi = {
  getAll: async (): Promise<TimeEntry[]> => {
    // محاكاة طلب API
    return Promise.resolve(mockTimeEntries);
  },

  getById: async (id: string): Promise<TimeEntry | null> => {
    // محاكاة طلب API
    const entry = mockTimeEntries.find((entry) => entry.id === id);
    return Promise.resolve(entry || null);
  },

  create: async (entry: Omit<TimeEntry, "id">): Promise<TimeEntry> => {
    // محاكاة طلب API
    const newEntry = { ...entry, id: Date.now().toString() };
    return Promise.resolve(newEntry);
  },

  update: async (
    id: string,
    updates: Partial<TimeEntry>
  ): Promise<TimeEntry> => {
    // محاكاة طلب API
    const updatedEntry = {
      ...mockTimeEntries.find((e) => e.id === id),
      ...updates,
    } as TimeEntry;
    return Promise.resolve(updatedEntry);
  },

  delete: async (id: string): Promise<boolean> => {
    // محاكاة طلب API
    return Promise.resolve(true);
  },
};

// Mock data
const mockTimeEntries: TimeEntry[] = [
  // نفس البيانات السابقة
];
