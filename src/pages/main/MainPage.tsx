import { GoogleSignIn, TelegramLoginButton } from 'components/auth';
import { Divider, StorysetImage } from 'components/lib';
import { LoginForm, RegisterForm } from 'components/shared';
import { useAuth } from 'hooks';
import { JSX, useCallback, useMemo, useState } from 'react';
import { TForm } from './MainPage.types';
import { AuthLoading } from './components';

export function MainPage(): JSX.Element {
  const { status: authStatus } = useAuth();
  const [formType, setFormType] = useState<TForm>('login');

  const changeForm = useCallback((type: TForm) => () => setFormType(type), []);
  const formComponent = useMemo(() => {
    if (formType === 'login') return <LoginForm onChangeForm={changeForm('register')} />;
    if (formType === 'register') return <RegisterForm resetFormType={changeForm('login')} />;
    return null;
  }, [formType, changeForm]);

  const authComponent = useMemo(() => {
    if (authStatus === 'loading') {
      return <AuthLoading />;
    }

    return (
      <>
        {formComponent}
        <Divider className='my-2' color='medium-gray' />
        <div>
          <GoogleSignIn id='sign-in' />
          <TelegramLoginButton botName='upper_local_dev_bot' />
        </div>
      </>
    );
  }, [authStatus, formComponent]);

  return (
    <div className='container d-flex justify-content-around'>
      <StorysetImage width={500} height={500} src='/storyset/otp.svg' storysetUri='user' />
      <div style={{ width: '20rem' }}>{authComponent}</div>
    </div>
  );
}
