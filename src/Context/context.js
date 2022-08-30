import React from 'react';
import { useState, createContext } from 'react';

const SearchContext = createContext();

const ContextProvider = ({ children }) => {
    const [searchValue, setSearchValue] = useState('');
    const value = {
        searchValue,
        setSearchValue,
    };

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export { SearchContext, ContextProvider };
