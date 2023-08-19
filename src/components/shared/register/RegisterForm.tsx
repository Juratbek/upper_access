import { Button, Error, Input } from 'components/lib';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { REGISTER_FORM_FIELDS } from './RegisterForm.constants';
import { TSubmitFormEvent } from 'types';

const { name, bio } = REGISTER_FORM_FIELDS;

export const RegisterForm: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitHandler = useCallback((event: TSubmitFormEvent) => {
    console.log('🚀 ~ file: LoginForm.tsx:17 ~ submitHandler ~ event:', event);
  }, []);

  return (
    <form onSubmit={handleSubmit(submitHandler)} role='register-form'>
      <div className='mb-2'>
        <label htmlFor='name'>Blog nomi</label>
        <Input {...register(name.name, name.options)} id='name' />
        <Error error={errors[name.name]} />
      </div>
      <div className='mb-2'>
        <label htmlFor='bio'>Bio (ixtiyoriy)</label>
        <Input {...register(bio.name, bio.options)} id='bio' />
        <Error error={errors[bio.name]} />
      </div>
      <Button>Davom etish</Button>
    </form>
  );
};
