import { StackNavigator } from 'react-navigation';
import { HomeScreen } from './home/HomeScreen';

export const MessageStackNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: '消息'
    }
  }
});
