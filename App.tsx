import React, {useEffect} from 'react';
import {View} from 'react-native';
import {RootStack} from './src/navigation';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/utils/lang/i18n';
import {I18nManager} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BootSplash from 'react-native-bootsplash';

function App(): React.JSX.Element {
  const detectLang = async () => {
    try {
      const savedLang = await AsyncStorage.getItem('appLanguage');
      // Only change to LTR if English is explicitly saved
      if (savedLang === 'en') {
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
      }
      // RTL is already set as default in index.js, no need to set it again
    } catch (e) {
      // On error, keep the default RTL from index.js
    }
  };

  useEffect(() => {
    const init = async () => {
      // Wait for app to be ready and language detection to complete
      await detectLang();
      // Add a small delay to show the splash screen for at least 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    init().finally(async () => {
      // await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <I18nextProvider i18n={i18n}>
        <RootStack />
      </I18nextProvider>
    </View>
  );
}

export default App;
