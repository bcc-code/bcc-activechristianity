import * as React from 'react';

import loadable from '@loadable/component'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'

import CustomSearchBox from '@/layout-parts/Explore/SearchInput'
import CustomePagination from '@/layout-parts/Explore/Pagination'

import MetaTag from '@/components/Meta'
import { LayoutH1 } from '@/components/Headers'
import ac_strings from '@/strings/ac_strings.json'
import ExploreHomeLayout from '@/layout-parts/Explore/ExploreHome'
import { Stats } from 'react-instantsearch-dom';
import { INavItem, INavItemCount, INavItemWKey } from "@/types"


const RefinementListByTopics = loadable(() => import('@/layout-parts/Explore/ByTopics'))

const SearchResult = loadable(() => import('@/layout-parts/Explore/SearchResult'))

import localStorageHelper from '@/helpers/localStorage'

const searchClient = algoliasearch(`${process.env.ALGOLIA_APP_ID}`, `${process.env.ALGOLIA_SEARCH_KEY}`)

const ExplorePage: React.FC<IResource> = (props) => {
    const [query, setQuery] = React.useState('');
    const [searchHistory, setSearchHistory] = React.useState<string[]>([])
    const [taxonomyFilter, setTaxonomyFilter] = React.useState<string[] | null>(null);
    const [pageNr, setPageNr] = React.useState(1)
    const [isInputFocus, setInputFocus] = React.useState(false);
    const [searchState, setSearchState] = React.useState<any>({})

    const { resource, scripturePage } = props.pageContext

    React.useEffect(() => {
        const search = localStorageHelper.getStoredHistory()
        setSearchHistory(search)

    }, [query])

    const handleQueryChange = (searchQuery: string) => {
        localStorageHelper.storeQuery(searchQuery)
        setQuery(searchQuery)
    }
    const onSearchStateChange = (state: any) => {
        if (state.page) {
            setPageNr(state.page)
        }

        if (state.refinementList && state.refinementList["topics.name"]) {
            setTaxonomyFilter(state.refinementList["topics.name"])
        }
        setSearchState(state)
    }


    const removeTaxonomyFilter = (filter?: string) => {
        if (taxonomyFilter !== null) {

            const refinementState = {
                ...searchState.refinementList,
            }

            const index = taxonomyFilter.findIndex(item => item === filter)
            const newFiltlerList = [...taxonomyFilter.slice(0, index), ...taxonomyFilter.slice(index + 1)]

            if (filter === undefined || index < 0 || newFiltlerList.length === 0) {
                setTaxonomyFilter(null)
                delete refinementState["topics.name"]

            } else {
                refinementState["topics.name"] = newFiltlerList
                setTaxonomyFilter(newFiltlerList)
            }

            setSearchState({
                ...searchState,
                refinementList: refinementState
            })
        }
    }

    const hasTaxonomyFilter = taxonomyFilter && taxonomyFilter.length !== 0

    const hasSearchProps = query !== "" || hasTaxonomyFilter

    const showExploreHome = !isInputFocus && !hasSearchProps
    const showSearchHistory = isInputFocus && !hasSearchProps


    const customSearchBoxProps = {
        query,
        setQuery: handleQueryChange,
        isInputFocus,
        setInputFocus,
        taxonomyFilter,
        removeTaxonomyFilter,
        searchHistory,
        setSearchHistory,
        showExploreHome,
        showSearchHistory
    }

    const title = ac_strings.explore

    return (

        <InstantSearch
            appId=''
            apiKey=''
            searchClient={searchClient}
            indexName="facets"
            searchState={{
                query,
                refinementList: searchState.refinementList
            }}
            onSearchStateChange={onSearchStateChange}
            stalledSearchDelay={500}
        >
            <MetaTag title={title} type="page" breadcrumb={[]} />
            <div
                className={`bg-d4gray-light pb-8 relative`}
            >
                <div className={`max-w-tablet m-auto`}>
                    {isInputFocus === false && (
                        <div className={`px-4 sm:px-0 hidden sm:block`}>
                            <LayoutH1 title={title} />
                        </div>
                    )}
                    <CustomSearchBox {...customSearchBoxProps} />
                </div>
                {hasSearchProps ? (
                    <div className="max-w-tablet m-auto">
                        {/*                         <RefinementListByType
                            attribute={"categories.name"}
                            setTypeFilter={setTypeFilter}
                        /> */}
                        <RefinementListByTopics
                            attribute={"topics.name"}
                            isShowingResult={isInputFocus === true}
                            setTaxonomyFilter={setTaxonomyFilter}
                            showMore
                            showMoreLimit={30}
                            resource={resource}
                        />
                    </div>
                ) : (
                        <div className="min-h-8 min-w-8"></div>
                    )}
                {showExploreHome && (
                    <ExploreHomeLayout
                        scriptureSlug={scripturePage.to}
                        formats={resource.format.items}
                    />
                )}



                {!showExploreHome && (
                    <div className="bg-white max-w-tablet m-auto py-4 min-h-screen">
                        {hasSearchProps && (
                            <div>
                                <div className="text-gray-500 text-sm italic px-4">
                                    <Stats />
                                </div>
                                <SearchResult />
                                <CustomePagination
                                    defaultRefinement={pageNr}
                                    setPageNr={setPageNr}
                                />
                            </div>
                        )}

                    </div>
                )}


            </div>

        </InstantSearch>
    )
}

export default ExplorePage

interface IResource {
    path: string

    pageContext: {
        title: string
        scripturePage: INavItem
        resource: IResourceOverview
    }
}


export interface IResourceOverview {
    format: {
        name: string
        info: INavItemWKey
        menu: INavItemWKey[]
        items: INavItemWKey[]
    }
    general: {
        name: string
        info: INavItemWKey

        items: INavItemCount[]
    }
    read: {
        name: string
        slug: string
        info: INavItemWKey
        ebook?: INavItemCount
        menu: INavItemWKey[]
        items: INavItemWKey[]
    }
    listen?: {
        name: string
        slug: string
        info: INavItemWKey
        menu: INavItemWKey[]
        items: INavItemWKey[]
    }
    watch?: {
        name: string
        slug: string
        info: INavItemWKey
        menu: INavItemWKey[]
        items: INavItemWKey[]
    }
}