import { AxiosError, AxiosResponse } from 'axios';

export type IUseMutation = {
  mutate: (args: TMutationFunction) => Promise<void>;
};

export interface IMutationState {
  data: AxiosResponse | null;
  error: AxiosError | null;
  isLoading: boolean;
  isError: boolean;
  status: 'idle' | 'loading' | 'error' | 'success';
}

export type TMutationFunction = {
  method?: 'post' | 'put';
  url: string;
  data: { [key: string]: unknown } | FormData;
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
};
