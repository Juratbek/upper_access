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
        link.href = `Upper://${callback}?token=${data.token}`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
      } else {
        const allowedOrigin = import.meta.env.VITE_ALLOWED_ORIGIN ?? window.location.origin;
        if (!window.opener) {
          console.error('window.opener is not defined');
        }
        window.opener?.postMessage(data, allowedOrigin);
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
