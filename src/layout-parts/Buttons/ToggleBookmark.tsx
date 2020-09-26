import * as React from 'react';
import Icon, { IButtonColour } from '@/components/Icons/Icon'

import FetchAndSetBookmark from '@/layout-parts/HOC/FetchAndSetBookmarked'
interface IProps {
    id: string
    color?: IButtonColour
}

const Bookmark: React.FC<IProps> = ({ id, color }) => {
    const buttonColor = color ? color : "secondary"
    return (
        <FetchAndSetBookmark
            id={id}
            render={({ bookmarked }) => {

                return (
                    <div>
                        {bookmarked === "loading" && <Icon
                            name="Cached"
                            color={buttonColor}
                            size="6"
                        />}
                        {bookmarked === "false" && <Icon
                            name="BookmarkBorder"
                            color="secondary"
                            size="6"
                        />}
                        {
                            bookmarked === "true" && <Icon
                                name="Bookmark"
                                color="secondary"
                                size="6"
                            />
                        }

                    </div>
                )
            }}
        >

        </FetchAndSetBookmark>
    )
}

export default Bookmark