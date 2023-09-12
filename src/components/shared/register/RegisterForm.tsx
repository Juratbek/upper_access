import { Alert, Button, Error, Input } from 'components/lib';
import { FC, useCallback, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { REGISTER_FORM_FIELDS } from './RegisterForm.constants';
import { IApiErrorResponse, IAuthData, TSubmitFormEvent } from 'types';
import { PasswordValidityLevel, UsernameValidityError } from '..';
import { useAuth, useMutation } from 'hooks';
import { AxiosError } from 'axios';
import { IRegisterDto } from './RegisterForm.types';
import { useRecaptcha } from 'hooks/use-recaptcha/useRecaptcha';

const { name, bio, login, password, email } = REGISTER_FORM_FIELDS;

export const RegisterForm: FC<{ resetFormType: () => void }> = ({ resetFormType }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [alert, setAlert] = useState<string>();
  const { authenticate } = useAuth();
  const { getToken: getRecaptchaToken } = useRecaptcha();

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    watch,
    // reset,
  } = useForm();
  const incrementCurrentStep = useCallback(() => setCurrentStep((prev) => ++prev), []);
  const decrementCurrentStep = useCallback(() => setCurrentStep((prev) => --prev), []);

  const registerErrorHandler = useCallback((error: AxiosError<IApiErrorResponse>) => {
    const { response } = error;
    setAlert(response?.data.message);
  }, []);

  const { mutate: registerWithCredentials } = useMutation<IRegisterDto, IAuthData>({
    onError: registerErrorHandler,
    onSuccess: authenticate,
  });

  const submitHandler = useCallback(
    async (event: TSubmitFormEvent) => {
      const { name, bio, login, password, email } = event;
      const payload = {
        ...(bio && { bio: bio }),
        ...(email && { email: email }),
        name,
        username: login,
        password,
      };
      const token = await getRecaptchaToken();
      registerWithCredentials({
        url: 'open/register',
        data: { ...payload, reCaptchaResponse: token },
      });
    },
    [registerWithCredentials, getRecaptchaToken],
  );

  const errorHandler = async (e: FieldErrors): Promise<void> => {
    if (currentStep === 1) {
      if (!(name.name in e || bio.name in e)) {
        incrementCurrentStep();
        clearErrors();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler, errorHandler)} role='register-form'>
      <Alert show={Boolean(alert)}>{alert}</Alert>
      <div>
        <div className='mb-2' style={{ display: currentStep === 1 ? 'block' : 'none' }}>
          <div className='mb-2'>
            <label htmlFor='name' className='block mb-1'>
              Blog nomi
            </label>
            <Input id='name' {...register(name.name, name.options)} />
            <Error error={errors[name.name]} />
          </div>
          <div className='mb-2'>
            <label htmlFor='bio' className='block mb-1'>
              Bio (ixtiyoriy)
            </label>
            <Input id='bio' {...register(bio.name, bio.options)} />
            <Error error={errors[bio.name]} />
          </div>
          <div className='mb-2'>
            <label htmlFor='email' className='d-block mb-1'>
              Elektron pochta (ixtiyoriy)
            </label>
            <Input
              id='email'
              placeholder='pochta@mail.com'
              type='email'
              {...register(email.name, email.options)}
            />
            <Error error={errors[email.name]} />
          </div>
        </div>
        <div className='mb-2' style={{ display: currentStep === 2 ? 'block' : 'none' }}>
          <div className='mb-2'>
            <label htmlFor='login' className='d-block mb-1'>
              Loginni kiriting
            </label>
            <Input id='login' {...register(login.name, login.options)} />
            <UsernameValidityError
              value={watch(login.name)}
              show={Boolean(errors[login.name])}
              error={errors[login.name]}
            />
          </div>

          <div className='mb-2'>
            <label htmlFor='password' className='d-block mb-1'>
              Parolni kiriting
            </label>
            <Input id='password' type='password' {...register(password.name, password.options)} />
            <PasswordValidityLevel password={watch(password.name)} />
          </div>
          <div className='mb-2'>
            <label htmlFor='check-password' className='d-block mb-1'>
              Parolni qayta kiriting
            </label>
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
        <Button className='w-100 mb-2'>
          {currentStep === 2 ? "Ro'yxatdan o'tish" : 'Davom etish'}
        </Button>
        {currentStep === 1 ? (
          <Button color='outline-dark' type='button' className='w-100' onClick={resetFormType}>
            Ortga
          </Button>
        ) : (
          <Button
            color='outline-dark'
            type='button'
            className='w-100'
            onClick={decrementCurrentStep}
          >
            Ortga
          </Button>
        )}
      </div>
    </form>
  );
};
