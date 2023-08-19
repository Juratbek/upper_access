import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('header', () => {
    const { container } = render(<App />);
    const header = container.querySelector('header');
    expect(header).toBeVisible();
  });
  it('storyset image', () => {
    render(<App />);
    const storysetImage = screen.getByRole('storyset');
    expect(storysetImage).toBeVisible();
    const image = storysetImage.querySelector('img') as HTMLImageElement;
    expect(image.src).toContain('/storyset/otp.svg');
  });
  it('login form', () => {
    render(<App />);
    const loginForm = screen.getByRole('login-form');
    expect(loginForm).toBeVisible();
  });
});
