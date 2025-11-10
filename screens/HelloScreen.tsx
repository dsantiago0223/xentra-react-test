import { StyleSheet, Text } from 'react-native';

const HelloScreen = () => {
  return (
     <Text style={styles.text}>Hello Dave! 🎉</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 42
  }
});

export default HelloScreen;