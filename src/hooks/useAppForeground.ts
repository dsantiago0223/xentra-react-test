import { useCallback, useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

export default function useAppForeground(callback: () => void): void {
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      const wasInBackground =
        appStateRef.current === "inactive" ||
        appStateRef.current === "background";

      if (wasInBackground && nextAppState === "active") {
        callback();
      }

      appStateRef.current = nextAppState;
    },
    [callback]
  );

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);
}