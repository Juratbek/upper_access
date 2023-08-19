export const validatePassword = (value: string): boolean =>
  /[A-ZА-Я]/.test(value) && /[a-zа-я]/.test(value) && /[0-9]/.test(value);

export const validateLogin = (value: string): boolean =>
  /^[A-Za-z][A-Za-z0-9_]*[A-Za-z0-9]$/.test(value);
