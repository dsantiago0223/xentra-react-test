import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Menu, Text, Icon } from 'react-native-paper';
import LayoutPressable from '../layout/LayoutPressable';
import { Colors } from '../../constants/Constants';

type Language = {
  code: string;
  label: string;
  flag: any;
};

const LANGUAGES: Language[] = [
  {
    code: 'en',
    label: 'English',
    flag: require('../../../assets/flags/us.png'),
  } /*,
  {
    code: 'sn',
    label: 'French',
    flag: require('../../../assets/flags/sn.png'),
  },*/,
];

interface UILanguagePickerProps {
  value: string;
  onChange: (lang: Language) => void;
}

const UILanguagePicker = ({ value, onChange }: UILanguagePickerProps) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const selected = LANGUAGES.find(l => l.code === value) ?? LANGUAGES[0];

  return (
    <LayoutPressable onPress={openMenu}>
      <Menu
        contentStyle={styles.menuContentStyle}
        key={visible ? 'visible' : 'hidden'}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <View style={styles.container}>
            <Image source={selected.flag} style={styles.flag} />
            <Text style={styles.label}>{selected.label}</Text>
            <Icon source="chevron-down" size={20} />
          </View>
        }
      >
        {LANGUAGES.map(language => (
          <Menu.Item
            key={language.code}
            onPress={() => {
              onChange(language);
              closeMenu();
            }}
            title={language.label}
            leadingIcon={() => menuItemIcon(language)}
          />
        ))}
      </Menu>
    </LayoutPressable>
  );

  function menuItemIcon(language: Language) {
    return <Image source={language.flag} style={styles.menuFlag} />;
  }
};

export default UILanguagePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
    color: Colors.grayDark,
  },
  menuFlag: {
    marginTop: 5,
    width: 20,
    height: 14,
  },
  menuContentStyle: {
    backgroundColor: Colors.white,
  },
});
