import * as React from 'react';
import CloseIcon from '@/components/Icons/Close'
import ac_strings from '@/strings/ac_strings.json'

interface ISearchHistory {
    searches: string[]
    removeSearchHistory: (query: string) => void
    useSearchHistory: (query: string) => void
    clearSearchHistory: () => void
}
const SearchHistory: React.FC<ISearchHistory> = ({ searches, removeSearchHistory, useSearchHistory, clearSearchHistory }) => {
    return (
        <div className="p-4 bg-white min-h-screen">
            <h6 className="font-semibold text-d4slate-dark pb-6">{ac_strings.recentSearches}</h6>
            {searches.length === 0 ? (
                <div>
                    <p className="text-sm text-gray-800 pb-4">
                        <i>{ac_strings.searchHistoryEmpty}</i>
                    </p>
                </div>
            ) : (
                    <div>
                        {searches.map((search, i) => (
                            <div className="flex justify-between items-baseline" key={i}>
                                <button
                                    className="text-d4secondary pb-6"
                                    onClick={() => useSearchHistory(search)}
                                >
                                    {search}
                                </button>
                                <button onClick={() => removeSearchHistory(search)}>
                                    <CloseIcon className="mr-2" customSize={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            <button
                className="text-d4black text-sm rounded-xl border border-d4gray py-2 px-4 w-content m-auto uppercase"
                onClick={clearSearchHistory}
            >
                {ac_strings.clearRecentSearches}
            </button>
        </div >

    )
}

export default SearchHistory