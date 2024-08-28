import { render, screen } from '@testing-library/react';
import Form from '@/components/form'; // Adjust the path if necessary
import '@testing-library/jest-dom/extend-expect';

describe('Form', () => {
  beforeEach(() => {
    render(<Form />);
  });

  it('renders the Form component', () => {
    // Check if the form is rendered
    const formTitle = screen.getByText(/Donations Form/i);
    expect(formTitle).toBeInTheDocument();
  });

  it('contains all form fields', () => {
    // Check for each form field
    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type of Donation:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State \(USA\):/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email ID:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Purpose:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Remarks:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });
});

