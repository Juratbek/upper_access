import { render, screen } from '@testing-library/react';
import { Logo } from '..';

describe('Logo', () => {
  it('render', () => {
    const { container } = render(<Logo />);

    const logoSvg = container.querySelector('svg');
    expect(logoSvg).toBeVisible();

    const logo = screen.getByRole('logo');
    expect(logo).toBeVisible();
  });

  it('width height', () => {
    const { container } = render(<Logo width={100} height={120} />);
    const logoSvg = container.querySelector('svg');

    const width = logoSvg?.getAttribute('width');
    expect(width).toEqual('100');

    const height = logoSvg?.getAttribute('height');
    expect(height).toEqual('120');
  });
});
