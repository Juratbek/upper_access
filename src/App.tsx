import { JSX } from 'react';
import { AuthProvider } from 'context/auth';
import { MainPage, IFrame } from 'pages';
import { Footer, Header } from 'components/shared';
import './styles/index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className='d-flex flex-col w-100' style={{ minHeight: '100vh' }}>
        <Header />
        <main className='flex-1'>
          <MainPage />
        </main>
        <Footer />
      </div>
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
