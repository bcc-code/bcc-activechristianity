import { connectSearchBox } from 'react-instantsearch-dom';

import * as React from 'react';

import SearchInput from '@/components/Search'
import SearchHistory from '@/layout-parts/Explore/SearchHistory'
import localStorageHelper from '@/helpers/localStorage'
import SearchIcon from '@/components/Icons/Search';
import { SubSection } from '@/layout-parts/Explore/ExploreByType'
import newString from '@/strings/ac_strings.json'

interface ICustomerSearchBox {
    setQuery: (query: string) => void
    removeTypeFilter: (filter?: string) => void
    removeTaxonomyFilter: (filter?: string) => void
    isInputFocus: boolean
    setInputFocus: (status: boolean) => void
    refine: (item: any) => void
    currentRefinement: any
    isSearchStalled: boolean
    searchHistory: string[]
    setSearchHistory: (string: []) => void
    showExploreHome: boolean
    showSearchHistory: boolean
    topSearches: string[]
}

const SearchBox: React.FC<ICustomerSearchBox> = ({
    setQuery,
    removeTypeFilter,
    removeTaxonomyFilter,
    refine,
    setInputFocus,
    isInputFocus,
    searchHistory,
    setSearchHistory,
    isSearchStalled,
    showExploreHome,
    showSearchHistory,
    topSearches

}) => {

    const [localQuery, setLocalQuery] = React.useState('')
    const timerId = React.useRef<NodeJS.Timeout | null>(null)

    const onChangeDebounced = (event: any) => {

        const value = event.currentTarget.value;
        updateQuery(value)
    };

    const useSearchHistory = (value: string) => {
        updateQuery(value)
    }
    const updateQuery = (value: string) => {
        if (timerId.current) {
            clearTimeout(timerId.current);
        }

        timerId.current = setTimeout(() => {
            refine(value)
            setQuery(value)
        }, 500)

        setLocalQuery(value)
    }

    const cancelSearch = () => {

        setInputFocus(false)
        clearInput()
    }

    const clearInput = () => {
        refine('')
        setQuery('')
        setLocalQuery('')
        removeTypeFilter()
        removeTaxonomyFilter()
    }

    const removeSearchHistory = (q: string) => {
        localStorageHelper.removeQuery(q)
        const updatedSearchHistory = localStorageHelper.getStoredHistory()
        setSearchHistory(updatedSearchHistory)
    }

    const clearSearchHistory = () => {
        localStorageHelper.clearHistory()
        const updatedSearchHistory = localStorageHelper.getStoredHistory()
        setSearchHistory(updatedSearchHistory)
    }
    return (
        <div>
            <div className={`flex w-full px-4 sm:px-0 pb-4 sm:pb-8 ${isInputFocus ? 'pt-4 sm:pt-8' : ''}`}>
                <div className="w-full">
                    <SearchInput
                        placedholderText={newString.searchPlaceHolder}
                        setInputFocus={setInputFocus}
                        clearInput={clearInput}
                        value={localQuery}
                        onChange={onChangeDebounced}


                    />
                </div>
                {isInputFocus && (
                    <button
                        className="pl-2 block text-sm"
                        onClick={cancelSearch}
                        onKeyDown={cancelSearch}
                    >
                        {newString.cancel}
                    </button>
                )}
            </div>

            {showSearchHistory && localQuery === "" &&
                (
                    <div className="max-w-tablet m-auto">
                        <SearchHistory
                            searches={searchHistory}
                            removeSearchHistory={removeSearchHistory}
                            useSearchHistory={useSearchHistory}
                            clearSearchHistory={clearSearchHistory}
                        />
                    </div>

                )

            }
            {showExploreHome && (
                <div className="max-w-tablet m-auto">
                    <SubSection title="Popular Searchs" icon={<SearchIcon className="w-4 h-4" />}>
                        <div className="grid grid-cols-2 gap-2 text-xs sm:text-base">
                            {topSearches.map((item, i) => {
                                return (
                                    <button
                                        className="text-left pb-1"
                                        key={i}
                                        onClick={() => { useSearchHistory(item) }}
                                    >
                                        {item}
                                    </button>
                                )
                            })}
                        </div>
                    </SubSection>
                </div>

            )}
        </div>

    );
}

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox