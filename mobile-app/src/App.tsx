/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import { AppNavigator } from './navigator.config';

export default class App extends React.Component<{}> {
  render() {
    return <AppNavigator />;
  }
}