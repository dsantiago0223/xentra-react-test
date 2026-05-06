import React, { useState } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import {
  TextInput,
  TextInputProps,
  HelperText,
  Text,
  useTheme,
} from 'react-native-paper';
import { Colors, Fonts } from '../../constants';

/**
Text Input
style        → background, margin, width, fontSize
contentStyle → height, padding
outlineStyle → borderRadius, borderWidth
*/

type UITextInputVariant = 'default' | 'error';

interface UITextInputProps extends Omit<TextInputProps, 'children'> {
  titleText: string;
  variant?: UITextInputVariant;
  errorText?: string;
  clearable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const UITextInput = ({
  titleText,
  variant = 'default',
  errorText,
  clearable = false,
  containerStyle,
  style,
  right,
  value,
  onChangeText,
  secureTextEntry,
  onBlur,
  ...props
}: UITextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = secureTextEntry;
  const theme = useTheme();

  const inputOutlineStyle = {
    borderRadius: 12,
    borderColor: isFocused
      ? Colors.greenLight
      : variant === 'error'
      ? theme.colors.error
      : 'transparent',
    borderWidth: 1,
  };

  const handleInternalBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.titleText}>{titleText}</Text>
      <TextInput
        mode="outlined"
        placeholderTextColor={Colors.grayMedium}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={handleInternalBlur}
        secureTextEntry={isPassword && !passwordVisible}
        error={variant === 'error'}
        activeOutlineColor="transparent"
        outlineColor="transparent"
        outlineStyle={inputOutlineStyle}
        style={[styles.inputStyle, style]}
        contentStyle={styles.inputContentStyle}
        cursorColor={Colors.grayDark}
        selectionColor={Colors.grayDark}
        textColor={Colors.grayDark}
        right={
          isPassword ? (
            <TextInput.Icon
              icon={passwordVisible ? 'eye-off' : 'eye'}
              accessibilityLabel="Toggle password visibility"
              color={Colors.greenDark}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          ) : clearable && !!value && !props.disabled ? (
            <TextInput.Icon
              icon="close"
              color={Colors.greenDark}
              accessibilityLabel="Clear text"
              onPress={() => onChangeText?.('')}
            />
          ) : (
            right
          )
        }
        {...props}
      />
      {variant === 'error' && errorText && (
        <HelperText type="error" visible>
          {errorText}
        </HelperText>
      )}
    </View>
  );
};

export default UITextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  titleText: {
    backgroundColor: 'transparent',
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.greenDark,
    marginTop: 8,
    marginBottom: 5,
    paddingHorizontal: 2,
  },
  inputStyle: {
    backgroundColor: '#EFF6F3',
    marginBottom: 8,
  },
  inputContentStyle: {
    paddingLeft: 16,
    fontSize: 17,
    fontFamily: Fonts.regular,
  },
});
