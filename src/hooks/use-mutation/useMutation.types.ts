import { AxiosError, AxiosResponse } from 'axios';

export type TMutationStatus = 'idle' | 'loading' | 'error' | 'success';

export type TObject = Record<string, unknown>;

export type TMutationParams<Body, Response> = {
  method?: 'POST' | 'PUT';
  url: string;
  data: Body;
  onSuccess?: (data: Response) => void;
  onError?: (error: unknown) => void;
};

export type TMutationFunction<Body, Response> = (
  params: TMutationParams<Body, Response>,
) => Promise<Pick<IUseMutation, 'data'>>;

export interface IUseMutation<Body = unknown, Response = unknown> {
  mutate: TMutationFunction<Body, Response>;
  data: AxiosResponse | null;
  error: AxiosError | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  status: TMutationStatus;
}
