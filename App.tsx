import { Provider } from 'react-redux';
import { store } from './src/storage/store';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigation/rootNavigation';
import AuthNavigation from './src/navigation/authNavigation';

const App = () => (
  <Provider store={store}>
    <NavigationContainer ref={navigationRef}>
      <AuthNavigation />
    </NavigationContainer>
  </Provider>
);

export default App;
