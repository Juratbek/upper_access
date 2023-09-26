import { AuthContext } from 'context/auth';
import { useCallback, useContext, useMemo } from 'react';
import { IUseAuth, TAuthenticate } from './useAuth.types';

export const useAuth = (): IUseAuth => {
  const context = useContext(AuthContext);

  const authenticate: TAuthenticate = useCallback((data) => {
    window.opener.postMessage(data, window.location.origin);
    window.close();
  }, []);

  const store: IUseAuth = useMemo(
    () => ({
      ...context,
      authenticate,
    }),
    [context, authenticate],
  );

  return store;
};
