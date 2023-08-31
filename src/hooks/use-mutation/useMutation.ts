import { useCallback, useState } from 'react';
import { IMutationState, TMutationFunction, IUseMutation } from './useMutation.types';
import { AxiosError } from 'axios';
import { axiosInstance } from 'services';

export const useMutation = (): IUseMutation & IMutationState => {
  const [state, setState] = useState<IMutationState>({
    data: null,
    error: null,
    isError: false,
    isLoading: false,
    status: 'idle',
  });

  const mutate = useCallback(
    async ({
      data,
      url,
      method = 'post',
      onError,
      onSuccess,
    }: TMutationFunction): Promise<void> => {
      setState({ ...state, isLoading: true, status: 'loading' });
      try {
        const response = await axiosInstance[method](url, data);
        onSuccess?.(response.data);
        setState({ ...state, data: response.data, isLoading: false, status: 'success' });
      } catch (error: AxiosError | unknown) {
        if (error instanceof AxiosError) {
          onError?.(error);
          setState({
            ...state,
            isLoading: false,
            isError: true,
            status: 'error',
            error,
          });
          return;
        }
        setState({
          ...state,
          isLoading: false,
          isError: true,
          status: 'error',
        });
      }
    },
    [state],
  );
  return { ...state, mutate };
};
