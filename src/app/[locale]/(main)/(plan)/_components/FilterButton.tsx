import {FilterButtonProps} from '@/types';

export default function FilterButton({
  filterName,
  filter,
  setFilter,
}: FilterButtonProps) {
  return (
    <div className={'flex items-center gap-1.5 my-3'}>
      {filterName.map((item) => (
        <button
          key={item.key}
          className={`${
            filter === item.value
              ? 'bg-green100 text-white'
              : 'bg-white text-green100'
          } border border-solid border-green100 rounded-lg px-1.5 py-0.5 transition-all`}
          value={item.value}
          onClick={() => setFilter(item.value)}
          type={'button'}
        >
          {item.key}
        </button>
      ))}
    </div>
  );
}
