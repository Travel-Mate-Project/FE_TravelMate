import {debounce} from 'lodash';
import {useCallback, useEffect, useRef, useState} from 'react';

export const useDebounce = (searchQuery: string) => {
  const [query, setQuery] = useState('');

  const debouncedSearchRef = useRef(
    debounce((query: string) => {
      setQuery(query);
    }, 300),
  );

  const placeSearch = useCallback((query: string) => {
    debouncedSearchRef.current(query);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      placeSearch(searchQuery);
    }
  }, [searchQuery, placeSearch]);

  return query;
};
