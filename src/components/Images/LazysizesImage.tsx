
import * as React from 'react';
import { IImage } from '@/types'
import 'lazysizes';

interface ILazysizes extends IImage {
    className: string
    style?: any
}
const LazysizesFeaturedImage: React.FC<ILazysizes> = (props) => {

    const { src, srcset, dataUri, alt, className, style } = props
    return (
        <img
            className={`lazyload ${className}`}
            src={dataUri}
            data-sizes="auto"
            data-src={src}
            data-srcset={srcset}
            style={style ? style : undefined}
        />
    )
}

export default LazysizesFeaturedImage