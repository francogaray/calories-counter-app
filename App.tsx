/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Routes from './src/routes';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      {/*  eslint-disable-next-line react-native/no-inline-styles */}
      <SafeAreaView style={{flex: 1}}>
        <Routes />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
