import { FC, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './auth-context';
import { IAuthContext, IAuthProviderProps } from './auth-context.types';
import { TAuthStatus } from 'types';
import { LOCAL_STORAGE_TOKEN_KEY } from './auth-context.constants';

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [status, setStatus] = useState<TAuthStatus>('loading');

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      setIsAuthenticated(true);
      setStatus('authenticated');
    } else {
      setIsAuthenticated(false);
      setStatus('unauthenticated');
    }
  }, []);

  const store: IAuthContext = useMemo(
    () => ({ isAuthenticated, status }),
    [isAuthenticated, status],
  );

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
