import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, ListScreen, LoginScreen, SignupScreen } from '../screens';
import { useAppSelector } from '../hooks';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthNavigation = () => {
  const authState = useAppSelector(state => state.auth);

  const authStack = {
    Login: LoginScreen,
    Signup: SignupScreen,
  };

  const appStack = {
    Home: HomeScreen,
    List: ListScreen,
  };

  const Screens = authState.token ? appStack : authStack;

  return (
    <Stack.Navigator>
      {Object.entries(Screens).map(([name, component]) => (
        <Stack.Screen
          key={name}
          name={name as keyof typeof Screens}
          component={component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthNavigation;
