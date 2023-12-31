import { ITelegramUser } from 'types';

type TButtonSize = 'large' | 'medium' | 'small';

export interface ITelegramLoginButtonProps {
  botName: string;
  shouldUsePic?: boolean;
  className?: string;
  cornerRadius?: number;
  shouldRequestAccess?: boolean;
  onAuth?: (user: ITelegramUser) => void;
  buttonSize?: TButtonSize;
  isLoading?: boolean;
}

declare global {
  interface Window {
    TelegramLoginWidget: {
      onAuth: (user: ITelegramUser) => void;
    };
  }
}
