import { Provider } from 'react-redux';
import RootNavigation from './src/navigation';
import { store } from './src/storage/store';

const App = () => (
  <Provider store={store}>
    <RootNavigation />
  </Provider>
);

export default App;
