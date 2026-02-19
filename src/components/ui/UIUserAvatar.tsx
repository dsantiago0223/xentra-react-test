import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Colors } from '../../constants/Constants';

interface UIUserAvatarProps {
  imageUrl?: string;
  size?: number;
  onPress?: () => void;
}

const UIUserAvatar = ({ imageUrl, size = 100, onPress }: UIUserAvatarProps) => {
  if (imageUrl === null || imageUrl === undefined || imageUrl === '') {
    return <Avatar.Icon size={size} icon="account" onTouchEnd={onPress} />;
  } else {
    return (
      <Avatar.Image
        source={{ uri: imageUrl }}
        size={size}
        style={styles.avatarImage}
        onTouchEnd={onPress}
      />
    );
  }
};

export default UIUserAvatar;

const styles = StyleSheet.create({
  avatarImage: {
    backgroundColor: Colors.grayLightest,
  },
});
