import { JSX } from 'react';
import { AuthProvider } from 'context/auth';
import { MainPage } from 'pages';
import { Header } from 'components/shared';
import './styles/index.scss';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Header />
      <MainPage />
    </AuthProvider>
  );
}

export default App;
