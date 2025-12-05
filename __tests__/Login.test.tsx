import { render, screen, userEvent } from '@testing-library/react-native';
import { LoginScreen } from '../src/screens';
import { navigate } from '../src/navigation/rootNavigation';

// Mock the package and navigationRef to control its behavior in tests
jest.mock('../src/navigation/rootNavigation', () => ({
  navigate: jest.fn(), // <-- make it a mock
  navigationRef: {
    isReady: () => true,
    navigate: jest.fn(),
  },
}));

describe('LoginScreen', () => {
  it('renders correctly and navigates to Signup on button press', async () => {
    render(<LoginScreen />);
    const user = userEvent.setup();
    await user.press(screen.getByTestId('signup'));
    expect(navigate).toHaveBeenCalledWith('Signup');
  });
});
