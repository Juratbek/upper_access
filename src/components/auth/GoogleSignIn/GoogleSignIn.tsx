import { Button } from 'components/lib';
import { FC, useEffect } from 'react';

import { IGoogleSignInProps } from './GoogleSignIn.types';

export const GoogleSignIn: FC<IGoogleSignInProps> = (props) => {
  useEffect(() => {
    window.onload = function (): void {
      google.accounts.id.initialize({
        client_id: '764412195563-62aehnbr1lkrip1rh5rffijdhh4dm57f.apps.googleusercontent.com',
        callback: console.log,
      });
      google.accounts.id.renderButton(document.getElementById(props.id), {
        type: 'icon',
        theme: 'outline',
        size: 'large',
      });
    };
  }, [props.id, props.width]);

  return (
    <Button
      id={props.id}
      type='button'
      style={{ padding: 0, overflow: 'hidden' }}
      className={props.className}
    />
  );
};
