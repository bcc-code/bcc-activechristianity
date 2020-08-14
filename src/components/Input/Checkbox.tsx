import React from 'react'

interface IProps {
    className?: string
    label: string
    value: boolean
    onChange: (e: any) => void
    error?: string
}
const InputCheck: React.FC<IProps> = ({ value, label, onChange, error, className }) => {
    return (
        <div className={`flex flex-col w-full ${className ? className : ''}`}>

            <label htmlFor={label}>
                <span className="py-2 pr-2">
                    <input
                        className="border rounded border-gray-600"
                        name={label}
                        type="checkbox"
                        checked={value}
                        onChange={onChange}
                    />
                </span>
                <span className="text-sm">
                    {label}
                </span>
            </label>
            <div
                className="w-full text:mini"
            >
                {error}
            </div>
        </div>
    )
}

export default InputCheck