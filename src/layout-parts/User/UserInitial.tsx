import React from 'react'
import { useSelector } from 'react-redux'
import Link from '@/components/CustomLink'
import { IRootState } from '@/state/types'

import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'
import { initials } from '@/helpers'

export const UserInitial: React.FC<{ name: string, className?: string }> = ({ name, className }) => (
    <svg viewBox="0 0 100 100" className={`block m-0 ${className}`}>
        <circle cx="50" cy="50" r="50" style={{ fill: "#edf2f7" }} />
        <text x="50" y="68" fontSize="50" fontWeight="500" textAnchor="middle">{initials(name)}</text>
    </svg>
)
const User: React.SFC = () => {
    const auth = useSelector((state: IRootState) => state.auth)
    return auth.loggedIn === "success" && auth.user ? (
        <div className="m-auto text-center">
            <div className="block w-11/12 m-auto" style={{ maxWidth: "100px" }}>
                <UserInitial name={auth.user.name} />
            </div>
            <h6 className="m-2">{auth.user.name}</h6>
        </div>
    ) : (
            <Link to={ac_strings.slug_login}>{TS.please_login}</Link>
        )
}

export default User

