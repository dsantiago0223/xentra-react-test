import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '../../constants';
import LayoutPressable from './LayoutPressable';

interface LayoutNavigationHeaderProps {
  titleText?: string;
  titleLogo?: boolean;
  onLeftPressed?: () => void;
  onRightPressed?: () => void;
  leftText?: string;
  rightText?: string;
  leftIsImage?: boolean;
  rightIsImage?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  withSeparator?: boolean;
}

const LayoutNavigationHeader = ({
  titleText = '',
  titleLogo,
  onLeftPressed,
  onRightPressed,
  leftText,
  rightText,
  leftIsImage,
  rightIsImage,
  containerStyle,
  titleStyle,
  withSeparator = true,
}: LayoutNavigationHeaderProps) => {
  return (
    <View
      style={[
        withSeparator ? styles.containerWithSeparator : styles.container,
        containerStyle,
      ]}
    >
      {/* Left Button */}
      <LayoutPressable onPress={onLeftPressed} style={styles.leftButton}>
        {leftText ? (
          <Text style={styles.sideText} numberOfLines={2} ellipsizeMode="tail">
            {leftText}
          </Text>
        ) : null}
        {leftIsImage ? (
          <Ionicons name="arrow-back" size={26} color={Colors.black} />
        ) : null}
      </LayoutPressable>
      {/* Title */}
      {titleLogo ? (
        <View style={styles.titleContainer}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      ) : titleText ? (
        <View style={styles.titleContainer}>
          <Text
            style={[styles.title, titleStyle]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {titleText}
          </Text>
        </View>
      ) : null}
      {/* Right Button */}
      <LayoutPressable onPress={onRightPressed} style={styles.rightButton}>
        {rightText ? (
          <Text style={styles.sideText} numberOfLines={2} ellipsizeMode="tail">
            {rightText}
          </Text>
        ) : null}
        {rightIsImage ? (
          <Ionicons name="close" size={26} color={Colors.black} />
        ) : null}
      </LayoutPressable>
    </View>
  );
};

export default LayoutNavigationHeader;

const styles = StyleSheet.create({
  containerWithSeparator: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLightest,
  },
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  titleContainer: {
    width: '50%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.black,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 46,
  },
  leftButton: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightButton: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  sideText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.black,
  },
});
