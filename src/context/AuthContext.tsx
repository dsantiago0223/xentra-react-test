import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { login, register, logout } from '../api/user/User';
import { save, get, remove } from '../utils/AppStorage';
import { delay } from '../utils/Utils';

type AuthContextType = {
  accessToken: string | null;
  loading: boolean;
  authedUserDidSignUp: boolean;
  loginUser: (params: { email: string; password: string }) => Promise<any>;
  createNewUser: (params: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
  }) => Promise<any>;
  createNewUserFlowComplete: () => void;
  logoutUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  loading: true,
  authedUserDidSignUp: false,
  loginUser: async () => {},
  createNewUser: async () => {},
  createNewUserFlowComplete: () => {},
  logoutUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authedUserDidSignUp, setAuthedUserDidSignUp] = useState(false);

  // Load token when app starts
  useEffect(() => {
    const loadToken = async () => {
      const token = await get('accessToken');
      if (token) setAccessToken(token);
      setLoading(false);
    };
    loadToken();
  }, []);

  // Login
  const loginUser = async (params: { email: string; password: string }) => {
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
    };
    await save('accessToken', '<ACCESS_TOKEN_HERE>');
    setAccessToken('<ACCESS_TOKEN_HERE>');
    return { data, error: null };
  };

  // Sign Up
  const createNewUser = async (params: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
  }) => {
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
    };
    await save('accessToken', '<ACCESS_TOKEN_HERE>');
    setAccessToken('<ACCESS_TOKEN_HERE>');
    setAuthedUserDidSignUp(true);
    return { data, error: null };
  };

  const createNewUserFlowComplete = () => {
    setAuthedUserDidSignUp(false);
  }

  // Logout
  const logoutUser = async () => {
    setAccessToken(null);
    await remove('accessToken');
    //await logout();
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, loading, authedUserDidSignUp, loginUser, createNewUser, createNewUserFlowComplete, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
