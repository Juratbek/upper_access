import { GoogleSignIn, TelegramLoginButton } from 'components/auth';
import { Divider, StorysetImage } from 'components/lib';
import { useAuth } from 'hooks';
import { JSX, useMemo } from 'react';
import { AuthLoading, LoginForm } from './components';

import classes from './MainPage.module.scss';

export function MainPage(): JSX.Element {
  const { status: authStatus } = useAuth();

  const authComponent = useMemo(() => {
    if (authStatus === 'loading') {
      return <AuthLoading />;
    }

    return (
      <>
        <LoginForm />
        <Divider className='my-1' color='medium-gray' />
        <GoogleSignIn id='sign-in' className='mb-1 w-100' />
        <TelegramLoginButton botName={import.meta.env.VITE_TELEGRAM_BOT} />
      </>
    );
  }, [authStatus]);

  return (
    <div className={`${classes.container} container d-flex justify-content-around`}>
      <StorysetImage className={classes.image} src='/storyset/otp.svg' storysetUri='user' />
      <div className={classes.form}>{authComponent}</div>
    </div>
  );
}
