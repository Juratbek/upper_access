import { validateLogin, validatePassword } from './auth';

describe('validatePassword', () => {
  it('returns true for "Passw0rd"', () => {
    const isValid = validatePassword('Passw0rd');
    expect(isValid).toEqual(true);
  });

  it('returns false if password does not contain lowercase letter', () => {
    const isValid = validatePassword('PASSW0RD');
    expect(isValid).toEqual(false);
  });

  it('returns false if password does not contain a number', () => {
    const isValid = validatePassword('Password');
    expect(isValid).toEqual(false);
  });

  it('returns false if password does not contain an uppercase letter', () => {
    const isValid = validatePassword('passw0rd');
    expect(isValid).toEqual(false);
  });
});

describe('validateLogin', () => {
  it('returns true for "username123"', () => {
    const isValid = validateLogin('username123');
    expect(isValid).toEqual(true);
  });

  it('returns false if username starts with underscore', () => {
    const isValid = validateLogin('_username');
    expect(isValid).toEqual(false);
  });

  it('returns false if username ends with underscore', () => {
    const isValid = validateLogin('username_');
    expect(isValid).toEqual(false);
  });

  it('returns false if username ends with underscore', () => {
    const isValid = validateLogin('username_');
    expect(isValid).toEqual(false);
  });

  it('returns false if username contains one of !@#$%^&*()-;:\'",. characters', () => {
    const isValid1 = validateLogin('usernam!e');
    expect(isValid1).toEqual(false);

    const isValid2 = validateLogin('usernam@e');
    expect(isValid2).toEqual(false);

    const isValid4 = validateLogin('usernam$e');
    expect(isValid4).toEqual(false);

    const isValid5 = validateLogin('usernam%e');
    expect(isValid5).toEqual(false);

    const isValid6 = validateLogin('usernam^e');
    expect(isValid6).toEqual(false);

    const isValid7 = validateLogin('usernam&e');
    expect(isValid7).toEqual(false);

    const isValid8 = validateLogin('usernam*e');
    expect(isValid8).toEqual(false);

    const isValid9 = validateLogin('usernam(e');
    expect(isValid9).toEqual(false);

    const isValid0 = validateLogin('usernam)e');
    expect(isValid0).toEqual(false);

    const isValidSemicolon = validateLogin('usernam;e');
    expect(isValidSemicolon).toEqual(false);

    const isValidTwoPoints = validateLogin('usernam:e');
    expect(isValidTwoPoints).toEqual(false);

    const isValidComma = validateLogin('usernam,e');
    expect(isValidComma).toEqual(false);

    const isValidDot = validateLogin('usernam.e');
    expect(isValidDot).toEqual(false);
  });
});
