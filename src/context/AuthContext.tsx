import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { login, register, logout } from '../api/user/User';
import { save, get, remove } from '../utils/AppStorage';
import { delay } from '../utils/Utils';

type AuthContextType = {
  accessToken: string | null;
  loading: boolean;
  loginUser: (params: { email: string, password: string }) => Promise<any>;
  registerUser: (params: { firstName: string, lastName: string, phoneNumber: string, email: string, password: string }) => Promise<any>;
  logoutUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  loading: true,
  loginUser: async () => {},
  registerUser: async () => {},
  logoutUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load token when app starts
  useEffect(() => {
    const loadToken = async () => {
      const token = await get("accessToken");
      if (token) setAccessToken(token);
      setLoading(false);
    };
    loadToken();
  }, []);

// Login
const loginUser = async (params: { email: string, password: string }) => {
    /*const { data, error } = await login(params);
    if (data) {
      const token = data.user.access_token;
      await save("accessToken", token);  
      setAccessToken(token);
      return { data, error: null };
    } else {
        return { data: null, error };
    }*/
    await delay(1000);
    const data = {
        "success": true,
        "user": {
            "id": "232323",
            "first_name": "Dave",
            "last_name": "Santiago",
            "phone_number": "09172323252",
            "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjMxMjViZmJkZWFkMTVmN2NkMmRlZGE4NmFkNjk3NjkxIn0.eyJpYXQiOjE2NTAwMzUzMzIsImV4cCI6MTY1MDAzODkzMiwiaWQiOjEsIm5hbWUiOiJKb2huIERvZSJ9."
        },
        "error": null
      }
      const token = data.user.access_token;
      await save("accessToken", token);  
      setAccessToken(token);
      return { data, error: null };
};

  // Signup
  const registerUser = async (params: { firstName: string, lastName: string, phoneNumber: string, email: string, password: string }) => {
    const { data, error } = await register(params);
    if (data) {
      const token = data.user.access_token;
      await save("accessToken", token);  
      setAccessToken(token);
      return { data, error: null };
    } else {
      return { data: null, error };
    }
  };

  // Logout
  const logoutUser = async () => {
    setAccessToken(null);
    await remove("accessToken");
    await logout();
  };

  return (
    <AuthContext.Provider value={{ accessToken, loading, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
