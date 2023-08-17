import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders', () => {
    const label = 'Click me';
    render(<Button className='mb-1'>{label}</Button>);
    const button = screen.getByText(label);
    expect(button).toBeDefined();
    expect(button).toHaveClass('dark');
    expect(button).toHaveClass('medium');
    expect(button).toHaveClass('mb-1');
  });

  it('renders a button with a text', () => {
    const label = 'Click me';
    render(<Button>{label}</Button>);
    const button = screen.getByText(label);
    expect(button).toHaveTextContent(label);
  });

  it('color class name', () => {
    const label = 'Click me';
    render(<Button color='outline-dark'>{label}</Button>);
    const button = screen.getByText(label);
    expect(button).toHaveClass('outline-dark');
  });

  it('size class name', () => {
    const label = 'Click me';
    render(<Button size='small'>{label}</Button>);
    const button = screen.getByText(label);
    expect(button).toHaveClass('small');
  });

  it('disabled', () => {
    const label = 'Click me';
    render(
      <Button color='outline-dark' disabled>
        {label}
      </Button>,
    );
    const button = screen.getByText(label) as HTMLButtonElement;
    expect(button.disabled).toEqual(true);
    expect(button).toHaveClass('outline-dark-disabled');
  });

  it('loading', async () => {
    const label = 'Click me';
    render(
      <Button color='outline-dark' disabled loading>
        {label}
      </Button>,
    );
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button).toHaveClass('loading');
    expect(button).not.toHaveTextContent(label);
    const spinner = screen.getByRole('spinner');
    expect(spinner).toBeVisible();
    expect(button.disabled).toEqual(true);
  });
});
