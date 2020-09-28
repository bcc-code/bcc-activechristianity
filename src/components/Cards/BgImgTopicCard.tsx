import * as React from 'react';
import Link from '@/components/CustomLink'
import { IImage } from '@/types'
import Lazysizes from '@/components/Images/LazysizesImage'
export interface IBgImgTopicCard {
    name: string
    to: string
    image?: IImage

}
const BgImgTopicCard: React.FC<IBgImgTopicCard> = ({ name, image, to }) => {
    let background = 'rgba(33, 34, 54, 0.5)'

    const dummayImage = {

        "src": "https://ac2.day4.live/storage/sizes/18abbc63028c21e62a99f6eeb98470e5-w600.jpg",
        "dataUri": "data:image/svg+xml,<svg fill='none' viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><image x='0' y='0' width='800' height='400' xlink:href='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAZADIDAREAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAABwgDBAYF/8QALhAAAQMDAwEFCAMAAAAAAAAAAQIDBAAFBgcREiEIEzE2USIyM0FhcXOBFDVS/8QAGwEAAwEBAQEBAAAAAAAAAAAAAwQGBQcIAAL/xAAoEQACAgIBAwMDBQAAAAAAAAABAgADBBEFEiExBhMyM0FRImFxgaH/2gAMAwEAAhEDEQA/AOMy6xKuGmkuZIPc7Od5t4bip/JYV5/tL3AnpDJwhxdFtLn+5Ik63Iul/KW/aC3OIA+9UFCFzoTheayK5Y+Iz646MRcQwzFX2G3A/KZC1hQ9fSnabsvM6kvTSp2Bk64xMdy1LbZvtMWhWKwrXm1nLTq/5ji0hTahttTuZTiige022+8Nw+RkjMPvLpftL2ul+Xijjqb0vgwtvizIV8unQU9jY9LUrao1rzJvl8i6u9qgd78SUTGW/q7IvMFh3iFkKkISeO3rUzyb1V26BGjL70djtnWKmSO/5iebTa3SVqffKldSQn51KHo2f1iejF4NNDt/sMMkzO25Xp/JtUOXzfQyTuD7yqyEtsXL91x5kdlcliZmEcdG2wEmrT2yyZeYRmVjZxLw9lXietX1OUKtFRucgfFOQ5rsOhLx1Nw+TqJdsQt7oS1Dt0VK3Fceh2HhQq+XIpsBXWzF7uCVMit1bepsYRoba2s+g3DmsvLWOCeOwb29aDiZ1ftsH8wmZg5QvSyg6UeY8ag6NsZqlpNwuoahsEFSU9AAPrWquc6VdAHaZFmEl+QbW8w/v0vBceizrbEnRlFtvinwBJA9a5xz9zh1sA3qdM9OVtUOkdjJll6izWJTzbfEtoWpKT9AelPpVjOoYr3MrG529CV/EPtCbFbMgiPwmVvPzFNblSRvxNaNlAD9bznvGMLAUVdkx60D7PFrXl8i93tDgSyk90kp23UKdp6gf2n2biCpBYDsxXjXuO5kT6JahEgxyUoW6QB0+tL8jtgFURfFrSsF+rZM8W75tPcur7ONuNynXEbBTageNY9NLWNrept1XVVkO42JoX/MsisWNOvXaY62Xkd13aifH1putMiisra2/wATSx6MTk8gjHATtvvBCXjz10jOLdntPlw8krCuqTWTkZHQ/tuhMNj4hpLFXB1OVXp1eeatrvHA3/2K/QzkA17ZgTU5JPUJn7EfmuZ+E1SZXgTG9NfUb+Jd2Ne4v90WjwIfkvkYD9oDydL/ADqo1vmS7fSM4fsk+YZf6pUfKM0fSaMPaH/oBTFngQuD8mkwQ/hOVlZHyE3uM+LzxnPiK+5peGPmf//Z' /></svg>",
        "srcset": "https://ac2.day4.live/storage/sizes/18abbc63028c21e62a99f6eeb98470e5-w600.jpg 600w, https://ac2.day4.live/storage/18abbc63028c21e62a99f6eeb98470e5.jpg 800w"
    }

    const useImage: IImage = image || dummayImage
    return (
        <Link
            to={to}
            className={`w-full h-full rounded-xl p-2 overflow-hidden flex items-center justify-center relative ${image ? '' : 'bg-gray-800'}`}>
            <h6 className="text-white leading-tight text-sm font-bold content-end break-words z-10 text-center">{name}</h6>
            {useImage && <div className="z-0 absolute inset-0 overflow-hidden bg-center bg-cover w-full" style={{ backgroundImage: `url(${useImage.src})` }}></div>}
            <div className="z-0 absolute left-0 top-0 bottom-0 right-0 rounded-lg" style={{ background }}></div>
        </Link>
    )
}

export default BgImgTopicCard