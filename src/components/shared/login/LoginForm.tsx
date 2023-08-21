import { Button, Error, Input } from 'components/lib';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { LOGIN_FORM_FIELDS } from './LoginForm.constants';
import { TSubmitFormEvent } from 'types';
import { ILoginFormProps } from './LoginForm.types';

const { login, password } = LOGIN_FORM_FIELDS;

export const LoginForm: FC<ILoginFormProps> = ({ onRegister }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitHandler = useCallback((event: TSubmitFormEvent) => {
    console.log('🚀 ~ file: LoginForm.tsx:17 ~ submitHandler ~ event:', event);
  }, []);

  return (
    <form role='login-form' onSubmit={handleSubmit(submitHandler)}>
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
      <Button className='w-100 mb-1'>Kirish</Button>
      <Button className='w-100' color='outline-dark' onClick={onRegister}>
        Ro'yxatdan o'tish
      </Button>
    </form>
  );
};
