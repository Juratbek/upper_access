import { render, screen } from '@testing-library/react';
import { Divider } from '.';

describe('Divider', () => {
  it('render', () => {
    render(<Divider />);
    const divider = screen.getByRole('divider');
    expect(divider).toBeVisible();
    expect(divider).toHaveClass('divider');
    expect(divider).toHaveClass('divider--horisontal');
    expect(divider).toHaveClass('divider--light-gray');
  });

  it('class name', () => {
    render(<Divider className='mb-2' />);
    const divider = screen.getByRole('divider');
    expect(divider).toHaveClass('mb-2');
  });

  it('color', () => {
    render(<Divider color='medium-gray' />);
    const divider = screen.getByRole('divider');
    expect(divider).toHaveClass('divider--medium-gray');
  });

  it('type', () => {
    render(<Divider type='vertical' />);
    const divider = screen.getByRole('divider');
    expect(divider).toHaveClass('divider--vertical');
  });
});
