import * as React from 'react';
import ReactPlaceholder from 'react-placeholder'
import { TextBlock, RectShape } from 'react-placeholder/lib/placeholders';

export const TopImgPlaceholder = () => {
    return (
        <div className="flex flex-col">
            <RectShape color="WhiteSmoke" className="text-gray-300 w-full sm:my-10 min-h-48 sm:min-h-32 md:min-h-32" />
            <TextBlock color="WhiteSmoke" className="mt-4" rows={4} />
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
