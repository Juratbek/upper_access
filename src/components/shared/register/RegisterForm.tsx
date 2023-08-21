import { Button, Error, Input } from 'components/lib';
import { FC, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { REGISTER_FORM_FIELDS } from './RegisterForm.constants';
import { TSubmitFormEvent } from 'types';
import { PasswordValidityLevel, UsernameValidityError } from '..';

const { name, bio, login, password } = REGISTER_FORM_FIELDS;

export const RegisterForm: FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const submitHandler = useCallback((event: TSubmitFormEvent) => {
    console.log('🚀 ~ file: LoginForm.tsx:17 ~ submitHandler ~ event:', event);
  }, []);

  const incrementCurrentStep = useCallback(() => setCurrentStep((prev) => ++prev), []);

  const firstStep = useMemo(
    () => (
      <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
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
        <div className='mb-2'>
          <label htmlFor='bio'>Elektron pochta (ixtiyoriy)</label>
          <Input {...register(bio.name, bio.options)} id='bio' />
          <Error error={errors[bio.name]} />
        </div>
      </div>
    ),
    [errors, register, currentStep],
  );

  const secondStep = useMemo(
    () => (
      <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
        <div className='mb-2'>
          <label htmlFor='name'>Login</label>
          <Input {...register(login.name, login.options)} id='name' />
          <UsernameValidityError
            value={watch(login.name)}
            show={Boolean(errors[login.name])}
            error={errors[login.name]}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='bio'>Parol</label>
          <Input {...register(password.name, password.options)} id='bio' type='password' />
          <PasswordValidityLevel password={watch(password.name)} />
        </div>
        <div className='mb-2'>
          <label htmlFor='bio'>Parolni qayta kiriting</label>
          <Input
            id='check-password'
            type='password'
            {...register('check-password', {
              required: 'Parolni takrorlang',
              validate: (value) => value === watch(password.name),
            })}
          />
          <Error error={errors['check-password']} />
        </div>
      </div>
    ),
    [currentStep, errors, register, watch],
  );

  return (
    <form onSubmit={handleSubmit(submitHandler)} role='register-form'>
      <div>
        {firstStep}
        {secondStep}
        <Button className='w-100' onClick={incrementCurrentStep} type='button'>
          Davom etish
        </Button>
      </div>
    </form>
  );
};
