interface IGoogleOAuthResponse {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

interface IRenderButtonConfig {
  theme: 'filled_black' | 'outline';
  shape?: 'pill';
  width?: number;
  locale?: 'uz';
  type?: 'icon';
  size?: 'large';
  text?: 'continue_with';
}

type TGoogleSignInRenderButton = (
  element: Element | null,
  config: IRenderButtonConfig,
) => Record<string, string>;

interface IAccounts {
  id: {
    renderButton: TGoogleSignInRenderButton;
    initialize: (params: {
      client_id: string;
      callback?: (data: IGoogleOAuthResponse) => void;
    }) => void;
  };
}

declare let google: {
  accounts: IAccounts;
};

declare let grecaptcha: {
  enterprise: {
    ready: (cb) => Promise<void>;
    execute: (siteKey: string, config: { action: 'LOGIN' }) => Promise<string>;
  };
};
