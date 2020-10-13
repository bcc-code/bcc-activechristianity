import * as React from "react"
import { IPlaylist } from '@/types'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
interface IFetchPost {
    slug: string,
    render: (data: { playlists: IPlaylist[] }) => JSX.Element
}
const FetchPosts: React.FC<IFetchPost> = ({ slug, render }) => {
    const [playlists, setPlaylists] = React.useState<IPlaylist[]>([])
    React.useEffect(() => {

        fetch(`/page-data/${slug}/page-data.json`)
            .then(res => res.json())
            .then(res => {
                if (res.result && res.result.data.ac && res.result.data.ac.playlists) {
                    const allPlaylist = res.result.data.ac.playlists
                    setPlaylists(allPlaylist)
                }

            })
    }, [slug])

    return (

        <Placeholder
            loading={playlists.length === 0}
        >
            {render({ playlists })}
        </Placeholder>
    )

}

export default FetchPosts