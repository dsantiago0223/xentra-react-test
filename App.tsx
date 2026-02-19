/**
 * Xentra React Test Mobile App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect } from 'react';
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ActivityIndicatorProvider } from './src/components/ui/UIActivityIndicator';
import { AlertProvider } from './src/context/AlertContext';
import { Colors, Fonts } from './src/constants/Constants';
import RNBootSplash from 'react-native-bootsplash';

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.greenDark,
    secondary: Colors.greenMedium,
    tertiary: Colors.yellowDark,
    background: Colors.white,
    error: Colors.red,
    disabled: Colors.grayLightest,
  },
  fonts: {
    ...DefaultTheme.fonts,
    displayLarge: {
      ...DefaultTheme.fonts.displayLarge,
      fontFamily: Fonts.bold,
    },
    displayMedium: {
      ...DefaultTheme.fonts.displayMedium,
      fontFamily: Fonts.bold,
    },
    displaySmall: {
      ...DefaultTheme.fonts.displaySmall,
      fontFamily: Fonts.bold,
    },

    headlineLarge: {
      ...DefaultTheme.fonts.headlineLarge,
      fontFamily: Fonts.bold,
    },
    headlineMedium: {
      ...DefaultTheme.fonts.headlineMedium,
      fontFamily: Fonts.bold,
    },
    headlineSmall: {
      ...DefaultTheme.fonts.headlineSmall,
      fontFamily: Fonts.medium,
    },

    titleLarge: {
      ...DefaultTheme.fonts.titleLarge,
      fontFamily: Fonts.medium,
    },
    titleMedium: {
      ...DefaultTheme.fonts.titleMedium,
      fontFamily: Fonts.medium,
    },
    titleSmall: {
      ...DefaultTheme.fonts.titleSmall,
      fontFamily: Fonts.medium,
    },

    bodyLarge: {
      ...DefaultTheme.fonts.bodyLarge,
      fontFamily: Fonts.regular,
    },
    bodyMedium: {
      ...DefaultTheme.fonts.bodyMedium,
      fontFamily: Fonts.regular,
    },
    bodySmall: {
      ...DefaultTheme.fonts.bodySmall,
      fontFamily: Fonts.regular,
    },

    labelLarge: {
      ...DefaultTheme.fonts.labelLarge,
      fontFamily: Fonts.medium,
    },
    labelMedium: {
      ...DefaultTheme.fonts.labelMedium,
      fontFamily: Fonts.medium,
    },
    labelSmall: {
      ...DefaultTheme.fonts.labelSmall,
      fontFamily: Fonts.medium,
    },
  },
};

function App() {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.white}
          translucent={true}
        />
        <AppContent />
      </View>
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <PaperProvider theme={appTheme}>
      <View style={[styles.container]}>
        <AuthProvider>
          <ActivityIndicatorProvider>
            <AlertProvider>
              <RootNavigator />
            </AlertProvider>
          </ActivityIndicatorProvider>
        </AuthProvider>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default App;
