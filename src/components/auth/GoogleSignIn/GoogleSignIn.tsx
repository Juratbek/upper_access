import { Button } from 'components/lib';
import { FC, useEffect } from 'react';

import { IGoogleSignInProps } from './GoogleSignIn.types';

export const GoogleSignIn: FC<IGoogleSignInProps> = (props) => {
  useEffect(() => {
    window.onload = function (): void {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: '764412195563-ksihv19p11m367utqkn6421j3k0n6nc3.apps.googleusercontent.com',
        callback: console.log,
      });
      // @ts-ignore
      google.accounts.id.renderButton(document.getElementById(props.id), {
        theme: 'outline',
        size: 'large',
      });
    };
  }, [props.id, props.width]);

  return (
    <Button
      id={props.id}
      type='button'
      style={{ padding: 0, border: '1px solid red', overflow: 'hidden' }}
      className={props.className}
    />
  );
};
