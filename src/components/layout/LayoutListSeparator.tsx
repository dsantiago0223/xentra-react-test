import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Constants';

interface LayoutListSeparatorProps {
  color?: string;
}

const LayoutListSeparator = ({
  color = Colors.grayLightest,
}: LayoutListSeparatorProps) => {
  return <View style={[styles.separator, { backgroundColor: color }]} />;
};

export default LayoutListSeparator;

const styles = StyleSheet.create({
  separator: {
    height: 0.8,
    width: '100%',
  },
});
