import { useCallback, useState } from 'react';
import {
  IStatusesState,
  IUseMutation,
  IUseMutationConfig,
  TMutationFunction,
  TMutationStatus,
} from './useMutation.types';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from 'services';
import { IApiErrorResponse } from 'types';

export const useMutation = <Body, Response, Error = IApiErrorResponse>(
  config?: IUseMutationConfig<Response, Error>,
): IUseMutation<Body, Response, Error> => {
  const { onError, onSuccess } = config || {};
  const [data, setData] = useState<Response>();
  const [error, setError] = useState<AxiosError<Error>>();
  const [status, setStatus] = useState<TMutationStatus>('idle');
  const [statuses, setStatuses] = useState<IStatusesState>({
    isLoading: false,
    isError: false,
    isSuccess: false,
  });

  const successHandler = useCallback(
    (response: AxiosResponse<Response>) => {
      onSuccess?.(response.data);
      setData(response.data);
      setStatus('success');
      setStatuses(() => ({
        isLoading: false,
        isError: false,
        isSuccess: true,
      }));
    },
    [onSuccess],
  );

  const errorHandler = useCallback(
    (error: AxiosError<Error>) => {
      onError?.(error);
      setError(error);
      setStatus('error');
      setStatuses(() => ({
        isError: true,
        isLoading: false,
        isSuccess: false,
      }));
    },
    [onError],
  );

  const mutate: TMutationFunction<Body, Response> = useCallback(
    async ({ method = 'POST', ...config }) => {
      setStatuses((prev) => ({ ...prev, isLoading: true }));
      setStatus('loading');
      try {
        const response = await axiosInstance<Response>({
          method,
          ...config,
        });
        successHandler(response);
        return response.data;
      } catch (error: unknown) {
        errorHandler(error as AxiosError<Error>);
      }
    },
    [successHandler, errorHandler],
  );
  return { ...statuses, data, error, status, mutate };
};
