import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, LoginScreen, SignupScreen } from '../screens';
import { useAppSelector } from '../hooks';

const AuthNavigation = () => {
  const Stack = createNativeStackNavigator();
  const authState = useAppSelector(state => state.auth);
  console.log('🚀 ~ AuthNavigation ~ authState:', authState);

  const authStack = {
    Login: LoginScreen,
    Signup: SignupScreen,
  };

  const appStack = {
    Home: HomeScreen,
  };

  const Screens = authState.token ? appStack : authStack;

  return (
    <Stack.Navigator>
      {Object.entries(Screens).map(([name, component]) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default AuthNavigation;
