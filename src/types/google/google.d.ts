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
