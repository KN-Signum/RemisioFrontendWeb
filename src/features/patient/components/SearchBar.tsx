import React, { useState } from "react";
import { BiWorld } from "react-icons/bi";

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", onSearch }) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="flex items-center justify-center bg-primary-accent/10 rounded-sm border border-gray-300 shadow-xl w-full max-w-4xl mx-auto p-0.5">
            <button
                onClick={handleSearch}
                className="px-2"
            >
                <span className="material-icons text-primary-accent">sort</span>
            </button>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="bg-transparent flex-1 px-4 py-2 outline-none text-primary-accent placeholder-gray-500"
            />
            <button
                onClick={handleSearch}
                className="px-2"
            >
                <span className="material-icons text-primary-accent">search</span>
            </button>
        </div>
    );
};
