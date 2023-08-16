import { Button } from 'components/lib';
import { FC, useEffect } from 'react';

import { IGoogleSignInProps } from './GoogleSignIn.types';

export const GoogleSignIn: FC<IGoogleSignInProps> = (props) => {
  useEffect(() => {
    google.accounts.id.renderButton(document.querySelector(`#${props.id}`), {
      theme: 'outline',
      shape: 'pill',
      width: props.width || 332,
      locale: 'uz',
    });
  }, [props.id]);

  return (
    <Button
      id={props.id}
      type='button'
      style={{ padding: 0, border: '1px solid red' }}
      className={props.className}
    />
  );
};
