import * as React from 'react'
import FetchWallpaper from '@/HOC/FetchWallpaper'
import { SingleLineTitle } from '@/components/Loader/PlaceHolders'
import { IGalleryImage } from '../BlockWrapper'
import WallpaperInfo from '@/components/QuoteImage/WallpaperInfo'


const ShowWallpaperRelatedInfo: React.FC<{ image?: IGalleryImage }> = ({ image }) => {

    return image ? (
        <FetchWallpaper
            id={image.quote_id}
            render={({ wallpaper }) => {
                if (wallpaper) {
                    return (
                        <WallpaperInfo {...wallpaper} />
                    )
                } else {
                    return (
                        <div className="min-h-64">
                            <SingleLineTitle nrOfRows={4} />
                        </div>
                    )
                }
            }} />
    ) : null
}

export default ShowWallpaperRelatedInfo