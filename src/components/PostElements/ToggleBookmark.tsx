import * as React from 'react';
import Icon, { IButtonColour } from '@/components/Icons/Icon'

import FetchAndSetBookmark from '@/HOC/SetAndUPdateBookmarked'
interface IProps {
    id: string
    color?: IButtonColour
    size?: string
}

const Bookmark: React.FC<IProps> = ({ id, color, size }) => {
    const buttonColor = color ? color : "secondary"
    const buttonSize = size ? size : "6"
    return (
        <FetchAndSetBookmark
            id={id}
            render={({ bookmarked }) => {

                return (
                    <div>
                        {bookmarked === "loading" && (
                            <Icon
                                name="Cached"
                                color={buttonColor}
                                size={buttonSize}
                            />
                        )}
                        {bookmarked === "false" && (
                            <Icon
                                name="BookmarkBorder"
                                color={buttonColor}
                                size={buttonSize}
                            />
                        )}
                        {
                            bookmarked === "true" && (
                                <Icon
                                    name="Bookmark"
                                    color={buttonColor}
                                    size={buttonSize}
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