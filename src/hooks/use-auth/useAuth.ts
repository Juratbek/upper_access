import { AuthContext } from 'context/auth';
import { useCallback, useContext, useMemo } from 'react';
import { IUseAuth, TApplication, TAuthenticate } from './useAuth.types';
import { useParams } from 'hooks';

export const useAuth = (): IUseAuth => {
  const context = useContext(AuthContext);
  const { getParam } = useParams();
  const application = getParam('application') as TApplication;
  const callback = getParam('callback') ?? 'auth';

  const authenticate: TAuthenticate = useCallback(
    (data) => {
      if (application === 'mobile') {
        const link = document.createElement('a');
        link.href = `upper://${callback}?token=${data.token}`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
      } else {
        window.opener.postMessage(data, window.location.origin);
      }
      window.close();
    },
    [application, callback],
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
