import { IAuthContext } from 'context/auth';
import { IAuthData } from 'types';

export type TAuthenticate = (data: IAuthData) => void;

export type TApplication = 'web' | 'mobile';

export interface IUseAuth extends IAuthContext {
  authenticate: TAuthenticate;
}
