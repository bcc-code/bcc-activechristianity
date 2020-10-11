import * as React from 'react';
import Icon from '@/components/Icons/Icon'

interface ISearch {
    placedholderText: string
    clearInput: () => void
    onChange: (e: any) => void
    value: string
    setInputFocus?: (status: boolean) => void
}
const Search: React.FC<ISearch> = ({ onChange, clearInput, value, setInputFocus, placedholderText }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFocus = () => {
        if (setInputFocus) {
            setInputFocus(true)
        }
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    };
    //border bg-white rounded-full w-full overflow-hidden px-4 flex items-center mb-4 py-2
    // px-2 text-lg w-full rounded-lg h-8 sm:h-12
    return (
        <div
            className={`flex flex-auto border w-full bg-white rounded-lg sm:rounded-full items-center px-2 sm:px-4 sm:mb-4 overflow-hidden`}
            onClick={handleFocus}
            onKeyDown={handleFocus}
            role="application"

        >
            <Icon name="Search" size="6" />

            <input
                className="pl-2 flex-grow text-base placeholder-d4slate-dark h-8 sm:h-12"
                type="text"
                placeholder={placedholderText}
                ref={inputRef}
                onChange={onChange}
                onKeyDown={onChange}
                value={value}
            />
            {value !== '' && (
                <button
                    className="pl-2 block text-sm text-black"
                    onClick={clearInput}
                    onKeyDown={clearInput}
                >

                    <Icon name="Close" size="6" color="slate-light" />
                </button>
            )}
        </div>
    )
}

export default Search