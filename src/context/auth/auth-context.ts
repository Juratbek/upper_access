import { createContext } from 'react';
import { IAuthContext } from './auth-context.types';

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: null,
  status: 'loading',
});
