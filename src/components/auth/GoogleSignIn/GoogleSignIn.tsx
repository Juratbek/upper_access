import { Button } from 'components/lib';
import { FC, useCallback, useEffect } from 'react';

import { IGoogleSignInProps } from './GoogleSignIn.types';
import { useAuth, useMutation } from 'hooks';
import { IAuthData } from 'types';

export const GoogleSignIn: FC<IGoogleSignInProps> = (props) => {
  const { authenticate } = useAuth();

  const { mutate: continueWithGoogle } = useMutation<string, IAuthData>({
    onSuccess: authenticate,
  });

  const authSuccessHandler = useCallback(
    (data: IGoogleOAuthResponse) => {
      continueWithGoogle({ url: 'blog/open/continue-with-google', data: data.credential });
    },
    [continueWithGoogle],
  );

  useEffect(() => {
    window.onload = function (): void {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: authSuccessHandler,
      });
      google.accounts.id.renderButton(document.getElementById(props.id), {
        type: 'icon',
        theme: 'outline',
        size: 'large',
      });
    };
  }, [props.id, props.width, authSuccessHandler]);

  return (
    <Button
      id={props.id}
      type='button'
      style={{ padding: 0, overflow: 'hidden' }}
      className={props.className}
    />
  );
};
