import * as React from 'react';
import { IIconProps } from '@/types'
const Share: React.SFC<IIconProps> = ({ customSize }) => {
    const size = customSize ? `${customSize}` : "24"
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox={`0 0 24 24`}
            className={`fill-current`}
            style={{ width: `${size}px` }}
        >

            <path
                strokeWidth="1"
                d="M 16.707031 2.2929688 L 15.292969 3.7070312 L 17.585938 6 L 17 6 C 10.936593 6 6 10.936593 6 17 L 6 18 L 8 18 L 8 17 C 8 12.017407 12.017407 8 17 8 L 17.585938 8 L 15.292969 10.292969 L 16.707031 11.707031 L 21.414062 7 L 16.707031 2.2929688 z M 2 8 L 2 9 L 2 19 C 2 20.64497 3.3550302 22 5 22 L 19 22 C 20.64497 22 22 20.64497 22 19 L 22 18 L 22 17 L 20 17 L 20 18 L 20 19 C 20 19.56503 19.56503 20 19 20 L 5 20 C 4.4349698 20 4 19.56503 4 19 L 4 9 L 4 8 L 2 8 z" />


        </svg>

    )
}

export default Share;