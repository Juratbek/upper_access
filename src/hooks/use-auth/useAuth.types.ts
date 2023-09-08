import { IAuthContext } from 'context/auth';
import { IAuthData } from 'types';

export type TAuthenticate = (data: IAuthData) => void;

export interface IUseAuth extends IAuthContext {
  authenticate: TAuthenticate;
}
