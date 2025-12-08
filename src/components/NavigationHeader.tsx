import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  titleText?: string;
  titleLogo?: boolean;
  onLeftPressed?: () => void;
  onRightPressed?: () => void;
};

const NavigationHeader: React.FC<Props> = ({
  titleText = "",
  titleLogo,
  onLeftPressed,
  onRightPressed,
}) => {
  return (
    <View style={styles.container}>
      {/* Left Button */}
      {onLeftPressed ? (
        <TouchableOpacity onPress={onLeftPressed} style={styles.leftButton}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
      ) : (
        null
      )}
      {/* Title */}
      {titleLogo ? (
        <View style={styles.logoContainer}>
            <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
            />
        </View>
      ) : (
        null
      )}
      {titleText ? (
        <View style={styles.logoContainer}>
            <Text style={styles.title}>{titleText}</Text>
        </View>
      ) : (
        null
      )}
      {/* Right Button */}
      {onRightPressed ? (
        <TouchableOpacity onPress={onRightPressed} style={styles.rightButton}>
          <Ionicons name="close-circle" size={22} color="#222" />
        </TouchableOpacity>
      ) : (
        null
      )}
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
  title : {
    width: "50%",
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
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
  logoContainer: {
    width: "50%",
    alignItems: "center"
  },
  logo: {
    width: 100,
    height: 46,
  }
});
