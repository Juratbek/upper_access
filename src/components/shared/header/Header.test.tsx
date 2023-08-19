import { render, screen } from '@testing-library/react';
import { Header } from '.';

describe('Header', () => {
  it('render', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toBeVisible();
    const logo = screen.getByRole('logo');
    expect(logo).toBeVisible();
  });
});
