import { AuthContext } from 'context/auth';
import { useCallback, useContext, useMemo } from 'react';
import { IUseAuth, TAuthenticate } from './useAuth.types';

export const useAuth = (): IUseAuth => {
  const context = useContext(AuthContext);

  const getRecaptchaToken = useCallback(() => {
    return new Promise<string>((resolve) => {
      grecaptcha.enterprise.ready(async () => {
        const token = await grecaptcha.enterprise.execute(
          '6LerbgwoAAAAAOkRfOj-hZFgbZMURyTsczc0E5k9',
          {
            action: 'LOGIN',
          },
        );
        resolve(token);
      });
    });
  }, []);

  const authenticate: TAuthenticate = useCallback(
    async (data) => {
      const token = await getRecaptchaToken();
      console.log('authenticated', data, token);
    },
    [getRecaptchaToken],
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
