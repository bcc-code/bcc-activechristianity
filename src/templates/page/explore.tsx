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
import { fetchTopicFromSlug } from '@/helpers/fetchLocalData'
import ac_strings from '@/strings/ac_strings.json'

import "react-placeholder/lib/reactPlaceholder.css";
import { Stats } from 'react-instantsearch-dom';
import { INavItem } from "@/types"
import { IResourceOverview } from '@/layout-parts/Explore/ExploreByType'
const ExploreByType = loadable(() => import('@/layout-parts/Explore/ExploreByType'))
const RefinementListByType = loadable(() => import('@/layout-parts/Explore/RefinementByType'))
const RefinementListByTaxonomy = loadable(() => import('@/layout-parts/Explore/ByTopics'))

import Link from '@/components/CustomLink';
import TS from '@/strings'
const SearchResult = loadable(() => import('@/layout-parts/Explore/SearchResult'))

import localStorageHelper from '@/helpers/localStorage'
import BibleIcon from '@/components/Icons/BibleSmall'
import TopicIcon from '@/components/Icons/Topics';
import ArrowRight from '@/components/Icons/ArrowRight'

const searchClient = algoliasearch(`${process.env.ALGOLIA_APP_ID}`, `${process.env.ALGOLIA_SEARCH_KEY}`)

const ExplorePage: React.FC<IResource> = (props) => {

    const [query, setQuery] = React.useState('');
    const [popularTopics, setPopularTopics] = React.useState<INavItem[]>([])
    const [searchHistory, setSearchHistory] = React.useState<string[]>([])

    const [typeFilter, setTypeFilter] = React.useState<string[] | null>(null);
    const [taxonomyFilter, setTaxonomyFilter] = React.useState<string[] | null>(null);
    const [pageNr, setPageNr] = React.useState(1)
    const [isInputFocus, setInputFocus] = React.useState(false);
    const [searchState, setSearchState] = React.useState<any>({})

    const { resource, scripturePage } = props.pageContext
    const topicSlugs = [
        "covid-19-coronavirus-resources",
        "relationships-and-sexuality",
        "the-holy-spirit",
        "the-end-times",
        "prayer",
        "salvation-and-sanctification"
    ]

    React.useEffect(() => {
        const receivedTopics: INavItem[] = []
        Promise.all(topicSlugs.map(slug => {
            return fetchTopicFromSlug(slug)
        })).then(res => {
            res.forEach(c => {
                if (c) {
                    receivedTopics.push(c)
                }
            })
            setPopularTopics(receivedTopics)
        })

    }, [])
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

        if (state.refinementList && state.refinementList["topics.name"]) {
            setTaxonomyFilter(state.refinementList["topics.name"])
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


    const hasTypeFilter = typeFilter && typeFilter.length !== 0

    const hasTaxonomyFilter = taxonomyFilter && taxonomyFilter.length !== 0

    const hasSearchProps = query !== "" || hasTypeFilter || hasTaxonomyFilter

    const showExploreHome = !isInputFocus && !hasSearchProps
    const showSearchHistory = isInputFocus && !hasSearchProps

    const topSearches = ['Anxiety', 'The end times', 'God\'s plan for me',
        'Self-image', 'Forgive others', 'Fear']


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
                className={`bg-d4gray-light pb-8`}
            >
                <div className={`max-w-tablet m-auto`}>
                    {isInputFocus === false && (
                        <div className={`px-4 sm:px-0 hidden sm:block`}>
                            <LayoutH1 title={title} />
                        </div>
                    )}
                    <CustomSearchBox {...customSearchBoxProps} />
                </div>
                {showExploreHome && (
                    <div className="max-w-tablet mx-auto">

                        <SubSection title={ac_strings.trendingTopics} to={`/${TS.slug_topic}`} icon={<TopicIcon customSize={16} />}>
                            <div className="grid grid-cols-2 gap-2 text-xs sm:text-base text-d4secondary">
                                {popularTopics.map(item => {
                                    return (
                                        <Link
                                            className="text-center my-1 border border-d4secondary rounded py-1"
                                            to={`/${TS.slug_topic}/${item.to}`}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </div>
                        </SubSection>
                        <LazyLoad>
                            <ExploreByType resource={resource} />
                        </LazyLoad>
                        <LazyLoad>
                            <SubSection title='' >
                                <Link to={scripturePage.to} className="flex text-d4secondary justify-between items-center w-full">
                                    <div className="flex justify-center items-center">
                                        <BibleIcon customSize={35} className="-mb-1" />
                                        <span className="font-semibold ml-4">{ac_strings.byScripture}</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                            </SubSection>
                        </LazyLoad>
                        <LazyLoad>
                            <SubSection title={ac_strings.editorPick} to={`${TS.slug_post_tag}`} className="border-none">

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
                        {/*                         <RefinementListByType
                            attribute={"categories.name"}
                            setTypeFilter={setTypeFilter}
                        /> */}
                        <RefinementListByTaxonomy
                            attribute={"topics.name"}
                            isShowingResult={typeFilter !== null || isInputFocus === true}
                            setTaxonomyFilter={setTaxonomyFilter}
                            showMore
                            showMoreLimit={30}
                            resource={resource}
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

export default ExplorePage

interface IResource {
    path: string

    pageContext: {
        title: string
        scripturePage: INavItem
        resource: IResourceOverview
    }
}
