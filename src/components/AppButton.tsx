import React from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';
import { Colors, Fonts } from '../constants/Constants';

/**
Button
style         → margin, width, bg, radius
contentStyle  → height, padding, alignment
labelStyle    → text size, weight, color
*/

type AppButtonVariant = 'primary-1' | 'primary-2' | 'secondary' | 'tertiary';
interface AppButtonProps extends Omit<ButtonProps, 'children'> {
  title: string;
  variant?: AppButtonVariant;
  iconPositionRight?: boolean;
}

const AppButton = ({
  title = "", 
  variant = 'primary-1',
  style,
  contentStyle,
  labelStyle,
  iconPositionRight = false,
  ...props}: AppButtonProps) => {
  
  const getVariantStyles = (): {
    button: ViewStyle;
    label: TextStyle;
  } => {
    switch (variant) {
      case 'primary-2':
        return {
          button: { backgroundColor: Colors.greenDark },
          label: { color: Colors.yellowDark },
        };
      case 'secondary':
        return {
          button: { backgroundColor: Colors.yellowDark },
          label: { color: Colors.greenDark },
        };
      case 'tertiary':
        return {
          button: { backgroundColor: Colors.grayLightest },
          label: { color: Colors.grayDark },
        };
    case 'primary-1':
      default:
        return {
          button: { backgroundColor: Colors.greenDark },
          label: { color: Colors.white },
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Button
    mode={'contained'}
    uppercase={false}
    style={[styles.buttonStyle, variantStyles.button, style]}
    contentStyle={[styles.contentStyle, contentStyle, iconPositionRight ? styles.contentStyleIconRight : styles.contentStyleIconLeft]}
    labelStyle={[styles.labelStyle, variantStyles.label, labelStyle]}
    {...props}>
      {title}
    </Button>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 25,
  },
  contentStyle: {
    height: 50,
    flexDirection: 'row'
  },
  contentStyleIconRight: {
    flexDirection: 'row-reverse'
  },
  contentStyleIconLeft: {
    flexDirection: 'row'
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: Fonts.bold
  }
});
