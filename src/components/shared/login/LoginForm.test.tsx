import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('render', () => {
    const { container } = render(<LoginForm />);
    const form = container.querySelector('form');
    expect(form).toBeVisible();
    const loginForm = screen.getByRole('login-form');
    expect(loginForm).toBeVisible();
  });

  it('render login input', () => {
    const { container } = render(<LoginForm />);

    const loginLabel = container.querySelector('#login') as HTMLLabelElement;
    expect(loginLabel).toBeVisible();
    expect(loginLabel).toHaveTextContent('Login');
    expect(loginLabel.htmlFor).toEqual('login');

    const loginInput = container.querySelector('input[name="username"]');
    expect(loginInput).toBeVisible();
    expect(loginInput?.id).toEqual('login');
  });

  it('render password input', () => {
    const { container } = render(<LoginForm />);

    const loginLabel = container.querySelector('#password') as HTMLLabelElement;
    expect(loginLabel).toBeVisible();
    expect(loginLabel).toHaveTextContent('Password');
    expect(loginLabel.htmlFor).toEqual('password');

    const loginInput = container.querySelector('input[name="password"]');
    expect(loginInput).toBeVisible();
    expect(loginInput?.id).toEqual('password');
  });

  it('validate login input', () => {
    render(<LoginForm />);

    const loginInput = screen.getByTestId(/login/i);
    expect(loginInput).toBeVisible();
    fireEvent.input(loginInput, { target: { value: 'login' } });

    const submitButton = screen.getByText('Kirish');
    fireEvent.click(submitButton);

    // const error = screen.getByText('Xato kiritilgan');
    // expect(error).toBeVisible();
    // screen.debug();
  });
});
