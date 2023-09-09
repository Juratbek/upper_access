export interface ILoginFormProps {
  onChangeForm: () => void;
}

export interface ILoginDto {
  username: string;
  password: string;
  reCaptchaResponse: string;
}
