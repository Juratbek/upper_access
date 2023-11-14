import { Alert, Button, Error, Input } from 'components/lib';
import { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LOGIN_FORM_FIELDS } from './LoginForm.constants';
import { IApiErrorResponse, IAuthData, TSubmitFormEvent } from 'types';
import { ILoginDto } from './LoginForm.types';
import { useAuth, useMutation } from 'hooks';
import { AxiosError } from 'axios';

const { login, password } = LOGIN_FORM_FIELDS;

export const LoginForm: FC = () => {
  const [alert, setAlert] = useState<string>();
  const { authenticate } = useAuth();

  const loginErrorHandler = useCallback((error: AxiosError<IApiErrorResponse>) => {
    const { response } = error;
    setAlert(response?.data.message);
  }, []);

  const { mutate: loginWithCredentials } = useMutation<ILoginDto, IAuthData>({
    onError: loginErrorHandler,
    onSuccess: authenticate,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitHandler = useCallback(
    async (event: TSubmitFormEvent) => {
      const { username, password } = event;
      loginWithCredentials({
        url: 'blog/open/login',
        data: { username, password },
      });
    },

    [loginWithCredentials],
  );

  return (
    <form role='login-form' onSubmit={handleSubmit(submitHandler)}>
      <Alert className='mb-2' show={Boolean(alert)}>
        {alert}
      </Alert>
      <div className='mb-2'>
        <label htmlFor='login'>Login</label>
        <Input {...register(login.name, login.options)} id='login' data-testid='login' />
        <Error error={errors[login.name]} />
      </div>
      <div className='mb-2'>
        <label htmlFor='password'>Password</label>
        <Input {...register(password.name, password.options)} type='password' id='password' />
        <Error error={errors[password.name]} />
      </div>
      <Button className='w-100' type='submit'>
        Kirish
      </Button>
    </form>
  );
};
