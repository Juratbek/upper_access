export interface IGoogleSignInRenderButtonConfig {
  theme: 'filled_black' | 'outline';
  shape: 'pill';
  width: number;
  locale: 'uz';
}

export type TGoogleSignInRenderButton = (
  element: Element | null,
  config: IGoogleSignInRenderButtonConfig,
) => Record<string, string>;

interface IAccounts {
  id: {
    renderButton: TGoogleSignInRenderButton;
  };
}
export interface IGoogleSignInProps {
  id: string;
  text?: string;
  width?: number;
  className?: string;
}

declare global {
  interface Window {
    google: {
      accounts: IAccounts;
    };
  }
}
