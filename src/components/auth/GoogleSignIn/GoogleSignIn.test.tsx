import { render } from '@testing-library/react';
import { GoogleSignIn } from './GoogleSignIn';
import { renderGoogleSignInButton } from './utils';

vi.mock('./utils', () => ({
  renderGoogleSignInButton: vi.fn(),
}));

describe('GoogleSignIn', () => {
  it('calls renderGoogleSignInButton correctly', () => {
    render(<GoogleSignIn id='test-id' width={400} />);

    expect(renderGoogleSignInButton).toHaveBeenCalledWith(document.querySelector('#test-id'), {
      theme: 'outline',
      shape: 'pill',
      width: 400,
      locale: 'uz',
    });
  });
  it('renders button as a container', () => {
    const { container } = render(<GoogleSignIn id='test-id' width={400} />);

    const button = container.querySelector('#test-id') as HTMLButtonElement;
    expect(button).toBeVisible();
    expect(button.type).toEqual('button');
    expect(button.id).toEqual('test-id');
  });
});
