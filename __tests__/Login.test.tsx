import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '@/components/Login'; // Adjust the path if necessary
import { doCredentialLogin } from '../app/actions/index'; // Adjust the path if necessary
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom/extend-expect';

// Mock the necessary functions
jest.mock('../app/actions/index', () => ({
  doCredentialLogin: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginForm Component', () => {
  // Mock the useRouter hook to control its behavior in tests
  const mockPush = jest.fn();

  beforeEach(() => {
    // Set up the mocked useRouter to return the mockPush function
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    // Clear all mocks after each test to ensure clean state
    jest.clearAllMocks();
  });

  it('renders the LoginForm component', () => {
    render(<LoginForm />);

    // Check if the email and password input fields and the submit button are rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('updates input fields on change', () => {
    render(<LoginForm />);

    // Select the email and password input fields
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

    // Simulate user typing in the input fields
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Verify that the input fields contain the correct values
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('handles form submission and redirects on success', async () => {
    // Mock a successful login response
    (doCredentialLogin as jest.Mock).mockResolvedValue({ error: null });

    render(<LoginForm />);

    // Simulate user typing in the input fields and submitting the form
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));

    // Wait for the login function to be called and the redirection to occur
    await waitFor(() => {
      expect(doCredentialLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockPush).toHaveBeenCalledWith('/Donationsform');
    });
  });

  it('displays an error message on failed login', async () => {
    // Mock a failed login response
    (doCredentialLogin as jest.Mock).mockResolvedValue({ error: { message: 'Invalid credentials' } });

    render(<LoginForm />);

    // Simulate user typing in the input fields and submitting the form
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('handles network errors', async () => {
    // Mock a network error
    (doCredentialLogin as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(<LoginForm />);

    // Simulate user typing in the input fields and submitting the form
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));

    // Wait for the network error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Check your Credentials/i)).toBeInTheDocument();
    });
  });
});
