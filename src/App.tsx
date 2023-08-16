import { Button, StorysetImage, Divider } from 'components/lib';
import { Header, LoginForm } from 'components/shared';
import './styles/index.scss';

function App(): JSX.Element {
  return (
    <div>
      <Header />
      <div className='container d-flex justify-content-around'>
        <StorysetImage width={500} height={500} src='/storyset/otp.svg' storysetUri='user' />
        <div style={{ width: '20rem' }}>
          <LoginForm />
          <Button className='w-100 mb-1'>Kirish</Button>
          <Button className='w-100' color='outline-dark'>
            Ro'yxatdan o'tish
          </Button>
          <Divider className='my-2' color='medium-gray' />
        </div>
      </div>
    </div>
  );
}

export default App;
