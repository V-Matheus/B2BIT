import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Profile } from '@/components/Profile';
import { getUser } from '@/services/user';
import { signOut } from '@/services/auth';

jest.mock('@/services/user', () => ({
  getUser: jest.fn(),
}));

jest.mock('@/services/auth', () => ({
  signOut: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockedGetUser = getUser as jest.MockedFunction<typeof getUser>;
const mockedSignOut = signOut as jest.MockedFunction<typeof signOut>;

describe('Profile > Unit tests', () => {
  const mockUserData = {
    name: 'Test User',
    email: 'test@example.com',
    avatar: {
      high: 'https://example.com/avatar-high.jpg',
      low: 'https://example.com/avatar-low.jpg',
      medium: 'https://example.com/avatar-low.jpg',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render Profile component with loading state', async () => {
      mockedGetUser.mockImplementation(() => new Promise(() => {}));

      render(<Profile />);

      expect(screen.getByText('Logout')).toBeInTheDocument();
      expect(screen.getByText('Profile picture')).toBeInTheDocument();

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('should render Profile component with user data', async () => {
      mockedGetUser.mockResolvedValueOnce(mockUserData);

      render(<Profile />);

      await waitFor(() => {
        expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
      });

      expect(screen.getByText('Logout')).toBeInTheDocument();
      expect(screen.getByText('Profile picture')).toBeInTheDocument();
      expect(screen.getByAltText('profile image')).toBeInTheDocument();
      expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    });

    it('should render Profile component with custom avatar when user has avatar', async () => {
      mockedGetUser.mockResolvedValueOnce(mockUserData);

      await act(async () => {
        render(<Profile />);
      });

      await waitFor(() => {
        expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
      });

      const profileImage = screen.getByAltText('profile image');
      expect(profileImage).toHaveAttribute('src', mockUserData.avatar.high);
    });
  });

  describe('User Interactions', () => {
    it('should call signOut and navigate when logout button is clicked', async () => {
      const user = userEvent.setup();
      mockedGetUser.mockResolvedValueOnce(mockUserData);

      await act(async () => {
        render(<Profile />);
      });

      const logoutButton = screen.getByText('Logout');

      await user.click(logoutButton);

      expect(mockedSignOut).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  describe('Data Fetching', () => {
    it('should call getUser on component mount', async () => {
      mockedGetUser.mockResolvedValueOnce(mockUserData);

      await act(async () => {
        render(<Profile />);
      });

      expect(mockedGetUser).toHaveBeenCalledTimes(1);
    });

    it('should handle error when fetching user data', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      mockedGetUser.mockRejectedValueOnce(new Error('API Error'));

      await act(async () => {
        render(<Profile />);
      });

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          'Error fetching user data:',
          expect.any(Error),
        );
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Form Fields', () => {
    it('should render form fields as readonly', async () => {
      mockedGetUser.mockResolvedValueOnce(mockUserData);

      await act(async () => {
        render(<Profile />);
      });

      await waitFor(() => {
        expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
      });

      const nameInput = screen.getByDisplayValue('Test User');
      const emailInput = screen.getByDisplayValue('test@example.com');

      expect(nameInput).toHaveAttribute('readonly');
      expect(emailInput).toHaveAttribute('readonly');
    });

    it('should display empty fields when no user data', async () => {
      mockedGetUser.mockResolvedValueOnce({
        name: '',
        email: '',
        avatar: null,
      });

      await act(async () => {
        render(<Profile />);
      });

      expect(screen.getAllByText('Your')).toHaveLength(2);
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('E-mail')).toBeInTheDocument();
    });
  });
});
