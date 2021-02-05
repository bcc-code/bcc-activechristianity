import * as React from 'react'
interface IButton {
    className?: string
    disabledClassName?: string
    enabledClassName?: string
    onClick?: (e: any) => void

    disabled?: boolean
}
export const Button: React.FC<IButton> = ({ className, disabledClassName, enabledClassName, onClick, disabled, children }) => (
    <button
        className={`cursor-pointer ${className} ${disabled && disabledClassName ? disabledClassName : enabledClassName}`}
        onClick={onClick}
        onKeyDown={onClick}
        disabled={disabled}
    >
        {children}
    </button>
)


export default Button