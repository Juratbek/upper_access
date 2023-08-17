import { render, screen } from '@testing-library/react';
import { Spinner } from '.';

describe('Spinner', () => {
  it('render', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('spinner');
    expect(spinner).toBeVisible();
    expect(spinner).toHaveClass('spinner');
    expect(spinner).toHaveClass('spinner--dark');
  });

  it('color', () => {
    render(<Spinner color='light' />);
    const spinner = screen.getByRole('spinner');
    expect(spinner).toHaveClass('spinner--light');
  });

  it('class name', () => {
    render(<Spinner className='mb-2' />);
    const spinner = screen.getByRole('spinner');
    expect(spinner).toHaveClass('mb-2');
  });
});
