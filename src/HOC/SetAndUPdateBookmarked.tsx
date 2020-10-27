import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { openSignInModal } from '@/state/action'
import { IRootState } from '@/state/types'
import { setNewLike } from '@/state/action/userAction'

type bookmarkStatus = "loading" | "true" | "false"
interface IFetchPost {
    id: string,
    render: (data: { bookmarked: bookmarkStatus }) => JSX.Element
}

const Bookmark: React.FC<IFetchPost> = ({ id, render }) => {
    const { bookmarkedPosts, auth } = useSelector((state: IRootState) => ({ bookmarkedPosts: state.userLibrary.bookmarkedPosts, auth: state.auth }))
    const [bookmarked, setBookmarked] = React.useState<bookmarkStatus>("loading")
    const dispatch = useDispatch()
    React.useEffect(() => {
        const found = bookmarkedPosts.findIndex(p => p.id === id)
        const bookmarked = found > -1
        setBookmarked(bookmarked ? "true" : "false")
    }, [id, bookmarkedPosts])
    const handleClick = () => {
        if (auth.loggedIn === "success") {
            if (bookmarked !== "loading") {
                setBookmarked("loading")
                dispatch(setNewLike({ id, bookmarked: bookmarked === "true" }))
            }
        } else {
            dispatch(openSignInModal("signUpOptions"))
        }
    }
    return (
        <div
            onClick={handleClick}
            onKeyDown={handleClick}
            className="hover:shadow-md flex items-center"
        >
            {render({ bookmarked })}
        </div>
    )
}

export default Bookmark