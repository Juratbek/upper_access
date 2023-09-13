import { AuthContext } from 'context/auth';
import { useCallback, useContext, useMemo } from 'react';
import { IUseAuth, TAuthenticate } from './useAuth.types';
import { useParams } from 'hooks';

export const useAuth = (): IUseAuth => {
  const context = useContext(AuthContext);
  const { getParam } = useParams();

  const authenticate: TAuthenticate = useCallback(
    (data) => {
      console.log('authenticated', data);
      window.opener.postMessage(data, getParam('origin'));
      window.close();
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
