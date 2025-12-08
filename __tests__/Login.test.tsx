import { screen, userEvent } from '@testing-library/react-native';
import { LoginScreen } from '../src/screens';
import { navigate } from '../src/navigation/rootNavigation';
import { renderWithProviders } from '../utils/test-utils';

jest.mock('../src/navigation/rootNavigation', () => ({
  navigate: jest.fn(),
  navigationRef: {
    isReady: () => true,
    navigate: jest.fn(),
  },
}));

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and navigates to Signup on button press', async () => {
    renderWithProviders(<LoginScreen />);

    const user = userEvent.setup();
    await user.press(screen.getByTestId('signup'));

    expect(navigate).toHaveBeenCalledWith('Signup');
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('calls loginHandler when login button is pressed', async () => {
    const { store } = renderWithProviders(<LoginScreen />);

    const user = userEvent.setup();

    // Check initial state from the slice
    const initialToken = store.getState().auth.token;
    expect(initialToken).toBe(''); // Should use initialState from auth.slice

    await user.press(screen.getByTestId('login'));

    const token = store.getState().auth.token;
    expect(token).not.toBe('');
  });

  it('updates store token to a non-empty string on login button press', async () => {
    // Pass the complete state structure
    const { store } = renderWithProviders(<LoginScreen />, {
      preloadedState: {
        auth: {
          token: '', // Start with empty token
        },
      },
    });

    const user = userEvent.setup();

    // Verify initial state
    const initialToken = store.getState().auth.token;
    expect(initialToken).toBe(''); // Should be empty initially

    await user.press(screen.getByTestId('login'));

    // Verify token was updated
    const token = store.getState().auth.token;

    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
    expect(token).not.toBe('');
  });
});
