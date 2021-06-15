import * as React from "react"

export const fetchWallpaperById = (id: string) => {
    return fetch(`/page-data/wallpaper/${id}/page-data.json`)
        .then(res => res.json())
        .then(async (res) => {
            if (res.result && res.result && res.result.data) {
                return res.result.data.ac.quote
            }
            return null
        }).catch(error => {

            console.log(error)
        })
}

interface IFetchOnePost {
    id: string
    render: (data: { wallpaper: any | null }) => JSX.Element
}

const FetchOneWallpaper: React.FC<IFetchOnePost> = ({ id, render }) => {
    const [wallpaper, setWallpaper] = React.useState<any | null>(null)
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        let isSubscribed = true
        setLoading(true)
        fetchWallpaperById(id)
            .then(res => {
                if (isSubscribed) {
                    setLoading(false)
                    if (res) {
                        setWallpaper(res)
                    }
                }

            })
            .catch(error => {
                if (isSubscribed) {
                    setLoading(false)
                    console.log(error)
                }

            })
    }, [id])



    return (

        <div>
            {render({ wallpaper })}
        </div>
    )

}

export default FetchOneWallpaper