import * as React from 'react';

import { connectRefinementList } from 'react-instantsearch-dom'
import { FilterListIcon, ExpandMoreIcon } from '@/components/Icons/MUI'
import { OutlineSmallButton } from '@/components/Button'
import ac_strings from '@/strings/ac_strings.js'

interface IByTaxonomyProps {
    isShowingResult: boolean
    viewAll: boolean
    setViewAll: (status: boolean) => void
    setTaxonomyFilter: (filters: string[]) => void
}

interface IRefinement {
    key: string
    label: string
}

interface ISortMap {
    types: {
        [key: string]: { key: string, name: string }
    },
    formats: {
        [key: string]: { key: string, name: string }
    }

}

const ByTaxonomy: React.FC<IByTaxonomyProps & any> = (props) => {
    const [sortTopicsMap, setSortTopicsMap] = React.useState<ISortMap>({
        types: {},
        formats: {}
    })
    const [showFilter, setShowFilter] = React.useState(false)

    const {
        items: topics,
        refine,
        currentRefinement,
        setTaxonomyFilter,
        resource
    } = props
    // move this to buid process


    const refinedType = (item: any) => {
        refine(item.value)
    }


    const removeType = (index: number) => {
        const newFiltlerList = [...currentRefinement.slice(0, index), ...currentRefinement.slice(index + 1)]
        refine(newFiltlerList)
        setTaxonomyFilter(newFiltlerList)
    }


    const topicList: JSX.Element[] = []
    const formatList: JSX.Element[] = []
    const typeList: JSX.Element[] = []
    const allRefinement: JSX.Element[] = []

    Array.isArray(topics) ? topics.map(topic => {

        const { label, count } = topic
        const refinementIndex = currentRefinement.findIndex((filter: string) => label === filter)
        const isRefined = refinementIndex !== -1

        const handleClick = () => {
            if (refinementIndex !== -1) {
                removeType(refinementIndex)
            } else {
                refinedType(topic)
            }
            setShowFilter(false)
        }

        if (!sortTopicsMap.formats[label] && !sortTopicsMap.types[label]) {
            const topicLabel = < RefinementLabel
                color='bg-d4red'
                handleClick={handleClick}
                isRefined={isRefined}
                topic={topic}
            />
            if (isRefined) {
                allRefinement.push(topicLabel)
            }
            topicList.push(topicLabel)
        } else if (sortTopicsMap.formats[label]) {

            const formatLabel = < RefinementLabel
                color='bg-d4green'
                handleClick={handleClick}
                isRefined={isRefined}
                topic={topic}
            />
            if (isRefined) {
                allRefinement.push(formatLabel)
            }
            formatList.push(formatLabel
            )

        } else {
            const typeLabel = < RefinementLabel
                color='bg-ac-secondary'
                handleClick={handleClick}
                isRefined={isRefined}
                topic={topic}
            />
            if (isRefined) {
                allRefinement.push(typeLabel)
            }
            typeList.push(typeLabel)
        }

    }) : [];

    return (
        <div className="relative">
            <div className="flex items-end sm:items-center justify-end w-full">
                <div className="hidden sm:flex flex-wrap flex-1 items-center">{allRefinement}</div>
                <div className="flex items-center justify-end px-4 sm:pt-0" onClick={() => { setShowFilter(!showFilter) }} >
                    <FilterListIcon className="fill-secondary" />
                    <p className="text-sm text-ac-secondary p-4">
                        <i>{topics.length} {ac_strings.filters}</i>
                        <i className="sm:hidden">, Selected ({currentRefinement.length})</i>
                    </p>
                    <button className="place-items-end">
                        <ExpandMoreIcon className="fill-secondary" />
                    </button>
                </div>
            </div>
            {showFilter && (
                <div className="bg-ac-slate-lighter absolute max-w-tablet left-0 right-0" style={{ zIndex: 60 }}>

                    {[{
                        title: ac_strings.type,
                        list: typeList

                    },
                    {
                        title: ac_strings.categories,
                        list: formatList

                    },
                    {
                        title: ac_strings.topics,
                        list: topicList

                    }
                    ].map(item => {
                        return (
                            <div className={`px-4 pt-0`}>
                                <h6 className="mb-2 pr-2 pt-4 font-bold text-sm sm:text-base">{item.title}</h6>
                                <div className="flex flex-wrap">
                                    {item.list}
                                </div>
                            </div>
                        )
                    })}

                    <div className="py-6 px-4">
                        <OutlineSmallButton onClick={() => setShowFilter(false)}>
                            <span className="py-2">Close</span>
                        </OutlineSmallButton>
                    </div>

                </div>
            )}

        </div>
    )
}

export default connectRefinementList(ByTaxonomy)

const RefinementLabel: React.FC<{
    color: string,
    isRefined: boolean,
    handleClick: () => void
    topic: {
        label: string
        count: number
    }
}> = ({ isRefined, handleClick, topic, color }) => {
    return (
        <button
            className={`py-1 px-2 mr-2 my-1  ${isRefined ? `${color} text-white` : 'bg-white'} flex justify-between items-center rounded-lg`}
            onClick={handleClick}
            onKeyDown={handleClick}
        >
            {isRefined && <p className="text-xs opacity-75 pr-2">✗ </p>}
            <span className="text-sm font-medium">{topic.label}</span>
            {!isRefined && <p className="text-xs opacity-75 px-2">{topic.count}</p>}
        </button>
    )
}