import React from 'react';

interface IProps {
    currentPage: number;
    totalPages: number;
    onChange: Function
}
const StaticPagination: React.SFC<IProps> = (props) => {
    const { currentPage, totalPages, onChange, } = props
    const hasPrevPage = currentPage - 1 > 0;
    const hasNextPage = currentPage + 1 <= totalPages;

    if (totalPages > 1) {
        const pageArray = [...Array(totalPages).keys()]
        return (
            <div className="w-full sm:flex justify-center">
                <div className="hidden sm:block">
                    {currentPage !== 1 && (
                        <button
                            className="p-4"
                            onClick={() => onChange(1)}
                        >
                            &laquo;
                        </button>
                    )}
                    {
                        pageArray.slice(0, 5).map((item, i) => {
                            return (
                                <button
                                    onClick={() => onChange(i + 1)}
                                    className={`${i === currentPage - 1 ? 'bg-gray-100 font-bold' : ''} w-16 h-16 `}

                                >
                                    {i + 1}
                                </button>
                            )
                        })
                    }
                    {pageArray.length > 5 && (
                        <button disabled className="w-16 h-16">...</button>
                    )}
                    {pageArray.length > 5 && (
                        <button
                            onClick={() => onChange(pageArray.length)}
                            className={`${pageArray.length === currentPage ? 'bg-gray-100 font-bold' : ''} w-16 h-16 `}

                        >
                            {pageArray.length}
                        </button>
                    )}
                    {currentPage !== totalPages && (
                        <button
                            className="p-4"
                            onClick={() => onChange(totalPages - 1)}
                        >
                            &raquo;
                        </button>
                    )}
                </div>
                <div className='sm:hidden flex justify-center items-center'>
                    <span className='w-8 h-8 flex justify-center items-center'>{hasPrevPage ? <button onClick={() => onChange(currentPage - 1)}>&laquo;</button> : null}</span>
                    <span className='flex justify-center items-center'> {currentPage} of {totalPages} </span>
                    <span className='w-8 h-8 flex justify-center items-center'>{hasNextPage ? <button onClick={() => onChange(currentPage + 1)}>&raquo;</button> : null}
                    </span>
                </div>
            </div>
        )
    } else {
        return <div></div>
    }

}

export default StaticPagination