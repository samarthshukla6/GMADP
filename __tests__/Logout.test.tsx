import { render, screen, fireEvent } from '@testing-library/react';
import Logout from '../components/logout'; // Adjust the path if necessary
import { doLogout } from '../app/actions/index'; // Adjust the path if necessary
import '@testing-library/jest-dom/extend-expect';

// Mock the doLogout function
jest.mock('../app/actions/index', () => ({
  doLogout: jest.fn(),
}));

describe('Logout Component', () => {
  beforeEach(() => {
    render(<Logout />);
  });

  it('renders the Logout button', () => {
    // Check if the button is rendered
    const button = screen.getByRole('button', { name: /Sign Out/i });
    expect(button).toBeInTheDocument();
  });

  it('calls doLogout function on button click', () => {
    // Get the button element
    const button = screen.getByRole('button', { name: /Sign Out/i });
    
    // Simulate button click
    fireEvent.click(button);
    
    // Verify if the doLogout function is called
    expect(doLogout).toHaveBeenCalled();
  });
});
