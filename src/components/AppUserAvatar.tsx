import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Colors } from '../constants/Constants';

interface AppUserAvatarProps {
  imageUrl?: string;
  size?: number;
  onPress?: () => void;
}

const AppUserAvatar = ({imageUrl, size = 100, onPress}: AppUserAvatarProps) => {
  if (imageUrl === null || imageUrl === undefined || imageUrl === '') {
    return <Avatar.Icon size={size} icon="account" onTouchEnd={onPress} />;
  } else {
    return <Avatar.Image source={{ uri: imageUrl }} size={size} style={styles.avatarImage} onTouchEnd={onPress}/>;
  }
};

export default AppUserAvatar;

const styles = StyleSheet.create({
  avatarImage: {
    backgroundColor: Colors.grayLightest
  }
});