import { AxiosError, AxiosResponse } from 'axios';

export type TStatus = 'idle' | 'loading' | 'error' | 'success';
export interface IUseMutation {
  mutate: (args: TMutationFunction) => Promise<void>;
  data: AxiosResponse | null;
  error: AxiosError | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  status: TStatus;
}

export type TMutationFunction = {
  method?: 'post' | 'put';
  url: string;
  data: { [key: string]: unknown } | FormData;
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
};
