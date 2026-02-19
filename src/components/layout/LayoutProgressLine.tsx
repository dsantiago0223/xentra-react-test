import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Constants';

interface LayoutProgressLineProps {
  progress: number;
  trackStyle?: StyleProp<ViewStyle>;
}

const LayoutProgressLine = ({
  progress,
  trackStyle,
}: LayoutProgressLineProps) => {
  return (
    <View style={[styles.track, trackStyle]}>
      <View
        style={[
          styles.fill,
          { width: `${Math.min(Math.max(progress, 0), 1) * 100}%` },
        ]}
      />
    </View>
  );
};

export default LayoutProgressLine;

const styles = StyleSheet.create({
  track: {
    height: 3,
    backgroundColor: Colors.grayLightest,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.black,
  },
});
