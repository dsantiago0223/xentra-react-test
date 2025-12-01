import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

interface ActivityIndicatorContextType {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const ActivityIndicatorContext = createContext<ActivityIndicatorContextType | undefined>(undefined);

export const ActivityIndicatorProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <ActivityIndicatorContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#4A90E2" />
        </View>
      )}
    </ActivityIndicatorContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(ActivityIndicatorContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // Ensure it's on top of other content
  },
});