/**
 * @format
 */

import React from 'react';
import App from '../App';
import { render, screen, userEvent } from '@testing-library/react-native';

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);

    expect(screen.getByTestId('count')).toBeTruthy();
  });

  it('renders the number of times the button has been pressed', async () => {
    render(<App />);
    const user = userEvent.setup();

    const count = screen.getByTestId('count');
    expect(count.children[0]).toBe('0');
    await user.press(screen.getByText('Press me'));
    expect(count.children[0]).toBe('1');
  });
});
