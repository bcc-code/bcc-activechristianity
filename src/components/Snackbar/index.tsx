import * as React from 'react';
import { SearchIcon } from '@/components/Icons/MUI/navIcons'

interface ISnackbar {
    text: string
    onClick?: () => void
    error?: boolean
}
const Snackbar: React.FC<ISnackbar> = ({ text, onClick, error }) => {
    return (
        <div className={`rounded  w-full ${error ? 'bg-red-500' : 'bg-blue-500'} text-white py-4 px-2 my-4 flex justify-between`}>
            <div className="text-sm">
                {text}
            </div>
            {onClick && <button onClick={onClick}>
                < SearchIcon customSize="6" />
            </button>}
        </div>
    )
}

export default Snackbar