import { useEffect, useRef, useState } from "react";
import { BiSearch, BiX, BiFilterAlt } from "react-icons/bi";

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    delay?: number;
}

export const SearchBar = ({ placeholder = "Search…", onSearch, delay = 300 }: SearchBarProps) => {
    const [query, setQuery] = useState("");
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
        <div className="flex items-center bg-primary-accent/10 rounded-lg shadow-sm w-full max-w-4xl px-2">
            <button className="p-2 text-primary-accent">
                <BiFilterAlt className="text-xl" />
            </button>

            <input
                className="flex-1 bg-transparent px-3 py-2 outline-none text-primary-accent placeholder-gray-500"
                value={query}
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fireSearch()}
            />

            {query && (
                <button onClick={() => setQuery("")} className="p-2 text-primary-accent/70" aria-label="Clear">
                    <BiX className="text-xl" />
                </button>
            )}

            <button onClick={fireSearch} className="p-2 text-primary-accent" aria-label="Search">
                <BiSearch className="text-xl" />
            </button>
        </div>
    );
};
