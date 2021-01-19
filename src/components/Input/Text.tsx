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
    console.log(error)
    return (
        <div className="my-4 w-full">
            <label className="w-full text-sm pb-2 block font-roboto font-semibold" htmlFor={name}>
                {label}
                {required ? <span className="text-red-600">*</span> : ''}
            </label>
            <div className={`opacity-70 w-full rounded border overflow-hidden focus:${error ? 'border-red-600' : 'border-ac-slate-light'}`}>
                <input
                    className={`w-full block p-2 opacity-70 text-black`}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    name={name}
                    required={required}
                />
            </div>

            <div
                className="w-full text-xs py-2 text-red-600"
            >
                {error}
            </div>
        </div>
    )
}

export default InputText