import { ApiRequest } from '../ApiRequest';

type UserResponse =  {
  success: boolean;
  user: {
    id: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    access_token: string
  }
}

export const login = async (params: { email: string, password: string }) => {
  try {
    const data = await ApiRequest.post<UserResponse>("/login", params);
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const register = async (params: { email: string, password: string }) => {
  try {
    const data = await ApiRequest.post<UserResponse>("/register", params);
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};
