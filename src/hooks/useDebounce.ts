import {debounce} from 'lodash';
import {useCallback, useEffect, useState} from 'react';

export const useDebounce = (searchQuery: string, delay = 300) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce((newQuery: string) => {
      setQuery(newQuery);
    }, delay),
    [delay],
  );

  useEffect(() => {
    debouncedSearch(searchQuery);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  return query;
};
