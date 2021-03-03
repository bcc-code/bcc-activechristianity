import * as React from 'react';
import { CachedIcon, BookmarkBorderIcon, BookmarkIcon, IButtonColour } from '@/components/Icons/MUI/bookmarkIcons'
import FetchAndSetBookmark from '@/HOC/SetAndUPdateBookmarked'
interface IProps {
    id: string
    color?: IButtonColour
    size?: string
}

export const Bookmark: React.FC<IProps> = ({ id, color, size }) => {
    const buttonColor = color ? color : "secondary"
    const buttonSize = size ? size : "6"
    return (
        <FetchAndSetBookmark
            id={id}
            render={({ bookmarked }) => {

                return (
                    <div>
                        {bookmarked === "loading" && (
                            <CachedIcon
                                className={`fill-${buttonColor}`}
                                customSize={buttonSize}
                            />
                        )}
                        {bookmarked === "false" && (
                            <BookmarkBorderIcon
                                className={`fill-${buttonColor}`}
                                customSize={buttonSize}
                            />
                        )}
                        {
                            bookmarked === "true" && (
                                <BookmarkIcon
                                    className={`fill-${buttonColor}`}
                                    customSize={buttonSize}
                                />
                            )
                        }

                    </div>
                )
            }}
        >

        </FetchAndSetBookmark>
    )
}

export default Bookmark