import * as React from 'react';
import ReactPlaceholder from 'react-placeholder'
import { TextBlock, RectShape } from 'react-placeholder/lib/placeholders';

export const RowPlaceholder: React.FC<{ loading: boolean }> = ({ loading, children }) => {
    const customerPlaceholder = (
        <div className="standard-max-w sm:px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-4 pb-16 w-full">

            {["", "", "", ""].map((item, k) => {
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

export const ListPlaceholder: React.FC<{ loading: boolean }> = ({ loading, children }) => {
    const customerPlaceholder = (
        <div className="standard-max-w flex">

            {["", "", "", ""].map((item, k) => {
                return (
                    <RightImgPlaceholder key={k} />
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

export const OneTopImgPost: React.FC<{ loading: boolean }> = ({ loading, children }) => {
    return (
        <ReactPlaceholder showLoadingAnimation ready={!loading} customPlaceholder={TopImgPlaceholder}>
            {children}
        </ReactPlaceholder>

    )
}

export const TopImgPlaceholder = () => {
    return (
        <div className="flex flex-col">
            <RectShape color="WhiteSmoke" className="text-gray-300 w-full sm:my-10 min-h-48 sm:min-h-32 md:min-h-32" />
            <TextBlock color="WhiteSmoke" className="mt-4" rows={4} />
        </div>
    )
}

export const RightImgPlaceholder = () => {
    return (
        <div className="flex">

            <TextBlock color="WhiteSmoke" className="mt-4" rows={4} />
            <RectShape color="WhiteSmoke" className="text-gray-300 w-full sm:my-10 min-h-48 sm:min-h-32 md:min-h-32 mx-4" />
        </div>
    )
}


export const SingleLineTitle = () => {
    return (
        <div className="flex flex-col">
            <TextBlock color="WhiteSmoke" className="mt-4" rows={2} />
        </div>
    )
}

export const ScriptureBookBlock = () => {
    return (
        <RectShape color="WhiteSmoke" className="text-gray-300 w-full min-h-8" />
    )
}
