import { GoogleSignIn, TelegramLoginButton } from 'components/auth';
import { Divider, StorysetImage } from 'components/lib';
import { LoginForm } from 'components/shared';
import { useAuth } from 'hooks';
import { JSX, useMemo } from 'react';
import { AuthLoading } from './components';

export function MainPage(): JSX.Element {
  const { status: authStatus } = useAuth();

  const authComponent = useMemo(() => {
    if (authStatus === 'loading') {
      return <AuthLoading />;
    }

    return (
      <>
        <LoginForm />
        <Divider className='my-2' color='medium-gray' />
        <div>
          <GoogleSignIn id='sign-in' />
          <TelegramLoginButton botName='upper_local_dev_bot' />
        </div>
      </>
    );
  }, [authStatus]);

  return (
    <div className='container d-flex justify-content-around'>
      <StorysetImage width={500} height={500} src='/storyset/otp.svg' storysetUri='user' />
      <div style={{ width: '20rem' }}>{authComponent}</div>
    </div>
  );
}
