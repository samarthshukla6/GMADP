import { render, screen } from '@testing-library/react';
import MainSection from '@/components/Mainsection';
import '@testing-library/jest-dom/extend-expect';

// Mocking the LoginForm component
jest.mock('../components/Login', () => {
    return function DummyLoginForm() {
      return <div data-testid="login-form">LoginForm Component</div>;
    };
  });
  
  describe('MainSection Component', () => {
    it('renders the MainSection component with all elements', () => {
      render(<MainSection />);
  
      // Check if the heading is rendered
      expect(screen.getByText(/GMADP Donations/i)).toBeInTheDocument();
  
      // Check if the subheading is rendered
      expect(screen.getByText(/गण गण गणात बोते/i)).toBeInTheDocument();
  
      // Check if the image is rendered
      const image = screen.getByAltText(/Picture of the author/i) as HTMLImageElement;
      expect(image).toBeInTheDocument();
  
      // Check if the LoginForm component is rendered
      expect(screen.getByTestId('login-form')).toBeInTheDocument();
    });
  

  });