import React, { useState } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, Image } from 'react-native';
import {
  TextInput,
  TextInputProps,
  HelperText,
  Text,
  useTheme,
} from 'react-native-paper';
import { Colors, Fonts } from '../../constants/Constants';

/**
Text Input
style        → background, margin, width, fontSize
contentStyle → height, padding
outlineStyle → borderRadius, borderWidth
*/

type UIPhoneNumberInputVariant = 'default' | 'error';

interface UIPhoneNumberInputProps extends Omit<TextInputProps, 'children'> {
  titleText: string;
  variant?: UIPhoneNumberInputVariant;
  errorText?: string;
  clearable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const UIPhoneNumberInput = ({
  titleText,
  variant = 'default',
  errorText,
  clearable = false,
  containerStyle,
  style,
  right,
  value,
  onChangeText,
  onBlur,
  ...props
}: UIPhoneNumberInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
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
      <View style={styles.content}>
        <View style={styles.mobilePrefixContainer}>
          <Image
            style={styles.flag}
            source={require('../../../assets/flags/sn.png')}
          />
          <Text style={styles.mobilePrefixText}>+221</Text>
        </View>
        <TextInput
          mode="outlined"
          keyboardType="phone-pad"
          placeholderTextColor={Colors.grayMedium}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={handleInternalBlur}
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

export default UIPhoneNumberInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
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
    flex: 1,
    backgroundColor: '#EFF6F3',
    marginBottom: 8,
  },
  inputContentStyle: {
    paddingLeft: 16,
    fontSize: 17,
    fontFamily: Fonts.regular,
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: 8,
  },
  mobilePrefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#EFF6F3',
    marginRight: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  mobilePrefixText: {
    fontSize: 17,
    fontFamily: Fonts.regular,
    color: Colors.grayDark,
  },
});
