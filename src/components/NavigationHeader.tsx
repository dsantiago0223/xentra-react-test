import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  titleText?: string;
  titleLogo?: boolean;
  onLeftPressed?: () => void;
  onRightPressed?: () => void;
  leftText?: string;
  rightText?: string;
  leftIsImage?: boolean
  rightIsImage?: boolean
  
};

const NavigationHeader: React.FC<Props> = ({
  titleText = "",
  titleLogo,
  onLeftPressed,
  onRightPressed,
  leftText,
  rightText, 
  leftIsImage,
  rightIsImage
}) => {
  return (
    <View style={styles.container}>
      {/* Left Button */}
      <TouchableOpacity onPress={onLeftPressed} style={styles.leftButton}>
        {leftText ? <Text style={styles.sideText}>{leftText}</Text> :  null}
        {leftIsImage ? <Ionicons name="chevron-back" size={24} color="#222"/> :  null}
      </TouchableOpacity>
      {/* Title */}
      {titleLogo ? (
        <View style={styles.titleContainer}>
            <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
            />
        </View>
      ) : (
        titleText ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{titleText}</Text>
          </View>
        ) : (
          null
        )
      )}
      {/* Right Button */}
      <TouchableOpacity onPress={onRightPressed} style={styles.rightButton}>
        {rightText ? <Text style={styles.sideText}>{rightText}</Text> :  null}
        {rightIsImage ? <Ionicons name="close-circle" size={24} color="#222"/> :  null}
      </TouchableOpacity>
    </View>
  );
};

export default NavigationHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  titleContainer: {
    width: "50%",
    alignItems: "center"
  },
  title : {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  logo: {
    width: 100,
    height: 46,
  },
  leftButton: {
    width: "25%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  rightButton: {
    width: "25%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  sideText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
