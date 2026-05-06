import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Platform } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Colors } from '../../constants';

interface UICheckboxProps {
  value: boolean;
  onChange: (checked: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

const UICheckbox = ({ value, onChange, style }: UICheckboxProps) => {
  return (
    <View style={[styles.container, style]}>
      <Checkbox
        status={value ? 'checked' : 'unchecked'}
        onPress={() => onChange(!value)}
        uncheckedColor={Colors.greenDark}
      />
    </View>
  );
};

export default UICheckbox;

const styles = StyleSheet.create({
  container: {
    transform: [{ scale: Platform.OS === 'ios' ? 0.7 : 1 }],
    borderColor: Platform.OS === 'ios' ? Colors.grayMedium : Colors.transparent,
    borderWidth: 1,
    borderRadius: 12,
  },
});
