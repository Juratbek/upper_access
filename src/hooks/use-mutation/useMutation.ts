import { useCallback, useState } from 'react';
import {
  IStatusesState,
  IUseMutation,
  IUseMutationConfig,
  TMutationFunction,
  TMutationStatus,
} from './useMutation.types';
import { AxiosResponse } from 'axios';
import { axiosInstance } from 'services';

export const useMutation = <Body, Response>(
  config?: IUseMutationConfig<Response>,
): IUseMutation<Body, Response> => {
  const { onError, onSuccess } = config || {};
  const [data, setData] = useState<Response>();
  const [error, setError] = useState<unknown>();
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
    (error: unknown) => {
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
        errorHandler(error);
      }
    },
    [successHandler, errorHandler],
  );
  return { ...statuses, data, error, status, mutate };
};
