import * as React from 'react'
import Link from '@/components/CustomLink'
interface IButton {
    className?: string
    to: string
    onClick?: (e: any) => void

}
const Button: React.FC<IButton> = ({ className, onClick, children, to }) => (

    <Link to={to} className={`block ${className}`} onClick={onClick}>
        {children}
    </Link>
)

export default Button
