import { fireEvent, render, screen } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter', () => {
  it('increment', () => {
    render(<Counter />);
    const incrementButton = screen.getByText(/Increment/i);
    fireEvent.click(incrementButton);
    const count = screen.getByTestId('count');
    expect(count).toHaveTextContent('1');
  });

  it('decrement', () => {
    render(<Counter />);
    const incrementButton = screen.getByText(/Decrement/i);
    fireEvent.click(incrementButton);
    const count = screen.getByTestId('count');
    expect(count).toHaveTextContent('-1');
  });
});
