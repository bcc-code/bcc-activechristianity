import { initials } from './index-js'
import { IImage } from '@/types'
import endpoinsts from '@/strings/static/endpoints'
const BaseUrl = endpoinsts.dummy_image_api

function hashCode(str: string): number {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i: number): string {
  var c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

function invertHex(hex: string): string {
  return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
}

type TSize = '400x200' | '640x320' | '400x400' | '500x708' | '200x300'

function stringToImage(str: string, size: TSize, bg?: string, fc?: string): string {
  const IN = initials(str)
  const BG = bg || intToRGB(hashCode(str))
  const FC = fc || invertHex(BG)

  return `${BaseUrl}/${size}/${BG}/${FC}&text=${IN}`
}


export function getImage(title: string, size: TSize, image?: IImage): IImage {

  let toReturn: IImage = {
    id: "",
    src: "",
    alt: "",
    srcset: "",
    dataUri: "",
    sizes: "",
    size: {
      width: 0,
      height: 0,
    },
    colors: [[0]],
    created_at: '',
    updated_at: ''
  }
  if (image) {
    return image
  } else {
    toReturn.src = stringToImage(title, size, '384156', 'F1AD2C')
    return toReturn
  }


}

export default stringToImage