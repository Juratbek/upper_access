import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders a button', () => {
    const label = 'Click me';
    render(<Button>{label}</Button>);
    const buttonElement = screen.getByText(label);
    expect(buttonElement).toBeDefined();
  });
  it('renders a button with a text', () => {
    const label = 'Click me';
    render(<Button>{label}</Button>);
    const buttonElement = screen.getByText(label);
    expect(buttonElement).toHaveTextContent(label);
  });
});
