import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './authNavigation';
import { navigationRef } from './rootNavigation';

const RootNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AuthNavigation />
    </NavigationContainer>
  );
};

export default RootNavigation;
