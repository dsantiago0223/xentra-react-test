import React from "react";
import { Text, TouchableOpacity, TouchableWithoutFeedbackProps, StyleSheet } from "react-native";
import { Colors } from '../constants/Constants';

interface Props extends TouchableWithoutFeedbackProps {
  titleText?: string;
  onPressed?: () => void;
}

const AppButton = ({titleText = "", onPressed, ...props}: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPressed} {...props}>
        <Text style={styles.buttonText}>{titleText}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.greenDark,
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
  }
});
