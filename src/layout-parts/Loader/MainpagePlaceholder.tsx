import * as React from 'react';
import ReactPlaceholder from 'react-placeholder'
import { TextBlock, RectShape } from 'react-placeholder/lib/placeholders';

const MainpageLoadingPeplacer: React.FC<{ loading: boolean }> = ({ loading, children }) => {
    const customerPlaceholder = (
        <div className="standard-max-w sm:px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-4 pb-16 w-full">

            {["", "", "", "", "", "", "", "", ""].map(item => {
                return (
                    <TopImgPlaceholder />
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

const TopImgPlaceholder = () => {
    return (
        <div className="flex flex-col">
            <RectShape color="WhiteSmoke" className="text-gray-300 w-full sm:my-10 min-h-48 sm:min-h-32 md:min-h-32" />
            <TextBlock color="WhiteSmoke" className="mt-4" rows={4} />
        </div>
    )
}