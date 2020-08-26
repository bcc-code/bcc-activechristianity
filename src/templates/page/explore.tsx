import * as React from 'react';

import loadable from '@loadable/component'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, connectStats } from 'react-instantsearch-dom'

import CustomSearchBox from '@/layout-parts/Explore/SearchInput'
import CustomePagination from '@/layout-parts/Explore/Pagination'
import LazyLoad from '@/components/LazyLoad';
import MetaTag from '@/components/Meta'
import { LayoutH1 } from '@/layout-parts'

import { SubSection } from '@/layout-parts/Explore/ExploreByType'

import newString from '@/strings/ac_strings.json'
import { all } from '@/strings/menu'

import "react-placeholder/lib/reactPlaceholder.css";
import { Stats } from 'react-instantsearch-dom';


const ExploreByType = loadable(() => import('@/layout-parts/Explore/ExploreByType'))
const RefinementListByType = loadable(() => import('@/layout-parts/Explore/RefinementByType'))
const RefinementListByTaxonomy = loadable(() => import('@/layout-parts/Explore/ByTaxonomy'))

import Link from '@/components/CustomLink';
import TS from '@/strings'
const SearchResult = loadable(() => import('@/layout-parts/Explore/SearchResult'))

import localStorageHelper from '@/helpers/localStorage'
import BibleIcon from '@/components/Icons/BibleSmall'
import TopicIcon from '@/components/Icons/Topics';
import ArrowRight from '@/components/Icons/ArrowRight'

const searchClient = algoliasearch(`${process.env.ALGOLIA_APP_ID}`, `${process.env.ALGOLIA_SEARCH_KEY}`)

