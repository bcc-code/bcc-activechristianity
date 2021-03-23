import * as React from 'react';
import ReactPlaceholder from 'react-placeholder'
import { TextBlock, RectShape, TextRow, } from 'react-placeholder/lib/placeholders';


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
        <ReactPlaceholder ready={!loading} customPlaceholder={customerPlaceholder}>
            {children}
        </ReactPlaceholder>

    )
}

export const ListPlaceholder: React.FC<{ loading: boolean }> = ({ loading, children }) => {
    const customerPlaceholder = (
        <div className="standard-max-w sm:px-4 flex">

            {[""].map((item, k) => {
                return (
                    <RightImgPlaceholder key={k} />
                )
            })}
        </div>
    )
    return (
        <ReactPlaceholder type='media' rows={3} ready={!loading} color="WhiteSmoke" className="pb-4">
            {children}
        </ReactPlaceholder>
        /*         <ReactPlaceholder showLoadingAnimation ready={!loading} customPlaceholder={customerPlaceholder}>
                    {children}
                </ReactPlaceholder> */

    )
}

export const OneTopImgPost: React.FC<{ loading: boolean }> = ({ loading, children }) => {
    return (
        <ReactPlaceholder ready={!loading} customPlaceholder={<TopImgPlaceholder />}>
            {children}
        </ReactPlaceholder>

    )
}

export const DesktopFeaturedPostLoader: React.FC<{ loading: boolean }> = ({ loading, children }) => {
    return (
        <ReactPlaceholder ready={!loading} customPlaceholder={<DesktopFeaturedPlaceholder />}>
            {children}
        </ReactPlaceholder>

    )
}
export const DesktopFeaturedPlaceholder = () => {
    return (
        <div className="z-10 grid grid-cols-8 gap-12 standard-max-w-px relative pt-8 sm:pt-16 md:pt-20 lg:pt-24">
            <div className="col-start-1 col-end-6 ">
                <RectShape color="WhiteSmoke" className="text-gray-300 w-full sm:my-10 min-h-48 sm:min-h-64 md:min-h-64" />
            </div>

            <div className="col-start-6 col-end-9 ml-5 flex flex-col justify-center pt-0">

                <TextBlock color="WhiteSmoke" className="mt-4" rows={4} />
            </div>
        </div>

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
        /*         <div className="flex items-center">
                    <TextBlock color="WhiteSmoke" className="mt-4" rows={4} />
                    <RectShape color="WhiteSmoke" className="text-gray-300 w-full sm:my-10 min-h-48 sm:min-h-32 md:min-h-32 mx-4 max-w-48" />
                </div> */
        <div className="flex">
            <TextRow
                color="WhiteSmoke"
            />
            <TextBlock color="WhiteSmoke" className="mt-4" rows={4} />
            {/*  <RectShape color="WhiteSmoke" className="text-gray-300 w-full sm:my-10 min-w-12 sm:min-w-12 md:min-w-12" /> */}

        </div>
    )
}


export const RightImgListPlaceHolder: React.FC<{ count: number }> = ({ count }) => {
    const LEN = count;
    const arr = [];
    for (let i = 0; i < LEN; i++) {
        arr.push(0);
    }
    return (
        <div>
            {arr.map((item, i) => {
                return (
                    <RightImgPlaceholder key={i} />
                )
            })}
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

export const getPlaceholder = {
    row: RowPlaceholder,
    list: ListPlaceholder,
    one: OneTopImgPost
}

