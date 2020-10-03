import * as React from 'react';
import { navigate } from "gatsby"
import { generate as generateId } from 'shortid'
import { IResourceOverview } from './ExploreByType'
import { connectRefinementList } from 'react-instantsearch-dom'
import { TitleWithIcon } from '@/components/Headers'
import { typeIcons } from '@/layout-parts/PostSections'
interface IByTaxonomyProps {
    resource: IResourceOverview
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

    const {
        items: topics,
        refine,
        currentRefinement,
        setTaxonomyFilter,
        resource
    } = props
    // move this to buid process
    React.useEffect(() => {
        const allResource: IResourceOverview = resource
        const { format, general, ...types } = allResource
        const sorted: ISortMap = {
            formats: {},
            types: {}
            /*             types: Object.keys(types).map((tKey) => {
                            const type = types[tKey]
                            return ({ label: type.info.name, key: type.info.key })
                        }) */
        }
        format.items.forEach(f => {
            sorted.formats[f.name] = { name: f.name, key: f.key }
        })

        Object.keys(types).forEach(tKey => {
            const type = types[tKey].info

            sorted.types[type.name] = { name: type.name, key: type.key }

        })
        setSortTopicsMap(sorted)
    }, [])

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
        }

        if (!sortTopicsMap.formats[label] && !sortTopicsMap.types[label]) {

            topicList.push(
                <button
                    className={`py-1 px-2 mr-2 mb-2  ${isRefined ? 'bg-d4red text-white' : 'bg-white'} flex justify-between items-center rounded-lg`}
                    key={generateId()}
                    onClick={handleClick}
                    onKeyDown={handleClick}
                >
                    {isRefined && <p className="text-xs opacity-75 pr-2">✗ </p>}
                    <span className="text-sm font-medium">{topic.label}</span>
                    {!isRefined && <p className="text-xs opacity-75 px-2">{topic.count}</p>}
                </button>
            )
        } else if (sortTopicsMap.formats[label]) {
            const { key } = sortTopicsMap.formats[label]


            formatList.push(
                <button
                    className={`py-1 px-2 mr-2 mb-2  ${isRefined ? 'bg-d4green text-white' : 'bg-white'}  flex justify-between items-center rounded-lg`}
                    key={generateId()}
                    onClick={handleClick}
                    onKeyDown={handleClick}
                >
                    {isRefined && <p className="text-xs opacity-75 pr-2">✗ </p>}
                    <span className="text-sm font-medium">{topic.label}</span>
                    {!isRefined && <p className="text-xs opacity-75 px-2">{topic.count}</p>}
                </button>
            )

        } else {
            const { key } = sortTopicsMap.types[label]

            const icon = typeIcons[key]
            typeList.push(
                <button
                    className={`py-1 px-2 mr-2 mb-2  ${isRefined ? 'bg-d4secondary text-white' : 'bg-white'} flex justify-between items-center rounded-lg`}
                    key={generateId()}
                    onClick={handleClick}
                    onKeyDown={handleClick}
                >
                    {isRefined && <p className="text-xs opacity-75 pr-2">✗ </p>}
                    <TitleWithIcon title={label} icon={icon} />
                    {!isRefined && <p className="text-xs opacity-75 px-2">{topic.count}</p>}
                </button>
            )
        }

    }) : [];

    return (
        <div>
            {[{
                title: "Types",
                list: typeList

            },
            {
                title: "Formats",
                list: formatList

            },
            {
                title: "Topics",
                list: topicList

            }
            ].map(item => {
                return (
                    <div className={`px-4 content-between items-center flex overflow-x-scroll sm:flex-wrap whitespace-no-wrap pt-0`}>
                        <h6 className="mb-2 pr-2 font-bold text-sm sm:text-base">{item.title}</h6>
                        {item.list.slice(0, 6)}
                    </div>
                )
            })}


        </div>
    )
}

export default connectRefinementList(ByTaxonomy)