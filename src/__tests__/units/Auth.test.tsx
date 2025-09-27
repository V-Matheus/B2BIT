import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Auth } from '@/components/Auth';
import { login } from '@/services/auth';

jest.mock('@/services/auth', () => ({
  login: jest.fn(),
  signOut: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const mockedLogin = login as jest.MockedFunction<typeof login>;

describe('Auth > Unit tests', () => {
  const mockUserData = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    is_active: true,
    avatar: null,
    type: 'StoreUser',
    created: '2023-01-01T00:00:00Z',
    modified: '2023-01-01T00:00:00Z',
    role: 'USER',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render form elements with correct attributes', async () => {
      await act(async () => {
        render(<Auth />);
      });

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();

      expect(screen.getByPlaceholderText('@gmail.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Your Password')).toBeInTheDocument();
    });

    it('should have form structure', async () => {
      const { container } = await act(async () => {
        return render(<Auth />);
      });

      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();

      const emailInput = screen.getByRole('textbox', { name: 'Email' });
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });

      expect(form).toContainElement(emailInput);
      expect(form).toContainElement(passwordInput);
      expect(form).toContainElement(submitButton);
    });

    it('should render logo image', async () => {
      await act(async () => {
        render(<Auth />);
      });

      const logoImage = screen.getByAltText('Logo b2bit');
      expect(logoImage).toBeVisible();
      expect(logoImage).toHaveAttribute('width', '309.6px');
      expect(logoImage).toHaveAttribute('height', '94.81px');
    });

    it('should render input fields with correct types and attributes', async () => {
      await act(async () => {
        render(<Auth />);
      });

      const emailInput = screen.getByPlaceholderText('@gmail.com');
      const passwordInput = screen.getByPlaceholderText('Your Password');

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('name', 'email');
      expect(emailInput).toHaveAttribute('id', 'email');

      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('name', 'password');
      expect(passwordInput).toHaveAttribute('id', 'password');
    });

    it('should render submit button with correct attributes', async () => {
      await act(async () => {
        render(<Auth />);
      });

      const submitButton = screen.getByRole('button', { name: 'Sign In' });

      expect(submitButton).toHaveAttribute('type', 'submit');
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Form Validation', () => {
    it('should show validation errors for empty fields', async () => {
      const user = userEvent.setup();

      await act(async () => {
        render(<Auth />);
      });

      const submitButton = screen.getByRole('button', { name: 'Sign In' });

      await act(async () => {
        await user.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    it('should show validation error for invalid email', async () => {
      const user = userEvent.setup();

      await act(async () => {
        render(<Auth />);
      });

      const emailInput = screen.getByPlaceholderText('@gmail.com');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });

      await act(async () => {
        await user.type(emailInput, 'invalid-email');
        await user.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      });
    });

    it('should show validation error for short password', async () => {
      const user = userEvent.setup();

      await act(async () => {
        render(<Auth />);
      });

      const emailInput = screen.getByPlaceholderText('@gmail.com');
      const passwordInput = screen.getByPlaceholderText('Your Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });

      await act(async () => {
        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, '12');
        await user.click(submitButton);
      });

      await waitFor(() => {
        expect(
          screen.getByText('Password must be at least 3 characters'),
        ).toBeInTheDocument();
      });
    });

    it('should not show validation errors for valid inputs', async () => {
      const user = userEvent.setup();
      mockedLogin.mockResolvedValueOnce(mockUserData);

      await act(async () => {
        render(<Auth />);
      });

      const emailInput = screen.getByPlaceholderText('@gmail.com');
      const passwordInput = screen.getByPlaceholderText('Your Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });

      await act(async () => {
        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');
        await user.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
        expect(
          screen.queryByText('Password is required'),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('Invalid email address'),
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('User Interactions', () => {
    it('should call login function with correct parameters on form submission', async () => {
      const user = userEvent.setup();
      mockedLogin.mockResolvedValueOnce(mockUserData);

      await act(async () => {
        render(<Auth />);
      });

      const emailInput = screen.getByPlaceholderText('@gmail.com');
      const passwordInput = screen.getByPlaceholderText('Your Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });

      await act(async () => {
        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');
        await user.click(submitButton);
      });

      await waitFor(() => {
        expect(mockedLogin).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
        });
        expect(mockNavigate).toHaveBeenCalledWith('/profile');
      });
    });

    it('should show loading state during login', async () => {
      const user = userEvent.setup();

      // Mock que simula delay
      mockedLogin.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve(mockUserData), 100),
          ),
      );

      await act(async () => {
        render(<Auth />);
      });

      const emailInput = screen.getByPlaceholderText('@gmail.com');
      const passwordInput = screen.getByPlaceholderText('Your Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });

      await act(async () => {
        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');
        await user.click(submitButton);
      });

      // Verifica se mostra loading
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeDisabled();
      });

      // Aguarda o loading terminar
      await waitFor(() => {
        expect(screen.getByRole('button')).not.toBeDisabled();
      });
    });

    it('should show loading spinner during submission', async () => {
      const user = userEvent.setup();

      let resolvePromise: (value: typeof mockUserData) => void;
      const promise = new Promise<typeof mockUserData>((resolve) => {
        resolvePromise = resolve;
      });

      mockedLogin.mockReturnValueOnce(promise);

      await act(async () => {
        render(<Auth />);
      });

      const emailInput = screen.getByPlaceholderText('@gmail.com');
      const passwordInput = screen.getByPlaceholderText('Your Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });

      await act(async () => {
        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');
        await user.click(submitButton);
      });

      expect(screen.getByRole('button')).toBeDisabled();

      await act(async () => {
        resolvePromise!(mockUserData);
      });

      await waitFor(() => {
        expect(screen.getByRole('button')).not.toBeDisabled();
      });
    });
  });
});
