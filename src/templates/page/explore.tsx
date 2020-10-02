import * as React from 'react';
import { graphql } from "gatsby"
import loadable from '@loadable/component'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, connectStats } from 'react-instantsearch-dom'
import XScrollCustomSize from '@/layout-parts/HorizontalScroll/BaseCustomSize'
import CustomSearchBox from '@/layout-parts/Explore/SearchInput'
import CustomePagination from '@/layout-parts/Explore/Pagination'
import ImgBgTopicCard from '@/components/Cards/BgImgTopicCard'
import MetaTag from '@/components/Meta'
import { LayoutH1, PageSectionHeader } from '@/layout-parts'
import { OutlineScriptureChapter, UnderlineLink } from '@/components/Button'
import { SubSection } from '@/layout-parts/Explore/ExploreByType'
import { fetchTopicFromSlug } from '@/helpers/fetchLocalData'
import ac_strings from '@/strings/ac_strings.json'

import "react-placeholder/lib/reactPlaceholder.css";
import { Stats } from 'react-instantsearch-dom';
import { INavItem } from "@/types"
import { IResourceOverview } from '@/layout-parts/Explore/ExploreByType'

const RefinementListByTaxonomy = loadable(() => import('@/layout-parts/Explore/ByTopics'))

import Link from '@/components/CustomLink';
import TS from '@/strings'
const SearchResult = loadable(() => import('@/layout-parts/Explore/SearchResult'))

import localStorageHelper from '@/helpers/localStorage'

const searchClient = algoliasearch(`${process.env.ALGOLIA_APP_ID}`, `${process.env.ALGOLIA_SEARCH_KEY}`)

const ExplorePage: React.FC<IResource> = (props) => {
    const [query, setQuery] = React.useState('');
    const [popularTopics, setPopularTopics] = React.useState<INavItem[]>([])
    const [mostUsedScriptures, setPopularScriptures] = React.useState<INavItem[]>([])
    const [searchHistory, setSearchHistory] = React.useState<string[]>([])

    const [typeFilter, setTypeFilter] = React.useState<string[] | null>(null);
    const [taxonomyFilter, setTaxonomyFilter] = React.useState<string[] | null>(null);
    const [pageNr, setPageNr] = React.useState(1)
    const [isInputFocus, setInputFocus] = React.useState(false);
    const [searchState, setSearchState] = React.useState<any>({})

    const { resource, scripturePage } = props.pageContext
    const topicSlugs = props.data.ac.popularTopics

    React.useEffect(() => {

        fetch(`/page-data/${scripturePage.to}/page-data.json`)
            .then(res => res.json())
            .then(res => {
                const mostUsedScriptures: INavItem[] = res.result.pageContext.mostPopular
                setPopularScriptures(mostUsedScriptures)
            })
            .catch(error => console.log(error))

    }, [])

    React.useEffect(() => {
        const receivedTopics: INavItem[] = []

        Promise.all(topicSlugs.map(({ slug }) => fetchTopicFromSlug(slug))).then(res => {
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
        showSearchHistory
    }

    const title = ac_strings.explore
    console.log()
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
                    <div className="bg-white max-w-tablet mx-auto">
                        <div className="pt-6">
                            <div className="w-full flex justify-between">
                                <PageSectionHeader title={ac_strings.topics} />
                                <div className="pr-4"><UnderlineLink to={TS.slug_topic}>{ac_strings.see_all}</UnderlineLink></div>
                            </div>

                            <XScrollCustomSize
                                childeClassName=""
                                items={popularTopics.map(({ name, to }) => {
                                    return (
                                        <div className="flex flex-col items-center">
                                            <div className="min-h-24 h-24 w-18" >
                                                <ImgBgTopicCard name={name} to={`${TS.slug_topic}/${to}`} />
                                            </div>
                                        </div>
                                    )
                                })}
                            />
                            <div className="hidden sm:grid grid-cols-6 gap-4 px-4">
                                {popularTopics.map(({ name, to }) => (
                                    <div className="min-h-36 h-36" >
                                        <ImgBgTopicCard name={name} to={`${TS.slug_topic}/${to}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="pt-6">
                            <PageSectionHeader title={ac_strings.resource} />
                            <XScrollCustomSize
                                childeClassName=""
                                items={resource.format.items.slice(0, 5).map(({ name, to }) => (
                                    <div className="flex flex-col items-center">
                                        <div className="min-h-24 h-24 w-24" >
                                            <ImgBgTopicCard name={name} to={`${to}`} />

                                        </div>
                                    </div>
                                ))}
                            />
                            <XScrollCustomSize
                                childeClassName=""
                                items={resource.format.items.slice(5).map(({ name, to }) => (
                                    <div className="flex flex-col items-center">
                                        <div className="min-h-24 h-24 w-36" >
                                            <ImgBgTopicCard name={name} to={`${to}`} />

                                        </div>
                                    </div>
                                ))}
                            />
                            <div className="hidden sm:grid grid-cols-4 gap-4 px-4">
                                {resource.format.items.map(({ name, to }) => (
                                    <div className="min-h-24 h-24" >
                                        <ImgBgTopicCard name={name} to={`${to}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="pt-6 pb-8">
                            <div className="w-full flex justify-between">
                                <PageSectionHeader title={ac_strings.byScripture} />
                                <div className="pr-4"><UnderlineLink to={scripturePage.to}>{ac_strings.see_all}</UnderlineLink></div>

                            </div>
                            <XScrollCustomSize
                                childeClassName=""
                                items={mostUsedScriptures.map(s => {
                                    return (
                                        <Link to={s.to}>
                                            < OutlineScriptureChapter>
                                                {s.name}
                                            </ OutlineScriptureChapter>
                                        </Link>
                                    )
                                })}
                            />
                        </div>
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

    data: {
        ac: {
            popularTopics: {
                slug: string
            }[]
        }
    }
}


export const pageQuery = graphql`
query PpularTopics{
  ac {
    popularTopics {
    slug
  }
  }
}
`

