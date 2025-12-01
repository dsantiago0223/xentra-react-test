import { ApiClient } from '../ApiClient';
import { saveAccessToken } from './UserDataStore'

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
    const data = await ApiClient.post<UserResponse>("/login", params);
    await saveAccessToken(data.user.access_token)
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const register = async (params: { email: string, password: string }) => {
  try {
    const data = await ApiClient.post<UserResponse>("/register", params);
    await saveAccessToken(data.user.access_token)
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};
