import { apiClient } from '../apiClient';


export const login = async (params: { email: string; password: string }) => {
  try {
    const data = await apiClient.post("/login", params);
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};
