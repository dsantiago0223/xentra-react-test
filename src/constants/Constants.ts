import { Platform } from 'react-native';

export const Api = {
  API_BASE_URL: 'https://dd438db4-d024-4e90-a7c0-5168d4cbe765.mock.pstmn.io',
  LOG_API_RESPONSE: true,
};

export const Colors = {
  white: '#FFFFFF',
  nearWhite: '#FAFAFA',
  black: '#000000',
  red: '#a6192e',
  transparent: 'transparent',

  greenLight: '#03855e',
  greenMedium: '#2C5C4C',
  greenDark: '#114736',

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
