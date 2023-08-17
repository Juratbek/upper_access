import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('render', () => {
    render(<Input />);
    const input = screen.getByRole('input') as HTMLInputElement;
    expect(input).toHaveClass('input');
    expect(input.type).toEqual('text');
  });
});
