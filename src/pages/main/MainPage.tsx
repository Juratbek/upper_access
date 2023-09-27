import { GoogleSignIn, TelegramLoginButton } from 'components/auth';
import { Divider, StorysetImage } from 'components/lib';
import { LoginForm } from 'components/shared';
import { useAuth } from 'hooks';
import { JSX, useMemo } from 'react';
import { AuthLoading } from './components';

import classes from './MainPage.module.scss';

export function MainPage(): JSX.Element {
  const { status: authStatus } = useAuth();

  const authComponent = useMemo(() => {
    if (authStatus === 'loading') {
      return <AuthLoading />;
    }

    return (
      <div style={{ width: 300, marginTop: '7rem' }}>
        <LoginForm />
        <Divider className='my-2' color='medium-gray' />
        <GoogleSignIn id='sign-in' className='mb-1' />
        <TelegramLoginButton botName={import.meta.env.VITE_TELEGRAM_BOT} />
      </div>
    );
  }, [authStatus]);

  return (
    <div className={`${classes.container} container d-flex justify-content-around`}>
      <StorysetImage width={500} height={500} src='/storyset/otp.svg' storysetUri='user' />
      <div style={{ width: '20rem' }}>{authComponent}</div>
    </div>
  );
}
