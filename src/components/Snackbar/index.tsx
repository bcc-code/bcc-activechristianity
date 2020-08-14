import * as React from 'react';
import CloseIcon from '@/components/Icons/Close'

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
                <CloseIcon className="w-2 h-2" />
            </button>}
        </div>
    )
}

export default Snackbar