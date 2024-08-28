import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationForm from '@/components/RegistrationForm';
import '@testing-library/jest-dom/extend-expect';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 201,
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

// Mock the window.alert function
window.alert = jest.fn();

describe('RegistrationForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the RegistrationForm component with all elements', () => {
    render(<RegistrationForm />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  it('handles form submission and displays success message on success', async () => {
    render(<RegistrationForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /Register/i }));

    // Wait for the success message to appear
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('User Registered Successfully!'));


  });

  it('displays error message on failed registration', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
        json: () => Promise.resolve({}),
      })
    );

    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.submit(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('User Registration Failed!'));
  });
});
