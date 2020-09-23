import * as React from 'react';
import Icons from '@/components/Icons'
import FetchAndSetBookmark from '@/layout-parts/HOC/FetchAndSetBookmarked'
interface IProps {
    id: string
}

const Bookmark: React.FC<IProps> = ({ id }) => {

    return (
        <FetchAndSetBookmark
            id={id}
            render={({ bookmarked }) => {

                return (
                    <div>
                        {bookmarked === "false" ?
                            (
                                <button className={`text-d4secondary`} >
                                    <Icons name="heart" size="base" />
                                </button>
                            ) : (
                                (
                                    <button
                                        className={`${bookmarked === "loading" ? 'bg-d4cadet-blue' : 'bg-d4secondary'} text-white rounded-25 p-1`}
                                    >
                                        <Icons name="heart" size="sm" />
                                    </button>
                                )
                            )}
                    </div>
                )
            }}
        >

        </FetchAndSetBookmark>
    )
}

export default Bookmark