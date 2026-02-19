import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

interface LayoutPressableProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  disabled?: boolean;
  activeOpacity?: number;
}

const LayoutPressable = ({
  children,
  onPress,
  style,
  disabled = false,
  activeOpacity = 0.6,
}: LayoutPressableProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        pressed && !disabled && { opacity: activeOpacity },
        disabled && styles.disabled,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
};

export default LayoutPressable;

const styles = StyleSheet.create({
  base: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.4,
  },
});
