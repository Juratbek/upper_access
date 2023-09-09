import { useCallback, useEffect } from 'react';
import { IUseRecaptcha } from './useRecaptcha.types';

export const useRecaptcha = (): IUseRecaptcha => {
  useEffect(() => {
    const recaptchaScript = document.getElementById('recaptcha-script');
    if (recaptchaScript) return;

    const script = document.createElement('script');
    script.setAttribute(
      'src',
      `https://www.google.com/recaptcha/enterprise.js?render=${
        import.meta.env.VITE_RECAPTCHA_SITE_KEY
      }`,
    );
    script.setAttribute('id', 'recaptcha-script');
    script.setAttribute('async', 'true');
    script.setAttribute('defer', 'true');
    document.head.appendChild(script);
  }, []);

  const getToken = useCallback(() => {
    return new Promise<string>((resolve) => {
      grecaptcha.enterprise.ready(async () => {
        const token = await grecaptcha.enterprise.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
          action: 'LOGIN',
        });
        resolve(token);
      });
    });
  }, []);

  return { getToken };
};
