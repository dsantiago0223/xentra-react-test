import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { login, register } from '../api/user/User';
import { storage } from '../utils/appStorage_';
//import { delay } from '../utils/Utils';
import { User } from '../api/user/UserData';
import { Keys } from '../constants/DataStoreKeys';

type AuthContextType = {
  accessToken: string | null;
  authedUser: User | null;
  loading: boolean;
  loginUser: (params: { username: string; password: string }) => Promise<any>;
  createNewUser: (params: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
  }) => Promise<any>;
  logoutUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  authedUser: null,
  loading: true,
  loginUser: async () => {},
  createNewUser: async () => {},
  logoutUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authedUser, setAuthedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadUserData = async () => {
      const token = await storage.get(Keys.ACCESS_TOKEN);
      if (token) setAccessToken(token);

      const storedUser = await storage.get(Keys.USER);
      if (storedUser) setAuthedUser(JSON.parse(storedUser));

      setLoading(false);
    };

    loadUserData();
  }, []);

  const loginUser = async (params: { username: string; password: string }) => {
    const { data, error } = await login(params);
    if (data) {
      const userData = { account: data.account, address: data.address }

      await storage.save(Keys.ACCESS_TOKEN, data.token);
      await storage.save(Keys.USER, JSON.stringify(userData));
      
      setAccessToken(data.token);
      setAuthedUser(userData);
      
      return { data, error: null };
    } else {
      return { data: null, error };
    }
  };

  const createNewUser = async (params: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
  }) => {
    const { data, error } = await register(params);
    if (data) {
      const userData = { account: data.account, address: data.address }

      await storage.save(Keys.ACCESS_TOKEN, data.token);
      await storage.save(Keys.USER, JSON.stringify(userData));
      
      setAccessToken(data.token);
      setAuthedUser(userData);
      setAuthedUserDidSignUp(true);
      
      return { data, error: null };
    } else {
      return { data: null, error };
    }
    //await delay(1000);
  };

  // Logout
  const logoutUser = async () => {
    setAccessToken(null);
    setAuthedUser(null);
    
    await storage.remove(Keys.ACCESS_TOKEN);
    await storage.remove(Keys.USER);
    //await logout();
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        authedUser,
        loading,
        loginUser,
        createNewUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
