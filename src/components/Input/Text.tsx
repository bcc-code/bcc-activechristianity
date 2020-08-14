import React from 'react'

interface IProps {
    name?: string
    label: string
    value: string | number
    onChange: (e: any) => void
    error?: string
    type?: 'text' | 'password' | 'hidden' | 'email'
    required?: boolean
}
const InputText: React.FC<IProps> = ({ value, label, onChange, type, error, name, required }) => {
    const inputType = type ? type : 'text'
    return (
        <div className="my-4 w-full">
            <label className="w-full text-sm sm:text-base pb-2 block" htmlFor={name}>
                {label}
                {required ? <span className="text-red-600">*</span> : ''}
            </label>
            <input
                className={`w-full border-b border-gray-500 focus:${error ? 'border-red-600' : 'border-gray-900'} block`}
                type={inputType}
                value={value}
                onChange={onChange}
                name={name}
                required={required}
            />
            <div
                className="w-full text-xs py-2 text-red-600"
            >
                {error}
            </div>
        </div>
    )
}

export default InputText