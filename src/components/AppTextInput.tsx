import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, TextInputProps, HelperText, Text } from 'react-native-paper';
import { Colors, Fonts } from '../constants/Constants';

/**
Text Input
style        → background, margin, width, fontSize
contentStyle → height, padding
outlineStyle → borderRadius, borderWidth
*/

type AppTextInputInputVariant = 'default' | 'error';

interface AppTextInputProps extends Omit<TextInputProps, 'children'> {
  titleText: string;
  variant?: AppTextInputInputVariant;
  errorText?: string;
  clearable?: boolean;
}

const AppTextInput = ({
  titleText,
  variant = 'default',
  errorText,
  clearable = false,
  style,
  right,
  value,
  onChangeText,
  secureTextEntry,
  onBlur,
  ...props
}: AppTextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = secureTextEntry;

  const inputContainerStyle = {
    backgroundColor: Colors.grayLightest,
    borderRadius: 16,
    borderColor: isFocused ? Colors.greenLight : 'transparent',
    borderWidth: 1
  };

  const handleInternalBlur = (e: any) => {
    setIsFocused(false)
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={inputContainerStyle}>
        <Text style={styles.titleText}>{titleText}</Text>
        <TextInput
        mode='outlined'
        placeholderTextColor={Colors.grayMedium}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={handleInternalBlur} 
        secureTextEntry={isPassword && !passwordVisible}
        error={variant === 'error'}
        activeOutlineColor="transparent"
        outlineColor="transparent"
        outlineStyle={styles.inputOutlineStyle}
        style={[styles.inputStyle, style]}
        contentStyle={styles.inputContentStyle}
        cursorColor={Colors.greenDark}
        textColor={Colors.grayDark}
        right={
          isPassword ? (
            <TextInput.Icon
            icon={passwordVisible ? 'eye-off' : 'eye'}
            accessibilityLabel="Toggle password visibility"
            color={Colors.greenDark}
            onPress={() => setPasswordVisible(!passwordVisible)}
            /> 
          ) : (
            clearable && !!value && !props.disabled ? (
              <TextInput.Icon
              icon="close"
              color={Colors.greenDark}
              accessibilityLabel="Clear text"
              onPress={() => onChangeText?.('')}
              />
            ) : (
              right
            )
          ) 
        }
        {...props}
        />
      </View>
      {variant === 'error' && errorText && (
        <HelperText type="error" visible>
          {errorText}
        </HelperText>
      )}
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  titleText: {
    backgroundColor: 'transparent',
    fontSize: 15,
    fontFamily: Fonts.medium,
    color: Colors.greenDark,
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16
  },
  inputStyle: {
    backgroundColor: 'transparent',
    marginBottom: 8
  },
  inputContentStyle: {
    paddingLeft: 16,
    fontSize: 17,
    fontFamily: Fonts.regular
  },
  inputOutlineStyle: {
    borderWidth: 0 
  }
});
 
