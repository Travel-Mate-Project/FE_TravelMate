import {useState} from 'react';

export const useSearch = (nav: string, filterName: string) => {
  const [navSelect, setNavSelect] = useState<string>(nav);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>(filterName);

  return {navSelect, setNavSelect, search, setSearch, filter, setFilter};
};
