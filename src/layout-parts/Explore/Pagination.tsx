import * as React from 'react';
import { connectPagination } from 'react-instantsearch-dom'
import Pagination from '@/components/Pagination'

interface ISearchPagination {
    currentRefinement: number
    nbPages: number
    refine: (index: number) => void
    createURL: (index: number) => void
    setPageNr: (index: number) => void
}
const SearchPagination: React.FC<ISearchPagination> = ({
    currentRefinement, //currentRefinement,
    nbPages, //nbPages,
    refine,//function refine,
    createURL,//function createURL,
    setPageNr
}) => {

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scroll({
                top: 200,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    const handleChange = (index: number) => {
        refine(index)
        setPageNr(index)
        scrollToTop()
    }
    // return the DOM output
    return (
        <Pagination
            currentPage={currentRefinement}
            totalPages={nbPages}
            onChange={handleChange}
        />
    )
};

// 2. Connect the component using the connector
const CustomPagination = connectPagination(SearchPagination);


export default CustomPagination