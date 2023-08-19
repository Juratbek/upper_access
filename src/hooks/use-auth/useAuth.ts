import { IAuthContext, AuthContext } from 'context/auth';
import { useContext } from 'react';

export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};
