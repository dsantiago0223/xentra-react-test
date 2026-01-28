import React from "react";
import { View, Text, Image, StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '../constants/Constants';
import AppPressable from "./AppPressable";

type Props = {
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
};

const AppNavigationHeader = ({
  titleText = "",
  titleLogo,
  onLeftPressed,
  onRightPressed,
  leftText,
  rightText, 
  leftIsImage,
  rightIsImage, 
  containerStyle,
  titleStyle
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Left Button */}
      <AppPressable onPress={onLeftPressed} style={styles.leftButton}>
        {leftText ? <Text style={styles.sideText} numberOfLines={2} ellipsizeMode='tail'>{leftText}</Text> :  null}
        {leftIsImage ? <Ionicons name="arrow-back" size={26} color={Colors.black}/> :  null}
      </AppPressable>
      {/* Title */}
      {titleLogo ? (
        <View style={styles.titleContainer}>
            <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
            />
        </View>
      ) : (
        titleText ? (
          <View style={styles.titleContainer}>
            <Text style={[styles.title, titleStyle]} numberOfLines={2} ellipsizeMode='tail'>{titleText}</Text>
          </View>
        ) : (
          null
        )
      )}
      {/* Right Button */}
      <AppPressable onPress={onRightPressed} style={styles.rightButton}>
        {rightText ? <Text style={styles.sideText} numberOfLines={2} ellipsizeMode='tail'>{rightText}</Text> :  null}
        {rightIsImage ? <Ionicons name="close" size={26} color={Colors.black}/> :  null}
      </AppPressable>
    </View>
  );
};

export default AppNavigationHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLightest
  },
  titleContainer: {
    width: '50%',
    alignItems: 'center'
  },
  title : {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.black,
    textAlign: 'center'
  },
  logo: {
    width: 100,
    height: 46,
  },
  leftButton: {
    width: '25%',
    justifyContent: "center",
    alignItems: "flex-start",
  },
  rightButton: {
    width: '25%',
    justifyContent: "center",
    alignItems: "flex-end",
  },
  sideText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.black
  }
});
