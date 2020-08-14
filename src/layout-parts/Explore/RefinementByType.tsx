import * as React from 'react';
import { connectRefinementList } from 'react-instantsearch-dom'
import { generate as generateId } from 'shortid'
import TypeCard from '@/components/Cards/TypeCard'
import { ISearchFilter } from '@/types'
import { typesImageColors } from '@/layout-parts/Explore/ExploreByType'
import newString from '@/strings/NewStrings.json'

interface IByTypeProps {
    isShowingResult: boolean
    items: ISearchFilter[]
    currentRefinement: string[]
    removeTypeFilter: (filter?: string) => void
    setTypeFilter: (filters: string[]) => void
}
const ByTypeRefinementList: React.FC<IByTypeProps & any> = (props) => {
    const {
        items,
        refine,
        currentRefinement,
        setTypeFilter
    } = props

    const refinedType = (item: any) => {
        refine(item.value)
    }

    const removeType = (index: number) => {
        const newFiltlerList = [...currentRefinement.slice(0, index), ...currentRefinement.slice(index + 1)]
        refine(newFiltlerList)
        setTypeFilter(newFiltlerList)
    }


    const typeList = Array.isArray(items) ? items.map(type => {
        const { label, count } = type

        const refinementIndex = currentRefinement.findIndex((filter: string) => label === filter)
        const imageColor = typesImageColors[label]
        const typeFilter = {
            name: label,
            count: count ? count.toString() : undefined,
            ...imageColor,
            small: true
        }

        if (refinementIndex === -1) {
            return (
                <button
                    className="mx-2 mb-2 "
                    key={generateId()}
                    onKeyDown={() => refinedType(type)}
                    onClick={() => refinedType(type)}
                >
                    <TypeCard {...typeFilter} />
                </button>
            )
        } else {
            typeFilter.count = undefined
            return (
                <button
                    className="mx-2 mb-2 "
                    key={generateId()}
                    onKeyDown={() => removeType(refinementIndex)}
                    onClick={() => removeType(refinementIndex)}
                >
                    <TypeCard {...typeFilter} />
                </button>
            )
        }
    }) : []

    return (
        <div className={`flex overflow-x-scroll sm:flex-wrap snap px-2 content-between items-center whitespace-no-wrap`}>
            <h6 className="mb-2 font-bold text-sm sm:text-base">{newString.type}</h6>
            {Array.isArray(items) && typeList}

        </div>
    )
};

export default connectRefinementList(ByTypeRefinementList)
