import React from 'react';
import { KeyboardArrowRightIcon, KeyboardArrowLeftIcon } from '@/components/Icons/MUI/arrowIcons'
import PaginationShort from './InputLeftRight'
import Link from '@/components/CustomLink'
interface IProps {
    currentPage: number;
    totalPages: number;
    onChange: Function
    getLinkPath: Function
}
const StaticPagination: React.FC<IProps> = (props) => {
    const { currentPage, totalPages, getLinkPath } = props
    const hasPrevPage = currentPage - 1 > 0;
    const hasNextPage = currentPage + 1 <= totalPages;

    const getPaginationStart = () => {
        let start = 0
        if (currentPage > 4) {
            start = totalPages - currentPage > 2 ? currentPage - 3 : currentPage - 5
        }
        return start
    }
    const paginationStart = getPaginationStart()
    if (totalPages > 1) {
        const pageArray = [...Array(totalPages).keys()]
        return (
            <div className="w-full sm:flex justify-center text-gray-500 font-roboto">
                <div className="hidden sm:flex items-center">
                    {currentPage !== 1 && (
                        <Link className="bg-ac-slate-lighter rounded p-2 mr-2"
                            to={getLinkPath(currentPage - 1)}

                        >
                            <KeyboardArrowLeftIcon />
                        </Link>
                    )}
                    {paginationStart > 5 && (
                        <Link
                            to={getLinkPath(1)}
                            className={`${pageArray.length === currentPage ? 'bg-gray-100 font-bold' : ''} w-16 h-16 `}

                        >
                            {1}
                        </Link>
                    )}
                    {paginationStart > 5 && (
                        <button disabled className="h-16">...</button>
                    )}
                    {
                        pageArray.slice(paginationStart, paginationStart + 5).map((item, i) => {
                            const index = paginationStart + i
                            return (
                                <Link
                                    to={getLinkPath(index + 1)}
                                    className={`${index === currentPage - 1 ? 'bg-ac-slate-dark font-bold text-white rounded' : ''} w-12 h-12 flex items-center justify-center`}

                                >
                                    {index + 1}
                                </Link>
                            )
                        })
                    }
                    {pageArray.length > 5 && totalPages - currentPage > 2 && (
                        <button disabled className="h-16">...</button>
                    )}
                    {pageArray.length > 5 && totalPages - currentPage > 2 && (
                        <Link
                            to={getLinkPath(pageArray.length)}

                            className={`${pageArray.length === currentPage ? 'bg-gray-100 font-bold' : ''} w-16 h-16 flex items-center justify-center`}

                        >
                            {pageArray.length}
                        </Link>
                    )}
                    {currentPage !== totalPages && (
                        <Link className="bg-ac-slate-lighter rounded  p-2"
                            to={getLinkPath(currentPage + 1)}

                        >
                            <KeyboardArrowRightIcon />
                        </Link>
                    )}
                </div>
                <div className='sm:hidden flex justify-center items-center '>
                    <PaginationShort {...props} />
                </div>
            </div>
        )
    } else {
        return <div></div>
    }

}

export default StaticPagination