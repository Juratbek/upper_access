import { IGoogleSignInRenderButtonConfig } from './GoogleSignIn.types';

export const renderGoogleSignInButton = (
  element: Element | null,
  config: IGoogleSignInRenderButtonConfig,
): void => {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.renderButton(element, config);
  } else {
    console.error('Google Sign-In script not loaded.');
  }
};
