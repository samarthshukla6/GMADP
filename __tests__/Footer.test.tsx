import { render, screen } from '@testing-library/react';
import Footer from '@/components/footer'; // Adjust the path if necessary
import '@testing-library/jest-dom/extend-expect';

describe('Footer', () => {
  it('renders the Footer component', () => {
    render(<Footer />);
    
    // Check if the footer is rendered
    const footerElement = screen.getByText(/© 2024 GMADP Donations/i);
    expect(footerElement).toBeInTheDocument();
  });


  it('has the correct class names for styling', () => {
    render(<Footer />);
    
    // Check for specific class names
    const footerDiv = screen.getByText(/© 2024 GMADP Donations/i).closest('footer');
    expect(footerDiv).toHaveClass('bg-transparent');
    expect(footerDiv).toHaveClass('p-4');
    expect(footerDiv).toHaveClass('my-0');
    expect(footerDiv).toHaveClass('flex');
    expect(footerDiv).toHaveClass('justify-center');
    expect(footerDiv).toHaveClass('items-center');
  });
});
