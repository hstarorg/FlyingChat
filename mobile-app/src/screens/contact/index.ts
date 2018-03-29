import { StackNavigator } from 'react-navigation';
import { ContactListScreen } from './contact-list/ContactListScreen';

export const ContactStackNavigator = StackNavigator({
  ContactList: {
    screen: ContactListScreen,
    navigationOptions: {
      title: '联系人'
    }
  }
});
