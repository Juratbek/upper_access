import { JSX } from 'react';
import { StorysetImage, Divider } from 'components/lib';
import { Header, LoginForm } from 'components/shared';
import './styles/index.scss';
import { GoogleSignIn, TelegramLoginButton } from 'components/auth';

function App(): JSX.Element {
  return (
    <div>
      <Header />
      <div className='container d-flex justify-content-around'>
        <StorysetImage width={500} height={500} src='/storyset/otp.svg' storysetUri='user' />
        <div style={{ width: '20rem' }}>
          <LoginForm />
          <Divider className='my-2' color='medium-gray' />
          <div>
            <GoogleSignIn id='sign-in' />
            <TelegramLoginButton botName='upper_local_dev_bot' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
