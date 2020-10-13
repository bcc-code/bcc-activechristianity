import * as React from 'react';
import ReactPlaceholder from 'react-placeholder'
import { TopImgPlaceholder } from './PlaceHolders'
const MainpageLoadingPeplacer: React.FC<{ loading: boolean }> = ({ loading, children }) => {
    const customerPlaceholder = (
        <div className="standard-max-w sm:px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-4 pb-16 w-full">

            {["", "", "", "", "", "", "", ""].map((item, k) => {
                return (
                    <TopImgPlaceholder key={k} />
                )
            })}
        </div>
    )
    return (
        <ReactPlaceholder showLoadingAnimation ready={!loading} customPlaceholder={customerPlaceholder}>
            {children}
        </ReactPlaceholder>

    )
}


export default MainpageLoadingPeplacer