const SideMobile: React.FC = () => {

    const [query, setQuery] = React.useState('');
    const [searchHistory, setSearchHistory] = React.useState<string[]>([])

    const [typeFilter, setTypeFilter] = React.useState<string[] | null>(null);
    const [taxonomyFilter, setTaxonomyFilter] = React.useState<string[] | null>(null);
    const [pageNr, setPageNr] = React.useState(1)
    const [isInputFocus, setInputFocus] = React.useState(false);
    const [searchState, setSearchState] = React.useState<any>({})

    React.useEffect(() => {
        localStorageHelper.storeQuery(query)
    }, [query])

    React.useEffect(() => {
        const search = localStorageHelper.getStoredHistory()
        setSearchHistory(search)

    }, [query])

    const onSearchStateChange = (state: any) => {
        if (state.page) {
            setPageNr(state.page)
        }
        /* if (state.query !== undefined) {
            setQuery(state.query)
        } */
        if (state.refinementList && state.refinementList["categories.name"]) {
            setTypeFilter(state.refinementList["categories.name"])
        }

        if (state.refinementList && state.refinementList["tags.name"]) {
            setTaxonomyFilter(state.refinementList["tags.name"])
        }
        setSearchState(state)
    }

    const addTypeFilter = (filter: string) => {
        const refinementState = {
            ...searchState.refinementList,
        }
        const newFiltlerList = [filter]

        refinementState["categories.name"] = newFiltlerList
        setTypeFilter(newFiltlerList)

        const updateState = {
            ...searchState,
            refinementList: refinementState
        }
        setSearchState(updateState)
    }

    const removeTypeFilter = (filter?: string) => {
        if (typeFilter !== null) {
            const refinementState = {
                ...searchState.refinementList,
            }
            const index = typeFilter.findIndex(item => item === filter)
            const newFiltlerList = [...typeFilter.slice(0, index), ...typeFilter.slice(index + 1)]

            if (filter === undefined || index < 0 || newFiltlerList.length === 0) {
                setTypeFilter(null)
                delete refinementState["categories.name"]

            } else {
                refinementState["categories.name"] = newFiltlerList
                setTypeFilter(newFiltlerList)
            }

            setSearchState({
                ...searchState,
                refinementList: refinementState
            })
        }
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
                delete refinementState["tags.name"]

            } else {
                refinementState["tags.name"] = newFiltlerList
                setTaxonomyFilter(newFiltlerList)
            }

            setSearchState({
                ...searchState,
                refinementList: refinementState
            })
        }
    }


    const hasTypeFilter = typeFilter && typeFilter.length !== 0

    const hasTaxonomyFilter = taxonomyFilter && taxonomyFilter.length !== 0

    const hasSearchProps = query !== "" || hasTypeFilter || hasTaxonomyFilter

    const showExploreHome = !isInputFocus && !hasSearchProps
    const showSearchHistory = isInputFocus && !hasSearchProps

    const topSearches = ['Anxiety', 'The end times', 'God\'s plan for me',
        'Self-image', 'Forgive others', 'Fear']

    const trendingTopics = [
        {
            label: 'Convid 19',
            value: "covid-19-coronavirus-resources"
        },
        {
            label: 'Relationship',
            value: "relationships-and-sexuality"
        },
        {
            label: 'The Holy Spirit',
            value: "the-holy-spirit"
        },
        {
            label: 'The end times',
            value: "the-end-times"
        },
        {
            label: 'Prayer',
            value: "prayer"
        },
        {
            label: 'Salvation',
            value: "salvation-and-sanctification"
        },
    ]



    const customSearchBoxProps = {
        query,
        setQuery,
        isInputFocus,
        setInputFocus,
        taxonomyFilter,
        removeTypeFilter,
        removeTaxonomyFilter,
        searchHistory,
        setSearchHistory,
        showExploreHome,
        showSearchHistory,
        topSearches
    }

    const title = newString.explore
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
                className={`bg-d4gray-light pb-8`}
            >
                <div className={`max-w-tablet m-auto`}>
                    {isInputFocus === false && (
                        <div className={`px-4 sm:px-0`}>
                            <LayoutH1 title={title} />
                        </div>
                    )}
                    <CustomSearchBox {...customSearchBoxProps} />
                </div>
                {showExploreHome && (
                    <div className="max-w-tablet mx-auto">

                        <SubSection title={newString.trendingTopics} to={`/${TS.slug_topic}`} icon={<TopicIcon customSize={16} />}>
                            <div className="grid grid-cols-2 gap-2 text-xs sm:text-base text-d4secondary">
                                {trendingTopics.map(item => {
                                    return (
                                        <Link
                                            className="text-center my-1 border border-d4secondary rounded py-1"
                                            to={`/${TS.slug_post_tag}/${item.value}/recommend`}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                })}
                            </div>
                        </SubSection>
                        <LazyLoad>
                            <ExploreByType />
                        </LazyLoad>
                        <LazyLoad>
                            <SubSection title='' >
                                <Link to={`/${all.scripture.to}`} className="flex text-d4secondary justify-between items-center w-full">
                                    <div className="flex justify-center items-center">
                                        <BibleIcon customSize={35} className="-mb-1" />
                                        <span className="font-semibold ml-4">{newString.byScripture}</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                            </SubSection>
                        </LazyLoad>
                        <LazyLoad>
                            <SubSection title={newString.editorPick} to={`${TS.slug_post_tag}`} className="border-none">

                                {/*                                 <QLatestPosts >
                                    {(posts) => {
                                        return (
                                            <div className="flex flex-col">
                                                {posts && posts.slice(0, 3).map(item => {
                                                    return (
                                                        <RightImgWDesPost {...item} />
                                                    )
                                                })}
                                            </div>
                                        )
                                    }
                                    }
                                </QLatestPosts > */}
                            </SubSection>
                        </LazyLoad>
                    </div>
                )}

                {hasSearchProps && (
                    <div className="max-w-tablet m-auto">
                        <RefinementListByType
                            attribute={"categories.name"}
                            setTypeFilter={setTypeFilter}
                        />
                        <RefinementListByTaxonomy
                            attribute={"tags.name"}
                            isShowingResult={typeFilter !== null || isInputFocus === true}
                            setTaxonomyFilter={setTaxonomyFilter}
                            showMore
                            showMoreLimit={30}
                        />
                    </div>
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

export default SideMobile

