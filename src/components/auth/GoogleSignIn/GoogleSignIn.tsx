import { Button } from 'components/lib';
import { FC, useEffect } from 'react';

import { IGoogleSignInProps } from './GoogleSignIn.types';
import { renderGoogleSignInButton } from './utils';

export const GoogleSignIn: FC<IGoogleSignInProps> = (props) => {
  useEffect(() => {
    renderGoogleSignInButton(document.querySelector(`#${props.id}`), {
      theme: 'outline',
      shape: 'pill',
      width: props.width || 332,
      locale: 'uz',
    });
  }, [props.id, props.width]);

  return (
    <Button
      id={props.id}
      type='button'
      style={{ padding: 0, border: '1px solid red' }}
      className={props.className}
    />
  );
};
