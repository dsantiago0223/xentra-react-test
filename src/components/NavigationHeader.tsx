import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  title?: string;
  titleLogo?: boolean;
  onBack?: () => void;
  onRightPress?: () => void;
};

const NavigationHeader: React.FC<Props> = ({
  title = "",
  titleLogo,
  onBack,
  onRightPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Left Button */}
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.leftButton}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
      ) : (
        <View style={styles.leftEmptyButton} />
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
        <Text style={styles.title}>{title}</Text>
      )}
      {/* Right Button */}
      {onRightPress ? (
        <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
          <Ionicons name="close-circle" size={22} color="#222" />
        </TouchableOpacity>
      ) : (
        <View style={styles.rightEmptyButton} />
      )}
    </View>
  );
};

export default NavigationHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 56,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title : {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    textAlign: 'center',
    backgroundColor: "blue"
  },
  leftButton : {
    marginRight: 16
  },
  rightButton : {
    marginLeft: 16
  },
  leftEmptyButton: {
    width: 24,
    marginRight: 16
  },
  rightEmptyButton: {
    width: 24,
    marginLeft: 16
  },
  logoContainer: {
    flex: 1,
    alignItems: "center"
  },
  logo: {
    width: 46,
    height: 46,
  },
});
