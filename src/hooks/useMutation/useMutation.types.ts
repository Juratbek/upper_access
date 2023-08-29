import { AxiosError, AxiosResponse } from 'axios';

export type TUseMutation = {
  mutate: (args: TArgsMutationFunction) => Promise<void>;
};

export interface IMutationState {
  data: AxiosResponse | null;
  error: AxiosError | null;
  isLoading: boolean;
  isError: boolean;
  status: 'idle' | 'loading' | 'error' | 'success';
}

export type TArgsMutationFunction = {
  method?: 'post' | 'put';
  url: string;
  data: { [key: string]: unknown } | FormData;
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
};
