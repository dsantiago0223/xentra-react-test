import { apiClient } from '../apiClient';

type LoginResponse =  {
  success: boolean;
  user: {
    id: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    access_token: string
  }
  error: {
    key: string
    message: string
  }
}

export const login = async (params: { email: string; password: string }) => {
  try {
    const data = await apiClient.post<LoginResponse>("/login", params);
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};
