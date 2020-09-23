import * as React from "react"
import Link from '@/components/CustomLink'
import Icons from '@/components/Icons'
import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'
interface IButton {
    className?: string
    disabledClassName?: string
    enabledClassName?: string
    onClick?: () => void
    href?: string
    to?: string
    disabled?: boolean
}

export const Button: React.FC<IButton> = ({ className, disabledClassName, enabledClassName, onClick, href, to, disabled, children }) => {
    if (onClick) {
        return (
            <button
                className={`${className} ${disabled && disabledClassName ? disabledClassName : enabledClassName}`}
                onClick={onClick}
                onKeyDown={onClick}
                disabled={disabled}
            >
                {children}
            </button>
        )
    } else if (to) {
        return (
            <Link to={to} className={`block ${className}`}>
                {children}
            </Link>
        )
    } else if (href) {
        return (
            <a href={href} className={`block ${className}`}>
                {children}
            </a>
        )
    } else {
        return (
            <div className={className}>
                {children}
            </div>
        )

    }
}

interface IButtonName extends IButton {
    name: string | JSX.Element
}

interface IFormSubmitButton extends IButton {
    loading?: boolean
}

export const FormSubmitButton: React.FC<IFormSubmitButton> = ({ disabled, onClick, loading }) => {
    return (
        <Button
            disabled={disabled || loading}
            onClick={onClick}
            className="rounded text-base my-4 px-4 py-1 text-white"
            disabledClassName="bg-gray-500"
            enabledClassName="bg-d4secondary "
        >
            {loading ? ac_strings.loading : TS.send}
        </Button>
    )
}
export const OutlineButton: React.FC<IButtonName> = ({ name, disabled, onClick }) => {

    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            className="border rounded-full flex justify-between items-center text-base sm:text-lg px-4 py-2"
            disabledClassName="border-d4gray text-gray-500"
            enabledClassName="border-d4secondary text-d4secondary"
        >
            {name}
        </Button>
    )
}


export const OutlineSmallButton: React.FC<IButton> = ({ children, onClick }) => (
    <Button
        className="text-d4secondary text-xxs uppercase border-d4secondary border px-2 py-1 rounded-sm mb-4"
        onClick={onClick}
    >
        {children}
    </Button>

)

export interface IOutlineRightIcon extends IButton {
    name: string | JSX.Element
    count?: number | string
    arrow?: boolean
}

export const OutlineRightIcon: React.FC<IOutlineRightIcon> = ({ to, name, count, arrow }) => {
    return (
        <Button
            to={to}
            className={`${count ? 'border-d4secondary text-d4secondary' : ''} px-4 py-4 sm:px-8 sm:px-6 border rounded-xxl sm:rounded-xl flex justify-between items-center`}
        >
            <div className="text-base sm:text-lg ">
                {name}
            </div>
            <div className="text-xs sm:text:sm">
                {count ? count : ''}
                {arrow && (
                    <Icons name="right-arrow" size="base" />
                )}
            </div>
        </Button>
    )
}

