/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import codePush from 'react-native-code-push';

import { AppNavigator } from './navigator.config';

const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

class App extends React.Component<{}> {
  render() {
    return <AppNavigator />;
  }
}

export default codePush(codePushOptions)(App);
