// services/tasksApi.ts
import axios from "axios";
import { TaskFormValues } from "../features/addOrUpdateTask/useAddOrUpdateTask";

const API_URL = "/api/tasks"; // عدل حسب الباك

const tasksApi = {
  createTask: async (data: TaskFormValues) => {
    const res = await axios.post(API_URL, data);
    return res.data;
  },

  updateTask: async (id: string, data: TaskFormValues) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  },

  getTask: async (id: string) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  deleteTask: async (id: string) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  },
};

export default tasksApi;
