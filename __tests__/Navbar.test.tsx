import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/navbar'; 
import '@testing-library/jest-dom/extend-expect';

describe("Navbar", () => {
  it("renders the Navbar component", () => {
    render(<Navbar />);
    
    expect(screen.getByText("GMADP Donations")).toBeInTheDocument();
    expect(screen.getByText("Add Donations")).toBeInTheDocument();
    expect(screen.getByText("View Donations")).toBeInTheDocument();
    expect(screen.getByText("Add Users")).toBeInTheDocument();
  });

  it("renders the mobile menu button", () => {
    render(<Navbar />);
    
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });

  it("opens and closes the mobile menu when the button is clicked", () => {
    render(<Navbar />);
    
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    
    expect(screen.getByText("Add Donations")).toBeInTheDocument();
    expect(screen.getByText("View Donations")).toBeInTheDocument();
    expect(screen.getByText("Add users")).toBeInTheDocument();
    
    // Click the mobile menu button again to close the menu
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    
    // Check if the mobile menu items are hidden
    expect(screen.queryByText("Add Donations")).not.toBeInTheDocument();
    expect(screen.queryByText("View Donations")).not.toBeInTheDocument();
    expect(screen.queryByText("Add users")).not.toBeInTheDocument();
  });

  it("renders the Logout component in the Navbar", () => {
    render(<Navbar />);
    
    // Check if the Logout component is rendered
    expect(screen.getAllByText(/logout/i)).toHaveLength(2); // One in mobile menu and one in desktop view
  });
});
