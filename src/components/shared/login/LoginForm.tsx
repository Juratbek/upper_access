import { Input } from 'components/lib';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

export const LoginForm: FC = () => {
  const { register } = useForm();

  return (
    <form>
      <div className='mb-2'>
        <label htmlFor='Login'>Login</label>
        <Input {...register('username')} />
      </div>
      <div className='mb-2'>
        <label htmlFor='Login'>Password</label>
        <Input {...register('username')} type='password' />
      </div>
    </form>
  );
};
