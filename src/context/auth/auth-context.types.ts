import { ReactNode } from 'react';
import { TAuthStatus } from 'types';

export interface IAuthContext {
  status: TAuthStatus;
  isAuthenticated: boolean | null;
}

export interface IAuthProviderProps {
  children: ReactNode;
}
