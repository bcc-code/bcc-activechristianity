import * as React from 'react';
import Link from '@/components/CustomLink'
import { IImage } from '@/types'
import { dummyImage } from '@/helpers/imageHelpers'
import endpoinsts from '@/strings/static/endpoints'
export const asImageWDataUri = (uri: string) => ({
    ...dummyImage,
    "src": uri,
    "dataUri": uri,
    "srcset": uri
})



export interface IBgImgTopicCard {
    name: string | JSX.Element
    to: string
    image?: IImage
    overlay?: "dark" | "light" | "medium"
    rounded?: "rounded-xxl" | "rounded-xl" | "rounded" | "rounded-md" | "rounded-lg "
}
const BgImgTopicCard: React.FC<IBgImgTopicCard> = ({ name, image, to, overlay, rounded }) => {

    const overlayStyle = {
        dark: { background: "#020203", opacity: "0.3" },
        light: { background: "#9CA6BE", opacity: "0.68" },
        medium: { background: '#384156', opacity: "0.3" }
    }

    const useImage: IImage = image ? image : asImageWDataUri(`${endpoinsts.random_image_api}/400x300`)

    return (
        <Link
            to={to}
            className={`w-full h-full ${rounded ? rounded : "rounded-lg"} p-2 overflow-hidden flex items-center justify-center relative ${image ? '' : 'bg-gray-800'}`}>
            <h6 className="text-white leading-tight text-sm font-bold content-end break-words z-10 text-center">{name}</h6>
            {useImage && <div className="z-0 absolute inset-0 overflow-hidden bg-center bg-cover w-full" style={{ backgroundImage: `url(${useImage.src})` }}></div>}
            <div className={`z-0 absolute left-0 top-0 bottom-0 right-0 ${rounded ? rounded : "rounded-lg"} `} style={overlay ? overlayStyle[overlay] : overlayStyle.dark}></div>
        </Link>
    )
}

export default BgImgTopicCard