import { Platform } from 'react-native';

export const Colors = {
  white: '#FFFFFF',
  nearWhite: '#FAFAFA',
  black: '#000000',
  red: '#a6192e',
  transparent: 'transparent',

  greenLight: '#3497D6',
  greenMedium: '#00408D',
  greenDark: '#003585',

  yellowLight: '#FFF20E',
  yellowMedium: '#FFBF00',
  yellowDark: '#FFBF00',

  grayDarkest: '#373737',
  grayDark: '#545454',
  grayMedium: '#8F8F8F',
  grayLight: '#CACACA',
  grayLightest: '#EDEDED',
  grayInput: '#EFF6F3',
};

export const Fonts = {
  light: Platform.select({
    ios: 'SF Pro Text Light',
    android: 'SF-Pro-Text-Light',
  }),
  regular: Platform.select({
    ios: 'SF Pro Text Regular',
    android: 'SF-Pro-Text-Regular',
  }),
  medium: Platform.select({
    ios: 'SF Pro Text Medium',
    android: 'SF-Pro-Text-Medium',
  }),
  bold: Platform.select({
    ios: 'SF Pro Text Bold',
    android: 'SF-Pro-Text-Bold',
  }),
};
