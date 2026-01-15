/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ActivityIndicatorProvider } from './src/components/AppActivityIndicator'
import { Colors } from './src/constants/Constants';

function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar
        barStyle='dark-content'
        backgroundColor={Colors.white}
        translucent={true}
        />
        <AppContent />
      </View>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom}]}>
      <AuthProvider>
        <ActivityIndicatorProvider>
          <RootNavigator />
        </ActivityIndicatorProvider>
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  }
});

export default App;
