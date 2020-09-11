import * as React from 'react';
import Icons from '@/components/Icons'

interface ISnackbar {
    text: string
    onClick?: () => void
}
const Snackbar: React.FC<ISnackbar> = ({ text, onClick }) => {
    return (
        <div className="rounded bg-red-500 w-full text-white py-4 px-2 my-4 flex justify-between">
            <div className="text-sm">
                {text}
            </div>
            {onClick && <button onClick={onClick}>
                <Icons name="search" size="sm" />
            </button>}
        </div>
    )
}

export default Snackbar