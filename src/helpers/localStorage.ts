const localStorageKey = 'ac_search_history'

const isClient = typeof window !== 'undefined'

const ACLocalStorage = {
    getStoredHistory: () => {
        if (isClient) {
            const storedHistory = localStorage.getItem(localStorageKey)
            return storedHistory ? JSON.parse(storedHistory) : []
        } else {
            return []
        }

    },
    storeQuery: (query: string) => {
        if (isClient) {
            const searchHistory = ACLocalStorage.getStoredHistory()

            if (query !== "" && query.length > 2) {
                const findQuery = searchHistory.findIndex((elt: string) => elt === query)
                if (findQuery !== -1) {
                    searchHistory.unshift(searchHistory.splice(findQuery, 1)[0])
                } else {
                    searchHistory.unshift(query)
                }

                localStorage.setItem(localStorageKey, JSON.stringify(searchHistory));
            }
        }

    },
    removeQuery: (query: string) => {
        if (isClient) {
            localStorage.removeItem(localStorageKey)
        }
        const searchHistory = ACLocalStorage.getStoredHistory()

        const findQuery = searchHistory.findIndex((elt: string) => elt === query)
        searchHistory.splice(findQuery, 1)[0]
        localStorage.setItem(localStorageKey, JSON.stringify(searchHistory));
    },
    clearHistory: () => {
        if (isClient) {
            localStorage.removeItem(localStorageKey)
        }
    }

}

export default ACLocalStorage 