import { useEffect, useRef, useState } from 'react';
import { BiSearch, BiX } from 'react-icons/bi';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  delay?: number;
}

export const SearchBar = ({
  placeholder = 'Search…',
  onSearch,
  delay = 300,
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* debounce */
  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => onSearch(query.trim()), delay);
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [query, delay, onSearch]);

  const fireSearch = () => {
    if (timeout.current) clearTimeout(timeout.current);
    onSearch(query.trim());
  };

  return (
    <div className="bg-foreground border-primary-accent/60 shadow-primary-accent flex w-full max-w-4xl items-center rounded-sm border px-2 shadow-xs">
      <input
        className="text-primary-accent flex-1 bg-transparent px-3 py-2 outline-none"
        value={query}
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && fireSearch()}
      />

      {query && (
        <button
          onClick={() => setQuery('')}
          className="text-primary-accent/70 hover:text-primary-accent rounded-max p-2 hover:cursor-pointer"
          aria-label="Clear"
        >
          <BiX className="text-xl" />
        </button>
      )}

      <button
        onClick={fireSearch}
        className="text-primary-accent p-2"
        aria-label="Search"
      >
        <BiSearch className="text-xl" />
      </button>
    </div>
  );
};
