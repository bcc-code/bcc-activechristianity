import React from 'react'
import { useSelector } from 'react-redux'
import Link from '@/components/CustomLink'
import { IRootState } from '@/state/types'

import { initials } from '@/helpers'

export const UserInitial: React.FC<{ name: string, className?: string }> = ({ name, className }) => (
    <svg viewBox="0 0 100 100" className={`block m-0 ${className}`}>
        <circle cx="50" cy="50" r="50" style={{ fill: "#384156" }} />
        <text x="50" y="68" fontSize="50" fontWeight="500" textAnchor="middle" style={{ fill: "#9CA6BE" }}>{initials(name)}</text>
    </svg>
)
const User: React.FC = () => {
    const auth = useSelector((state: IRootState) => state.auth)
    return (
        <div></div>
    )
}

export default User

