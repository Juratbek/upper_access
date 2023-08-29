import { useState } from 'react';
import api from 'services/api';
import { MutationState, TArgsMutationFunction, TUseMutation } from './useMutation.types';

const useMutation = (): TUseMutation & MutationState => {
  const [state, setState] = useState<MutationState>({
    data: null,
    error: null,
    isError: false,
    isLoading: false,
    status: 'idle',
  });

  const mutate = async ({ method = 'post', url, data }: TArgsMutationFunction): Promise<void> => {
    setState({ ...state, isLoading: true, error: null, status: 'loading' });
    try {
      const response = await api[method](url, data);
      setState({ ...state, data: response.data, isLoading: false, status: 'success' });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        status: 'error',
        error: error,
      });
    }
  };

  return { ...state, mutate };
};

export default useMutation;
