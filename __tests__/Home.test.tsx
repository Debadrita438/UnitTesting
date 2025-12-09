import React, { act } from 'react';
import { screen, userEvent } from '@testing-library/react-native';
import { renderWithProviders } from '../utils/test-utils';
import { HomeScreen } from '../src/screens';
import { navigate } from '../src/navigation/rootNavigation';

jest.useFakeTimers();
jest.mock('../src/navigation/rootNavigation', () => ({
  navigate: jest.fn(),
  navigationRef: {
    isReady: () => true,
    navigate: jest.fn(),
  },
}));

describe('Home screen', () => {
  it('renders corrctly when the token is not empty string', () => {
    const { store } = renderWithProviders(<HomeScreen />, {
      preloadedState: {
        auth: {
          token: '123', // Start with empty token
        },
      },
    });

    const initialToken = store.getState().auth.token;
    expect(initialToken).not.toBe('');
    expect(screen.getByTestId('home-screen')).toBeTruthy();
  });

  it('increments count when button pressed', async () => {
    renderWithProviders(<HomeScreen />);
    const user = userEvent.setup();

    await user.press(screen.getByTestId('btn'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('renders and hides CFirst based on count', async () => {
    renderWithProviders(<HomeScreen />);
    const user = userEvent.setup();

    // press 1 time -> should appear
    await user.press(screen.getByTestId('btn'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByText('Going to render this component')).toBeTruthy();

    // press 2nd time -> should disappear
    await user.press(screen.getByTestId('btn'));
    expect(screen.getByTestId('count')).toHaveTextContent('2');
    expect(screen.queryByText('Going to render this component')).toBeNull();
  });

  it('renders the text passed to the first component', async () => {
    renderWithProviders(<HomeScreen />);
    const user = userEvent.setup();

    await user.press(screen.getByTestId('btn'));

    expect(screen.getByText('Going to render this component')).toBeTruthy();
  });

  it('handles multiple state updates', async () => {
    renderWithProviders(<HomeScreen />);
    const user = userEvent.setup();

    await user.press(screen.getByTestId('btn'));

    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('double')).toHaveTextContent('2');
  });

  it('handles complex reducer logic using useReducer', async () => {
    renderWithProviders(<HomeScreen />);
    const user = userEvent.setup();

    await user.press(screen.getByTestId('inc'));
    await user.press(screen.getByTestId('inc'));

    expect(screen.getByTestId('quantity')).toHaveTextContent('Quantity: 2');

    await user.press(screen.getByTestId('dec'));
    expect(screen.getByTestId('quantity')).toHaveTextContent('Quantity: 1');

    await user.press(screen.getByTestId('reset'));
    expect(screen.getByTestId('quantity')).toHaveTextContent('Quantity: 0');
  });

  it('handles timer', async () => {
    renderWithProviders(<HomeScreen />);
    expect(screen.getByTestId('value')).toHaveTextContent('Start');
    const user = userEvent.setup();

    await user.press(screen.getByTestId('timer'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('value')).toHaveTextContent('Done');
  });

  it('navigates to List screen on button press', async () => {
    renderWithProviders(<HomeScreen />);
    const user = userEvent.setup();

    await user.press(screen.getByTestId('listBtn'));
    expect(navigate).toHaveBeenCalledWith('List');
  });
});
