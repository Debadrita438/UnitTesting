import { screen, waitFor } from '@testing-library/react-native';
import { renderWithProviders } from '../utils/test-utils';
import { ListScreen } from '../src/screens';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('List Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render List Screen', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { users: [] },
    });

    renderWithProviders(<ListScreen />);

    await waitFor(() => {
      expect(screen.getByTestId('list-screen')).toBeTruthy();
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it('shows loader when fetching', async () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {}));

    renderWithProviders(<ListScreen />);

    // loading should be visible immediately
    expect(screen.getByTestId('loader')).toBeTruthy();
  });

  it('renders list of users on success', async () => {
    const mockUsers = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      firstName: `First-${i + 1}`,
      lastName: `Last-${i + 1}`,
    }));

    mockedAxios.get.mockResolvedValue({
      data: { users: mockUsers },
    });

    renderWithProviders(<ListScreen />);

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
      expect(screen.queryByTestId('error')).toBeNull();
      mockUsers.forEach(user => {
        const fullNameRegex = new RegExp(`${user.firstName} ${user.lastName}`);
        expect(screen.getByText(fullNameRegex)).toBeTruthy();
      });
    });
  });

  it('shows error when fetching fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Failed to fetch'));

    renderWithProviders(<ListScreen />);

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
      expect(screen.getByTestId('error')).toBeTruthy();
    });
  });
});
