import { screen } from '@testing-library/react-native';
import AuthNavigation from '../src/navigation/authNavigation';
import { renderWithProviders } from '../utils/test-utils';

describe('AuthNavigation', () => {
  it('shows Login screen when token is empty', () => {
    const { store } = renderWithProviders(<AuthNavigation />, {
      preloadedState: {
        auth: {
          token: '', // Start with empty token
        },
      },
    });
    expect(store.getState().auth.token).toBe('');
    expect(screen.getByTestId('login-screen')).toBeTruthy();
    expect(screen.queryByTestId('home-screen')).toBeNull();
  });

  it('shows Home screen when token is not empty', () => {
    const { store } = renderWithProviders(<AuthNavigation />, {
      preloadedState: {
        auth: {
          token: 'abc', // Start with empty token
        },
      },
    });
    expect(store.getState().auth.token).not.toBe('');
    expect(screen.queryByTestId('login-screen')).toBeNull();
    expect(screen.getByTestId('home-screen')).toBeTruthy();
  });
});
