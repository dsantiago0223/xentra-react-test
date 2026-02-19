import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

type BackHandlerFn = () => boolean;

export function useAndroidBackHandler(onBackPress: BackHandlerFn) {
  useFocusEffect(
    useCallback(() => {
      const handler = () => onBackPress();

      const sub = BackHandler.addEventListener('hardwareBackPress', handler);

      return () => sub.remove();
    }, [onBackPress]),
  );
}

export function useDefaultAndroidBackHandler(navigation: any) {
  useAndroidBackHandler(
    useCallback(() => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    }, [navigation]),
  );
}
