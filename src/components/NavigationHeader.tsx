import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  title?: string;
  onBack?: () => void;
  onRightPress?: () => void;
};

const NavigationHeader: React.FC<Props> = ({
  title = "",
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
      <Text style={styles.title}>
        {title}
      </Text>

      {/* Right Button */}
      {onRightPress ? (
        <TouchableOpacity onPress={onRightPress}>
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
    textAlign: 'center'
  },
  leftButton : {
    marginRight: 16
  },
  leftEmptyButton: {
    width: 24,
    marginRight: 16
  },
  rightEmptyButton: {
    width: 24
  }
});
