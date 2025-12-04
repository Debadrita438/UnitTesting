import React, { act } from 'react';
import App from '../App';
import { render, screen, userEvent } from '@testing-library/react-native';

jest.useFakeTimers();

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('increments count when button pressed', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.press(screen.getByTestId('btn'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('renders and hides CFirst based on count', async () => {
    render(<App />);
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
    render(<App />);
    const user = userEvent.setup();

    await user.press(screen.getByTestId('btn'));

    expect(screen.getByText('Going to render this component')).toBeTruthy();
  });

  it('handles multiple state updates', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.press(screen.getByTestId('btn'));

    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('double')).toHaveTextContent('2');
  });

  it('handles complex reducer logic using useReducer', async () => {
    render(<App />);
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
    render(<App />);
    expect(screen.getByTestId('value')).toHaveTextContent('Start');
    const user = userEvent.setup();

    await user.press(screen.getByTestId('timer'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('value')).toHaveTextContent('Done');
  });
});
