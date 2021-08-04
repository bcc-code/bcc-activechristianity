const localStorageKey = 'ac_search_history';

const isClient = typeof window !== 'undefined';

const ACLocalStorage = {
	getStoredHistory: () => {
		if (isClient) {
			const storedHistory = localStorage.getItem(localStorageKey);
			return storedHistory ? JSON.parse(storedHistory) : [];
		} else {
			return [];
		}
	},
	storeQuery: (query: string) => {
		if (isClient) {
			const searchHistory = ACLocalStorage.getStoredHistory();

			if (query !== '' && query.length > 2) {
				// example query: test5
				const fileredList: string[] = [query];
				for (let i = 0; i < searchHistory.length; i++) {
					const historyQuery = searchHistory[i];
					// example query: tes, test5

					const result = query.startsWith(historyQuery);
					if (!result) {
						fileredList.push(historyQuery);
					}
				}

				localStorage.setItem(localStorageKey, JSON.stringify(fileredList));
			}
		}
	},
	removeQuery: (query: string) => {
		if (isClient) {
			const searchHistory = ACLocalStorage.getStoredHistory();

			const findQuery = searchHistory.findIndex((elt: string) => elt === query);
			searchHistory.splice(findQuery, 1)[0];
			localStorage.setItem(localStorageKey, JSON.stringify(searchHistory));
		}
	},
	clearHistory: () => {
		if (isClient) {
			localStorage.removeItem(localStorageKey);
		}
	}
};

export default ACLocalStorage;
