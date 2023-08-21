import { render, screen } from '@testing-library/react';
import { MainPage } from './MainPage';
import { IAuthContext } from 'context/auth';

const mocks = vi.hoisted(() => {
  return {
    useAuth: vi.fn().mockReturnValue({
      isAuthenticated: null,
      status: 'loading',
    } satisfies IAuthContext),
  };
});

vi.mock('hooks', () => ({
  useAuth: mocks.useAuth,
}));

describe('MainPage', () => {
  it('storyset image', () => {
    render(<MainPage />);
    const storysetImage = screen.getByRole('storyset');
    expect(storysetImage).toBeVisible();
    const image = storysetImage.querySelector('img') as HTMLImageElement;
    expect(image.src).toContain('/storyset/otp.svg');
  });

  it('render loading text', () => {
    render(<MainPage />);
    const loadingText = screen.getByText(/Yuklanmoqda/i);
    expect(loadingText).toBeVisible();
  });

  it('login form', () => {
    mocks.useAuth.mockReturnValue({
      isAuthenticated: true,
      status: 'authenticated',
    } satisfies IAuthContext);
    render(<MainPage />);
    const loginForm = screen.getByRole('login-form');
    expect(loginForm).toBeVisible();
  });
});
