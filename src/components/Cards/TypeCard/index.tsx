import * as React from 'react';
import FoldersImg from '@/images/Explore/Folders.png'
export interface ITypeCardProps {
    name: string
    color: string
    image: string
    count?: string
    small: boolean
}


const TypeCard: React.FC<ITypeCardProps> = ({ name, color, image, count, small }) => (
    <div className={`text-white ${color ? color : 'bg-gray-500'} ${small ? 'h-8 w-auto text-left rounded-lg' : 'h-48 w-32 text-center rounded-xxl sm:rounded-xl'}`}>
        <img alt={name} src={image ? image : FoldersImg} className={small ? 'hidden' : 'pointer-events-none w-full rounded-t-xl object-contain h-32 px-4'} />
        <div className={`px-2 ${small ? 'flex items-center h-full' : ''}`}>
            {count === undefined && small && (<span className="pr-2">✗ </span>)}
            <span className={`text-sm font-medium truncate ${small ? 'flex-1 text-left' : ''}`}>{name}</span>
            <p className={`text-xs opacity-75 ${small ? 'pl-2' : ''}`}>{count} <span className={small ? 'hidden' : ''}>resources</span></p>
        </div>
    </div>
)

export default TypeCard