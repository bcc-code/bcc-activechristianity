import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { openSignInModal } from '@/state/action'
import { IRootState } from '@/state/types'
import { setNewLike } from '@/state/action/userAction'
import Icons from '@/components/Icons'

interface IProps {
    id: string
    bookmarked?: boolean
    size?: number | string
    color?: string
    className?: string
    onClick?: (e: any) => void
}

const Bookmark: React.SFC<IProps> = ({ bookmarked, size, className, color, id }) => {
    const dispatch = useDispatch()
    const auth = useSelector((state: IRootState) => state.auth)

    const handleClick = () => {
        if (auth.loggedIn === "success") {
            dispatch(setNewLike({ id, bookmarked: bookmarked === true }))
        } else {
            dispatch(openSignInModal("signInOptions"))
        }
    }

    return (
        <span className="flex items-center">
            {bookmarked === true ?
                (
                    <button
                        className={`${color ? color : 'bg-d4secondary text-white rounded-25 p-2'} ${className ? className : ''}`}
                        onClick={handleClick}
                        onKeyDown={handleClick}

                    >
                        <Icons name="heart" size="base" />
                    </button>
                ) :
                (
                    <button
                        className={`${color ? color : 'text-d4secondary'} ${className ? className : ''}`}
                        onClick={handleClick}
                        onKeyDown={handleClick}
                    >
                        <Icons name="heart" size="base" />
                    </button>
                )}
        </span>
    )
}

export default Bookmark