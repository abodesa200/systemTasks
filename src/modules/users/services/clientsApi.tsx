// modules/clients/services/clientsApi.ts
import { Client, ClientFormValues } from "../types/usersType";

// Mock data
const mockClients: Client[] = [
  {
    id: "1",
    name: "أحمد السعدي",
    email: "ahmed@alsaudi.com",
    phone: "+966512345678",
    company: "شركة السعدي للتجارة",
    status: "active",
    type: "corporate",
    industry: "التجارة",
    address: "الرياض، حي العليا",
    joinDate: "2023-05-15",
    creditLimit: 50000,
    totalSpent: 125000,
    lastPurchase: "2024-03-18",
  },
  // ... باقي البيانات
];

export const clientsApi = {
  getAll: async (): Promise<Client[]> => {
    // محاكاة طلب API
    return Promise.resolve(mockClients);
  },

  getById: async (id: string): Promise<Client | null> => {
    const client = mockClients.find((client) => client.id === id);
    return Promise.resolve(client || null);
  },

  create: async (clientData: ClientFormValues): Promise<Client> => {
    const newClient: Client = {
      ...clientData,
      id: (mockClients.length + 1).toString(),
      totalSpent: 0,
      lastPurchase: "",
    } as Client;
    return Promise.resolve(newClient);
  },

  update: async (id: string, updates: Partial<Client>): Promise<Client> => {
    const updatedClient = {
      ...mockClients.find((c) => c.id === id),
      ...updates,
    } as Client;
    return Promise.resolve(updatedClient);
  },

  delete: async (id: string): Promise<boolean> => {
    return Promise.resolve(true);
  },
};
