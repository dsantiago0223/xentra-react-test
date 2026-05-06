import React from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Button, ButtonProps, ActivityIndicator } from 'react-native-paper';
import { Colors } from '../../constants';

/**
Button
style         → margin, width, bg, radius
contentStyle  → height, padding, alignment
labelStyle    → text size, weight, color
*/

type UIButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';

interface UIButtonProps extends Omit<ButtonProps, 'children' | 'onPress'> {
  title: string;
  variant?: UIButtonVariant;
  iconPositionRight?: boolean;
  loading?: boolean;

  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;

  onPress?: () => void;
}

const UIButton = ({
  title = '',
  variant = 'primary',
  style,
  contentStyle,
  labelStyle,
  iconPositionRight = false,
  disabled,
  loading = false,
  onPress,
  ...props
}: UIButtonProps) => {
  const getVariantStyles = (): {
    button: ViewStyle;
    label: TextStyle;
    loaderColor: string;
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
          loaderColor: Colors.greenDark,
        };
      case 'tertiary':
        return {
          button: {
            backgroundColor: Colors.grayLightest,
            borderColor: Colors.grayLightest,
            opacity: disabled ? 0.6 : 1,
          },
          label: { color: Colors.grayDark },
          loaderColor: Colors.grayDark,
        };
      case 'outlined':
        return {
          button: {
            backgroundColor: Colors.transparent,
            borderColor: Colors.greenDark,
            opacity: disabled ? 0.5 : 1,
          },
          label: { color: Colors.greenDark },
          loaderColor: Colors.greenDark,
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
          loaderColor: Colors.white,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const isDisabled = disabled || loading;

  return (
    <View style={[styles.wrapper, style]}>
      <Button
        mode={variant === 'outlined' ? 'outlined' : 'contained'}
        uppercase={false}
        disabled={isDisabled}
        onPress={onPress}
        style={[styles.buttonStyle, variantStyles.button]}
        contentStyle={[
          styles.contentStyle,
          contentStyle,
          iconPositionRight
            ? styles.contentStyleIconRight
            : styles.contentStyleIconLeft,
        ]}
        labelStyle={[
          styles.labelStyle,
          variantStyles.label,
          labelStyle,
          loading && styles.hiddenLabel,
        ]}
        {...props}
      >
        {title}
      </Button>

      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator
            animating={true}
            color={variantStyles.loaderColor}
          />
        </View>
      )}
    </View>
  );
};

export default UIButton;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 12,
  },
  contentStyle: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  hiddenLabel: {
    opacity: 0,
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
