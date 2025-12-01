import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { login, register } from '../api/user/User';
import { getAccessToken, removeAccessToken } from '../api/user/UserDataStore'

type AuthContextType = {
  accessToken: string | null;
  loading: boolean;
  loginUser: (params: { email: string, password: string }) => Promise<any>;
  registerUser: (params: { email: string, password: string }) => Promise<any>;
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
      const token = await getAccessToken();
      if (token) setAccessToken(token);
      setLoading(false);
    };
    loadToken();
  }, []);

// Login
const loginUser = async (params: { email: string, password: string }) => {
    const { data, error } = await login(params);
    if (data) {
        setAccessToken(data.user.access_token);
        return { data, error: null };
    } else {
        return { data: null, error };
    }
};

  // Signup
  const registerUser = async (params: { email: string, password: string }) => {
    const { data, error } = await register(params);
    if (data) {
        setAccessToken(data.user.access_token);
        return { data, error: null };
    } else {
        return { data: null, error };
    }
  };

  // Logout
  const logoutUser = async () => {
    await removeAccessToken()
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, loading, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
