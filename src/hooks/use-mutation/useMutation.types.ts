import { AxiosError } from 'axios';

export type TMutationStatus = 'idle' | 'loading' | 'error' | 'success';

export type TObject = Record<string, unknown>;

export type TMutationParams<Body> = {
  method?: 'POST' | 'PUT';
  url: string;
  data: Body;
};

export type TMutationFunction<Body, Response> = (
  params: TMutationParams<Body>,
) => Promise<Response | undefined>;

export interface IUseMutation<Body, Response, Error> {
  mutate: TMutationFunction<Body, Response>;
  data?: Response;
  error?: AxiosError<Error>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  status: TMutationStatus;
}

export interface IUseMutationConfig<Response, Error> {
  onSuccess?: (data: Response) => void;
  onError?: (error: AxiosError<Error>) => void;
}

export interface IStatusesState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}
