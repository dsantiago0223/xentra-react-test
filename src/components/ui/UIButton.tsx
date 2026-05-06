import React from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';
import { Colors } from '../../constants';

/**
Button
style         → margin, width, bg, radius
contentStyle  → height, padding, alignment
labelStyle    → text size, weight, color
*/

type UIButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';

interface UIButtonProps extends Omit<ButtonProps, 'children'> {
  title: string;
  variant?: UIButtonVariant;
  iconPositionRight?: boolean;
}

const UIButton = ({
  title = '',
  variant = 'primary',
  style,
  contentStyle,
  labelStyle,
  iconPositionRight = false,
  disabled,
  ...props
}: UIButtonProps) => {
  const getVariantStyles = (): {
    button: ViewStyle;
    label: TextStyle;
  } => {
    switch (variant) {
      case 'secondary':
        return {
          button: {
            backgroundColor: Colors.yellowDark,
            borderColor: Colors.yellowDark,
            opacity: disabled ? 0.5 : 1,
          },
          label: { color: Colors.greenDark },
        };
      case 'tertiary':
        return {
          button: {
            backgroundColor: Colors.grayLightest,
            borderColor: Colors.grayLightest,
            opacity: disabled ? 0.6 : 1,
          },
          label: { color: Colors.grayDark },
        };
      case 'outlined':
        return {
          button: {
            backgroundColor: Colors.transparent,
            borderColor: Colors.greenDark,
            opacity: disabled ? 0.5 : 1,
          },
          label: { color: Colors.greenDark },
        };
      case 'primary':
      default:
        return {
          button: {
            backgroundColor: Colors.greenDark,
            borderColor: Colors.greenDark,
            opacity: disabled ? 0.8 : 1,
          },
          label: { color: Colors.white },
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Button
      mode={variant === 'outlined' ? 'outlined' : 'contained'}
      uppercase={false}
      style={[styles.buttonStyle, variantStyles.button, style]}
      contentStyle={[
        styles.contentStyle,
        contentStyle,
        iconPositionRight
          ? styles.contentStyleIconRight
          : styles.contentStyleIconLeft,
      ]}
      labelStyle={[styles.labelStyle, variantStyles.label, labelStyle]}
      {...props}
    >
      {title}
    </Button>
  );
};

export default UIButton;

const styles = StyleSheet.create({
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 12,
  },
  contentStyle: {
    height: 50,
    flexDirection: 'row',
  },
  contentStyleIconRight: {
    flexDirection: 'row-reverse',
  },
  contentStyleIconLeft: {
    flexDirection: 'row',
  },
  labelStyle: {
    fontSize: 16,
  },
});
