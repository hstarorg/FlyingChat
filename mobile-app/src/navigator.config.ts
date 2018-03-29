import { TabNavigator } from 'react-navigation';
import { ContactStackNavigator } from './screens/contact';
import { MessageStackNavigator } from './screens/message';
import { MyStackNavigator } from './screens/my';

export const AppNavigator = TabNavigator({
  MessageTabRoute: { screen: MessageStackNavigator },
  ContactTabRoute: { screen: ContactStackNavigator },
  MyTabRoute: { screen: MyStackNavigator }
});
