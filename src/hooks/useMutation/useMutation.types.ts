import { AxiosError, AxiosResponse } from 'axios';

export type TUseMutation = {
  mutate: (args: TArgsMutationFunction) => Promise<void>;
};

export interface MutationState {
  data: AxiosResponse | null;
  error: object | null;
  isLoading: boolean;
  isError: boolean;
  status: 'idle' | 'loading' | 'error' | 'success';
}

export type TArgsMutationFunction = {
  method: 'post' | 'put';
  url: string;
  data: { [key: string]: string | number | object | null };
};
