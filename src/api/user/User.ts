import ApiRequest from '../ApiRequest';

type LoginRequest = {
    email: string;
    password: string;
};

type LoginResponse = {
    success: boolean;
    user: {
        id: string;
        first_name: string;
        last_name: string;
        phone_number: string;
        access_token: string;
    };
    error: {
        key: boolean;
        message: string;
    };
};

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await ApiRequest.post<LoginResponse>('/login', data);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await ApiRequest.get('/users');
  return response.data;
};
