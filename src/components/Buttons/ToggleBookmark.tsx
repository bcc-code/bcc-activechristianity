import * as React from 'react';
import HeartIcon from '../Icons/Heart'
import HeartBorderIcon from '../Icons/HeartBorder'
import { useDispatch, useSelector } from 'react-redux'
import { openSignInModal } from '@/state/action'
import { IRootState } from '@/state/types'
import { setNewLike } from '@/state/action/userAction'

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
                        className={`${color ? color : 'text-red-700'} ${className ? className : ''}`}
                        onClick={handleClick}
                        onKeyDown={handleClick}

                    >
                        <HeartIcon customSize={size ? size : undefined} />
                    </button>
                ) :
                (
                    <button
                        className={`${color ? color : 'text-blue-600'} ${className ? className : ''}`}
                        onClick={handleClick}
                        onKeyDown={handleClick}
                    >
                        <HeartBorderIcon customSize={size ? size : undefined} />
                    </button>
                )}
        </span>
    )
}

export default Bookmark