import React, { createContext, useState, ReactNode } from 'react';

type SignUpData = {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
};

type SignUpContextType = {
  data: SignUpData;
  updateData: (values: Partial<SignUpData>) => void;
  reset: () => void;
};

export const SignUpContext = createContext<SignUpContextType>(
  {} as SignUpContextType,
);

export const SignUpProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<SignUpData>({phoneNumber: '', firstName: '', lastName: '', email: ''});

  const updateData = (values: Partial<SignUpData>) => {
    setData(prev => ({ ...prev, ...values }));
  };

  const reset = () => setData({phoneNumber: '', firstName: '', lastName: '', email: ''});

  return (
    <SignUpContext.Provider value={{ data, updateData, reset }}>
      {children}
    </SignUpContext.Provider>
  );
};
