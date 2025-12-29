import React, { useState } from 'react';
import { View, TextInput, TextInputProps, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props extends TextInputProps  {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  isPassword?: boolean;
  iconName?: string;
}

const TextEntryControl = ({
  value,
  onChangeText,
  placeholder = '',
  isPassword = false,
  iconName = "",
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#888"
      secureTextEntry={isPassword && !showPassword}
      value={value}
      onChangeText={onChangeText}
      {...props}
      />

      {isPassword && (
        <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
          name={showPassword ? 'eye-off' : 'eye'}
          size={22}
          color="#4A90E2"
          />
        </TouchableOpacity>
      )}

      {iconName !== "" && (
        <View style={styles.iconContainer}>
          <MaterialIcons
          name={iconName}
          size={22}
          color="#4A90E2"
          />
        </View>
      )}
    </View>
  );
};

export default TextEntryControl;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 16
  },
  input: {
    flex: 1,
    height: 50,
    color: '#000',
    fontSize: 16
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
});
