import { Alert, Button, Error, Input } from 'components/lib';
import { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LOGIN_FORM_FIELDS } from './LoginForm.constants';
import { IApiErrorResponse, IAuthData, TSubmitFormEvent } from 'types';
import { ILoginDto, ILoginFormProps } from './LoginForm.types';
import { useMutation } from 'hooks';
import { AxiosError } from 'axios';
import { useRecaptcha } from 'hooks/use-recaptcha/useRecaptcha';

const { login, password } = LOGIN_FORM_FIELDS;

export const LoginForm: FC<ILoginFormProps> = ({ onChangeForm }) => {
  const { getToken: getRecaptchaToken } = useRecaptcha();
  const [alert, setAlert] = useState<string>();

  const loginErrorHandler = useCallback((error: AxiosError<IApiErrorResponse>) => {
    const { response } = error;
    setAlert(response?.data.message);
  }, []);

  const { mutate: loginWithCredentials } = useMutation<ILoginDto, IAuthData>({
    onError: loginErrorHandler,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitHandler = useCallback(
    async (event: TSubmitFormEvent) => {
      const { username, password } = event;
      const token = await getRecaptchaToken();
      loginWithCredentials({
        url: 'blog/open/login',
        data: { username, password, reCaptchaResponse: token },
      });
    },
    [loginWithCredentials, getRecaptchaToken],
  );

  return (
    <form role='login-form' onSubmit={handleSubmit(submitHandler)}>
      <Alert show={Boolean(alert)}>{alert}</Alert>
      <div className='mb-2'>
        <label htmlFor='login' id='login'>
          Login
        </label>
        <Input {...register(login.name, login.options)} id='login' data-testid='login' />
        <Error error={errors.username} />
      </div>
      <div className='mb-2'>
        <label htmlFor='password' id='password'>
          Password
        </label>
        <Input {...register(password.name, password.options)} type='password' id='password' />
      </div>
      <Button className='w-100 mb-1' type='submit'>
        Kirish
      </Button>
      <Button className='w-100' color='outline-dark' type='button' onClick={onChangeForm}>
        Ro'yxatdan o'tish
      </Button>
    </form>
  );
};
