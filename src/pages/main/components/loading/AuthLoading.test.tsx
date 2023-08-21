import { render, screen } from '@testing-library/react';
import { AuthLoading } from '..';

describe('AuthLoading', () => {
  it('render', () => {
    render(<AuthLoading />);

    const loadingText = screen.getByText(/Yuklanmoqda/);
    expect(loadingText).toBeVisible();

    const waitText = screen.getByText(/iltimos kuting/);
    expect(waitText).toBeVisible();
  });
});
