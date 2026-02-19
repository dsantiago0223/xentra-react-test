import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import { Colors, Fonts } from '../../constants/Constants';

type Props = {
  leftIcon?: string;
  title?: string;
  description?: string;
  amount?: string;
  onPress?: () => void;
};

const HomeTransactionListItem = ({
  title = '',
  description = '',
  amount = '+$0.00',
  leftIcon,
  onPress,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: 'transparent',
          opacity: pressed ? 0.6 : 1,
        },
      ]}
    >
      {leftIcon && (
        <Avatar.Icon
          size={32}
          icon={leftIcon}
          color={Colors.greenDark}
          style={styles.avatar}
        />
      )}

      <View style={styles.textContainer}>
        <Text
          variant="bodyLarge"
          style={{ fontFamily: Fonts.medium, color: Colors.greenDark }}
        >
          {title}
        </Text>
        <Text
          variant="bodyMedium"
          style={{ fontFamily: Fonts.regular, color: Colors.grayMedium }}
        >
          {description}
        </Text>
      </View>
      <Text
        variant="bodyLarge"
        style={{ fontFamily: Fonts.bold, color: Colors.greenDark }}
      >
        {amount}
      </Text>
    </Pressable>
  );
};

export default HomeTransactionListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 14,
  },
  avatar: {
    marginRight: 12,
    backgroundColor: Colors.grayLightest,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
});
