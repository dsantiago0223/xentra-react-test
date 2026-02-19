import React, { createContext, useContext, useState } from 'react';
import UIAlert from '../components/ui/UIAlert';

interface AlertOptions {
  title?: string;
  message?: string;
  okText?: string;
  cancelText?: string;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  showCancel?: boolean;
  dismissable?: boolean;
}

interface AlertContextValue {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return ctx;
};

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<AlertOptions>({});
  const [loading, setLoading] = useState(false);

  const hideAlert = () => {
    if (!loading) setVisible(false);
  };

  const showAlert = (opts: AlertOptions) => {
    setOptions({
      showCancel: true,
      ...opts,
    });
    setVisible(true);
  };

  const handleOk = async () => {
    if (!options.onOk) {
      hideAlert();
      return;
    }

    try {
      setLoading(true);
      await options.onOk();
      setVisible(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    options.onCancel?.();
    hideAlert();
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <UIAlert
        visible={visible}
        title={options.title}
        message={options.message}
        okText={options.okText}
        cancelText={options.cancelText}
        showCancel={options.showCancel}
        onOk={handleOk}
        onCancel={handleCancel}
        dismissable={options.dismissable}
        loading={loading}
      />
    </AlertContext.Provider>
  );
};
