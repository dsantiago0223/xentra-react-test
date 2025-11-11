import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface PasswordTextEntryProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const PasswordTextEntry: React.FC<PasswordTextEntryProps> = ({
  value,
  onChangeText,
  placeholder = 'Password',
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChangeText}
      />
      
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Icon
          name={showPassword ? 'eye-off' : 'eye'}
          size={22}
          color="#4A90E2"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordTextEntry;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#000',
    fontSize: 16,
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
