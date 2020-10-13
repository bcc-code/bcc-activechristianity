import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { openSignInModal } from '@/state/action'
import { IRootState } from '@/state/types'
import { setNewFollowPlaylists } from '@/state/action/userAction'

export type IFollowStatus = "loading" | "true" | "false"
interface IFetchPost {
    id: string,
    className?: string
    render: (data: { followed: IFollowStatus }) => JSX.Element
}

const FollowTopic: React.FC<IFetchPost> = ({ id, className, render }) => {
    const { followedPlaylists, auth } = useSelector((state: IRootState) => ({ followedPlaylists: state.userLibrary.followedPlaylists, auth: state.auth }))
    const [followed, setFollowed] = React.useState<IFollowStatus>("loading")
    const dispatch = useDispatch()

    React.useEffect(() => {

        const found = followedPlaylists.findIndex(p => p.id === id)
        const followed = found > -1
        setFollowed(followed ? "true" : "false")
    }, [id, followedPlaylists])

    const handleClick = () => {
        if (auth.loggedIn === "success") {
            if (followed !== "loading") {
                setFollowed("loading")
                dispatch(setNewFollowPlaylists({ id, followed: followed === "true" }))
            }
        } else {
            dispatch(openSignInModal("signInOptions"))
        }
    }

    return (
        <div
            className={className ? className : ''}
            onClick={handleClick}
            onKeyDown={handleClick}
        >
            {render({ followed })}
        </div>
    )
}

export default FollowTopic