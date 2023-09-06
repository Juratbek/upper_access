import { useCallback, useState } from 'react';
import { TMutationFunction, IUseMutation, TStatus } from './useMutation.types';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from 'services';

export const useMutation = (): IUseMutation => {
  const [data, setData] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [status, setStatus] = useState<TStatus>('idle');

  const mutate: TMutationFunction = useCallback(
    async ({ data, url, method = 'POST', onError, onSuccess }) => {
      setIsLoading(true);
      setStatus('loading');
      try {
        const response = await axiosInstance({ url, data, method });
        onSuccess?.(response.data);
        setData(response.data);
        setIsLoading(false);
        setStatus('success');
        setIsSuccess(true);
        return response.data;
      } catch (error: AxiosError | unknown) {
        if (error instanceof AxiosError) {
          onError?.(error);
          setIsLoading(false);
          setIsError(true);
          setStatus('error');
          setError(error);
          setIsSuccess(false);
          return;
        }
        setIsLoading(false);
        setIsSuccess(false);
        setStatus('error');
        setIsError(true);
      }
    },
    [],
  );
  return { data, error, isError, isLoading, status, isSuccess, mutate };
};
