import React from 'react'
import './inputStyle.css'

interface IProps {
    name?: string
    label?: string
    value: string | number
    onChange: (e: any) => void
    error?: string
    type?: 'text' | 'password' | 'hidden' | 'email'
    required?: boolean
    hideLabel?: boolean
}
const InputText: React.FC<IProps> = ({ value, label, onChange, type, error, name, required, hideLabel }) => {
    const inputType = type ? type : 'text'
    const [focused, setFocused] = React.useState(false)

    return (
        <div className={`w-full`}>
            {hideLabel !== true && (
                <label className="w-full text-sm pb-2 block font-roboto font-semibold" htmlFor={name}>
                    {label}
                    {required ? <span className="text-red-600">*</span> : ''}
                </label>
            )}
            <div className={`opacity-70 w-full rounded border overflow-hidden input-wrap ${focused ? ' border-gray-500' : ''} ${error ? ' border-red-700' : ''}`}>
                <input
                    className={`w-full block p-2 opacity-70 text-black`}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    name={name}
                    required={required}
                    onFocus={() => { setFocused(true) }}
                    onBlur={() => { setFocused(false) }}
                    placeholder={hideLabel === true ? label : ''}
                />
            </div>
            {(
                <div
                    className="w-full text-xs py-2 text-red-700 text-left"
                >
                    {error}
                </div>
            )}
        </div>
    )
}

export default InputText