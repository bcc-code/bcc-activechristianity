import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { openSignInModal } from '@/state/action'
import { setNewLike } from '@/state/action/userAction'
import { bookmarkedSelector, loggedInSelector } from '@/state/selectors/user'
type bookmarkStatus = "loading" | "true" | "false"
interface IFetchPost {
    id: string,
    render: (data: { bookmarked: bookmarkStatus }) => JSX.Element
}

const Bookmark: React.FC<IFetchPost> = ({ id, render }) => {

    const bookmarkedPosts = useSelector(bookmarkedSelector)
    const loggedIn = useSelector(loggedInSelector)
    const [bookmarked, setBookmarked] = React.useState<bookmarkStatus>("false")
    const dispatch = useDispatch()
    React.useEffect(() => {
        if (loggedIn === "success") {
            const found = bookmarkedPosts.findIndex(p => p.id === id)
            const bookmarked = found > -1
            setBookmarked(bookmarked ? "true" : "false")
        }

    }, [id, bookmarkedPosts, loggedIn])
    const handleClick = () => {
        if (loggedIn === "success") {
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