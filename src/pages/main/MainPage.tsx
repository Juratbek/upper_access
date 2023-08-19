import { JSX, useMemo } from 'react';
import { StorysetImage, Divider } from 'components/lib';
import { LoginForm } from 'components/shared';
import { GoogleSignIn, TelegramLoginButton } from 'components/auth';
import { useAuth } from 'hooks';

export function MainPage(): JSX.Element {
  const { status: authStatus } = useAuth();

  const authComponent = useMemo(() => {
    if (authStatus === 'loading') {
      return (
        <div className='d-flex flex-col justify-content-center h-100 align-items-center'>
          <h3>Yuklanmoqda...</h3>
          <p>iltimos kuting</p>
        </div>
      );
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
