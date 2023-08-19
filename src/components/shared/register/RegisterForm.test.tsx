import { render, screen } from '@testing-library/react';
import { RegisterForm } from '.';

describe('RegisterForm', () => {
  it('render', () => {
    render(<RegisterForm />);
    const registerForm = screen.getByRole('register-form');
    expect(registerForm).toBeVisible();
  });

  it('render name input and label', () => {
    const { container } = render(<RegisterForm />);

    const nameLabel = screen.getByText('Blog nomi') as HTMLLabelElement;
    expect(nameLabel).toBeVisible();
    expect(nameLabel.htmlFor).toEqual('name');

    const nameInput = container.querySelector('input#name');
    expect(nameInput).toBeVisible();
    expect(nameInput?.id).toEqual('name');
  });

  it('render bio input and label', () => {
    const { container } = render(<RegisterForm />);

    const bioLabel = screen.getByText(/Bio/i) as HTMLLabelElement;
    expect(bioLabel).toBeVisible();
    expect(bioLabel.htmlFor).toEqual('bio');

    const bioInput = container.querySelector('input#bio');
    expect(bioInput).toBeVisible();
    expect(bioInput?.id).toEqual('bio');
  });
});
