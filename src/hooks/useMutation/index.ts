import { useState } from 'react';
import { IMutationState, TArgsMutationFunction, TUseMutation } from './useMutation.types';
import { AxiosError } from 'axios';
import { api } from 'services';

const useMutation = (): TUseMutation & IMutationState => {
  const [state, setState] = useState<IMutationState>({
    data: null,
    error: null,
    isError: false,
    isLoading: false,
    status: 'idle',
  });

  const mutate = async ({
    method = 'post',
    url,
    data,
    onSuccess,
    onError,
  }: TArgsMutationFunction): Promise<void> => {
    setState({ ...state, isLoading: true, status: 'loading' });
    try {
      const response = await api[method](url, data);
      if (onSuccess) {
        onSuccess(response.data);
      }
      setState({ ...state, data: response.data, isLoading: false, status: 'success' });
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        if (onError) {
          onError(error);
        }
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
  };

  return { ...state, mutate };
};

export default useMutation;
