import { CloseIcon } from '@/components/Icons/MUI/arrowIcons';
import ac_strings from '@/strings/ac_strings.js';
import * as React from 'react';

interface ISearchHistory {
	searches: string[];
	removeSearchHistory: (query: string) => void;
	useSearchHistory: (query: string) => void;
	clearSearchHistory: () => void;
}
const SearchHistory: React.FC<ISearchHistory> = ({
	searches,
	removeSearchHistory,
	useSearchHistory,
	clearSearchHistory
}) => {
	return (
		<div className="p-4 bg-white min-h-screen">
			<h6 className="font-semibold text-ac-slate-dark pb-6">{ac_strings.recent_searches}</h6>
			{searches.length === 0 ? (
				<div>
					<p className="text-sm text-gray-800 pb-4">
						<i>{ac_strings.search_history_empty}</i>
					</p>
				</div>
			) : (
				<div>
					{searches.map((search, i) => (
						<div className="flex justify-between items-baseline" key={i}>
							<button className=" pb-6" onClick={() => useSearchHistory(search)}>
								{search}
							</button>
							<button onClick={() => removeSearchHistory(search)}>
								<CloseIcon customSize="4" className="fill-secondary" />
							</button>
						</div>
					))}
				</div>
			)}
			<button
				className="text-d4black text-sm rounded-xl border border-ac-gray py-2 px-4 w-content m-auto uppercase"
				onClick={clearSearchHistory}
			>
				{ac_strings.clear_recent_searches}
			</button>
		</div>
	);
};

export default SearchHistory;
