import * as React from 'react';
import { navigate } from "gatsby"
import { generate as generateId } from 'shortid'
import { connectRefinementList } from 'react-instantsearch-dom'
import newString from '@/strings/NewStrings.json'
interface IByTaxonomyProps {
    isShowingResult: boolean
    viewAll: boolean
    setViewAll: (status: boolean) => void
    setTaxonomyFilter: (filters: string[]) => void
}
const ByTaxonomy: React.FC<IByTaxonomyProps & any> = (props) => {
    const {
        items: taxonomies,
        refine,
        currentRefinement,
        setTaxonomyFilter
    } = props

    const refinedType = (item: any) => {
        refine(item.value)
    }


    const removeType = (index: number) => {
        const newFiltlerList = [...currentRefinement.slice(0, index), ...currentRefinement.slice(index + 1)]
        refine(newFiltlerList)
        setTaxonomyFilter(newFiltlerList)
    }


    const typeList = Array.isArray(taxonomies) ? taxonomies.map(type => {
        const { label, count } = type

        const refinementIndex = currentRefinement.findIndex((filter: string) => label === filter)
        const isRefined = refinementIndex !== -1
        const handleClick = () => {
            if (refinementIndex !== -1) {
                removeType(refinementIndex)
            } else {
                refinedType(type)
            }
        }
        return (
            <button
                className="py-1 px-2 mr-2 mb-2  bg-white flex justify-between items-center rounded-lg"
                key={generateId()}
                onClick={handleClick}
                onKeyDown={handleClick}
            >
                {isRefined && <p className="text-xs opacity-75 pr-2">✗ </p>}
                <span className="text-sm font-medium">{type.label}</span>
                {!isRefined && <p className="text-xs opacity-75 px-2">{type.count}</p>}
            </button>
        )
    }) : [];

    return (
        <div>
            <div className={`px-4 content-between items-center flex overflow-x-scroll sm:flex-wrap whitespace-no-wrap pt-0`}>
                <h6 className="mb-2 pr-2 font-bold text-sm sm:text-base">{newString.topics}</h6>
                {typeList}
            </div>
        </div>
    )
}

export default connectRefinementList(ByTaxonomy)