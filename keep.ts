import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const Section = () => {
  const handleOpenInAppBrowser = async () => {
    if (InAppBrowser) {
      try {
        const url = 'https://example.com'; // Replace with the URL you want to open
        const isAvailable = await InAppBrowser.isAvailable;
        await InAppBrowser.close();
        const result = await InAppBrowser.open(url, {
          // iOS-specific options
          dismissButtonStyle: 'close',
          preferredBarTintColor: '#000',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
        });
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('InAppBrowser is null');
    }
  };

  return (
    <TouchableOpacity onPress={handleOpenInAppBrowser}>
      <Text>Open In-App Browser</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Section />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
