import { useCallback, useMemo } from 'react';
import { IUrsParams } from './useParams.types';

export const useParams = (): IUrsParams => {
  const search = useMemo(() => window.location.search, []);

  const params: URLSearchParams = useMemo(() => new URLSearchParams(search), [search]);

  const getParam = useCallback((name: string) => params.get(name), [params]);

  return {
    getParam,
  };
};
