import { ApiRequest } from '../apiClient';
import { UserResponse, BalanceResponse } from '../user/UserData';

export const login = async (params: { username: string; password: string }) => {
  const requestData = { ...params, type: "MOBILE" }
  try {
    const data = await ApiRequest.post<UserResponse>('/login', requestData);
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const register = async (params: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}) => {
  try {
    const data = await ApiRequest.post<UserResponse>('/register', params);
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const logout = async () => {
  try {
    const data = await ApiRequest.post<UserResponse>('/logout', {});
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const getAccountInfo = async () => {
  try {
    const data = await ApiRequest.get<UserResponse>('/user/profile');
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const getAccountBalance = async () => {
  try {
    const data = await ApiRequest.get<BalanceResponse>('/user/balance');
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};
