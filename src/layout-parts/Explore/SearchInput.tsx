import SearchInput from '@/components/Search';
import localStorageHelper from '@/helpers/localStorage';
import SearchHistory from '@/layout-parts/Explore/SearchHistory';
import ac_strings from '@/strings/ac_strings.js';
import * as React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

interface ICustomerSearchBox {
	setQuery: (query: string) => void;
	removeTaxonomyFilter: (filter?: string) => void;
	isInputFocus: boolean;
	setInputFocus: (status: boolean) => void;
	refine: (item: any) => void;
	searchHistory: string[];
	setSearchHistory: (string: []) => void;
	showSearchHistory: boolean;
}

const SearchBox: React.FC<ICustomerSearchBox> = ({
	setQuery,
	removeTaxonomyFilter,
	refine,
	setInputFocus,
	isInputFocus,
	searchHistory,
	setSearchHistory,
	showSearchHistory
}) => {
	const [localQuery, setLocalQuery] = React.useState('');
	const timerId = React.useRef<NodeJS.Timeout | null>(null);

	const onChangeDebounced = (event: any) => {
		const value = event.currentTarget.value;
		updateQuery(value);
	};

	const useSearchHistory = (value: string) => {
		updateQuery(value);
	};
	const updateQuery = (value: string) => {
		if (timerId.current) {
			clearTimeout(timerId.current);
		}

		timerId.current = setTimeout(() => {
			refine(value);
			setQuery(value);
		}, 500);

		setLocalQuery(value);
	};

	const cancelSearch = () => {
		setInputFocus(false);
		clearInput();
	};

	const clearInput = () => {
		refine('');
		setQuery('');
		setLocalQuery('');
		removeTaxonomyFilter();
	};

	const removeSearchHistory = (q: string) => {
		localStorageHelper.removeQuery(q);
		const updatedSearchHistory = localStorageHelper.getStoredHistory();
		setSearchHistory(updatedSearchHistory);
	};

	const clearSearchHistory = () => {
		localStorageHelper.clearHistory();
		const updatedSearchHistory = localStorageHelper.getStoredHistory();
		setSearchHistory(updatedSearchHistory);
	};
	return (
		<div>
			<div className={`flex w-full px-4 sm:px-0 pt-8 sm:pt-0 ${isInputFocus ? 'sm:pt-8' : ''}`}>
				<div className="w-full text-mini sm:text-xs">
					<SearchInput
						placedholderText={ac_strings.searchPlaceHolder}
						setInputFocus={setInputFocus}
						clearInput={clearInput}
						value={localQuery}
						onChange={onChangeDebounced}
					/>
				</div>
				{isInputFocus && (
					<button className="pl-2 block text-xs sm:text-sm" onClick={cancelSearch} onKeyDown={cancelSearch}>
						{ac_strings.cancel}
					</button>
				)}
			</div>

			{showSearchHistory && localQuery === '' && (
				<div className="max-w-tablet m-auto  mt-8">
					<SearchHistory
						searches={searchHistory}
						removeSearchHistory={removeSearchHistory}
						useSearchHistory={useSearchHistory}
						clearSearchHistory={clearSearchHistory}
					/>
				</div>
			)}
		</div>
	);
};

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
