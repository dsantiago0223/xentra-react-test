import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants/Constants';

interface AppListSeparatorProps {
  color?: string;
}

const AppListSeparator = ({color = Colors.grayLightest}: AppListSeparatorProps) => {
    return <View style={[styles.separator, { backgroundColor: color }]} />;
};

export default AppListSeparator

const styles = StyleSheet.create({
  separator: {
    height: 0.8, 
    width: '100%'
  }
});