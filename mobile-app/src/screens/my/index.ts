import { StackNavigator } from 'react-navigation';
import { UserCenterScreen } from './user-center/UserCenterScreen';

export const MyStackNavigator = StackNavigator({
  UserCenter: {
    screen: UserCenterScreen,
    navigationOptions: {
      title: '我的'
    }
  }
});
