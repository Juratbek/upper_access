export interface IUseRecaptcha {
  getToken: () => Promise<string>;
}
