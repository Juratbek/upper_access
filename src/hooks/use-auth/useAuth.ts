import { AuthContext } from 'context/auth';
import { useCallback, useContext, useMemo } from 'react';
import { IUseAuth, TAuthenticate } from './useAuth.types';

export const useAuth = (): IUseAuth => {
  const context = useContext(AuthContext);

  const authenticate: TAuthenticate = useCallback(async (data) => {
    console.log('authenticated', data);
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
