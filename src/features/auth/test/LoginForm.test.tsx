import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const navigateMock = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'errors.emailHelp': "Email musi zawierać '@' i '.'",
        'errors.passwordHelp': 'Hasło musi zawierać co najmniej 6 znaków, wielką literę, znak specjalny.',
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.login': 'Login',
      };
      return translations[key] ?? key;
    },
  }),
}));

const loginMock = vi.fn();

// Mock hooka do mutacji logowania
vi.mock('@/features/auth/hooks/useAuthMutations', () => ({
  useAuthMutations: () => ({
    useLogin: () => ({
      mutate: loginMock,
      isPending: false,
      isError: false,
    }),
  }),
}));

vi.mock('@/stores/authStore', () => ({
  useAuthStore: () => vi.fn(),
}));

// ✅ TERAZ importuj komponent
import { LoginForm } from '../ui/components/login-form';

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders email and password fields', () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('shows error if email is invalid', async () => {
    renderWithProviders(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'invalidemail' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'Valid123!' },
    });

    const form = screen.getByLabelText(/Email/i).closest('form');
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(screen.getByText(/email musi zawierać '@' i '\.'/i)).toBeInTheDocument();
    });
  });

  it('shows error if password is invalid', async () => {
    renderWithProviders(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'sh' },
    });

    const form = screen.getByLabelText(/Email/i).closest('form');
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(
        screen.getByText(/Hasło musi zawierać co najmniej 6 znaków, wielką literę, znak specjalny./i)
      ).toBeInTheDocument();
    });
  });

  it('calls login when form is valid', async () => {
    renderWithProviders(<LoginForm />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'Valid123!' },
    });

    const form = emailInput.closest('form');
    fireEvent.submit(form!);

    await waitFor(() => {
      console.log('🔍 loginMock calls:', loginMock.mock.calls);
      expect(loginMock).toHaveBeenCalledTimes(1);
      expect(loginMock).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'Valid123!',
      });
    });
  });
});