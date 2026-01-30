import React from 'react';
import { Portal, Dialog, Button, Text } from 'react-native-paper';

interface AppAlertProps {
  visible: boolean;
  title?: string;
  message?: string;
  okText?: string;
  cancelText?: string;
  showCancel?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  dismissable?: boolean;
  loading?: boolean;
}

const AppAlert = ({
  visible,
  title,
  message,
  okText = 'OK',
  cancelText = 'Cancel',
  showCancel = true,
  onOk,
  onCancel,
  dismissable = true,
  loading = false,
}: AppAlertProps) => {
  return (
    <Portal>
      <Dialog visible={visible} dismissable={dismissable} onDismiss={onCancel}>
        {title && <Dialog.Title>{title}</Dialog.Title>}

        {message && (
          <Dialog.Content>
            <Text>{message}</Text>
          </Dialog.Content>
        )}

        <Dialog.Actions>
          {showCancel && (
            <Button onPress={onCancel} disabled={loading}>{cancelText}</Button>
          )}

          <Button onPress={onOk} loading={loading} disabled={loading}>{okText}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AppAlert;
