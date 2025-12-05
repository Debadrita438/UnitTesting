import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, SignupScreen } from '../screens';

const AuthNavigation = () => {
  const Stack = createNativeStackNavigator();

  const authStack = {
    Login: LoginScreen,
    Signup: SignupScreen,
  };

  return (
    <Stack.Navigator>
      {Object.entries(authStack).map(([name, component]) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default AuthNavigation;
