import { AuthContext } from 'context/auth';
import { useCallback, useContext, useMemo } from 'react';
import { IUseAuth, TAuthenticate } from './useAuth.types';
import { useParams } from 'hooks';

export const useAuth = (): IUseAuth => {
  const context = useContext(AuthContext);
  const { getParam } = useParams();

  const authenticate: TAuthenticate = useCallback(
    (data) => {
      getParam('callback-url');
      console.log('authenticated', data);
    },
    [getParam],
  );

  const store: IUseAuth = useMemo(
    () => ({
      ...context,
      authenticate,
    }),
    [context, authenticate],
  );

  return store;
};
