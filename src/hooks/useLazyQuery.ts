import { useState, useCallback } from 'react';

type QueryStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseLazyQueryResult<TData> {
  data: TData | null;
  error: Error | null;
  status: QueryStatus;
  execute: () => Promise<void>;
  isLoading: boolean;
}

function useLazyQuery<TData>(fetchFunction: () => Promise<TData>): UseLazyQueryResult<TData> {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<QueryStatus>('idle');

  const execute = useCallback(async () => {
    setStatus('loading');
    setError(null);

    try {
      const result = await fetchFunction();
      setData(result);
      setStatus('success');
    } catch (err) {
      setError(err as Error);
      setStatus('error');
    }
  }, [fetchFunction]);

  return { data, error, status, execute, isLoading: status === "loading" };
}

export default useLazyQuery;
