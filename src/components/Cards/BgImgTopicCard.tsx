import * as React from 'react';
import Link from '@/components/CustomLink'
import { IImage } from '@/types'
import RandomImage1 from '@/images/topic-random-01.jpg'
import RandomImage2 from '@/images/topic-random-02.jpg'
import RandomImage3 from '@/images/topic-random-03.jpg'
import RandomImage4 from '@/images/topic-random-04.jpg'

import { getRandomArray } from '@/helpers'
export const asImageWDataUri = (uri: string) => ({

    "src": uri,
    "dataUri": uri,
    "srcset": uri
})

const getRandomImage = () => {
    return asImageWDataUri(getRandomArray([RandomImage1, RandomImage2, RandomImage3, RandomImage4], 1)[0])
}
export interface IBgImgTopicCard {
    name: string | JSX.Element
    to: string
    image?: IImage
    overlay?: "dark" | "light" | "medium"
}
const BgImgTopicCard: React.FC<IBgImgTopicCard> = ({ name, image, to, overlay }) => {

    const overlayStyle = {
        dark: { background: "#020203", opacity: "0.3" },
        light: { background: "#9CA6BE", opacity: "0.68" },
        medium: { background: '#384156', opacity: "0.3" }
    }

    const useImage: IImage = image || getRandomImage()

    return (
        <Link
            to={to}
            className={`w-full h-full rounded-lg p-2 overflow-hidden flex items-center justify-center relative ${image ? '' : 'bg-gray-800'}`}>
            <h6 className="text-white leading-tight text-sm font-bold content-end break-words z-10 text-center">{name}</h6>
            {useImage && <div className="z-0 absolute inset-0 overflow-hidden bg-center bg-cover w-full" style={{ backgroundImage: `url(${useImage.src})` }}></div>}
            <div className="z-0 absolute left-0 top-0 bottom-0 right-0 rounded-lg" style={overlay ? overlayStyle[overlay] : overlayStyle.dark}></div>
        </Link>
    )
}

export default BgImgTopicCard