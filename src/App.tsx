import { JSX } from 'react';
import { AuthProvider } from 'context/auth';
import { MainPage, IFrame } from 'pages';
import { Header } from 'components/shared';
import './styles/index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <MainPage />
      </>
    ),
  },
  {
    path: '/btn',
    element: <IFrame />,
  },
]);

function App(): JSX.Element {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
