import { AxiosError, AxiosResponse } from 'axios';

export type TStatus = 'idle' | 'loading' | 'error' | 'success';

export type TMutationParams = {
  method?: 'POST' | 'PUT';
  url: string;
  data: { [key: string]: unknown } | object | FormData;
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
};

export type TMutationFunction = (params: TMutationParams) => Promise<Pick<IUseMutation, 'data'>>;

export interface IUseMutation {
  mutate: TMutationFunction;
  data: AxiosResponse | null;
  error: AxiosError | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  status: TStatus;
}
