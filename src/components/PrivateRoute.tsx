
import React from "react"
import { IRootState } from '@/state/types'
import { useSelector } from 'react-redux'
import { navigate } from "gatsby"
import ac_strings from '@/strings/ac_strings.js'
import { loggedInSelector } from '@/state/selectors/user'
const PrivateRoute: React.FC<any> = ({ component: Component, location, ...rest }) => {
    const loggedIn = useSelector(loggedInSelector)


    if (loggedIn === 'success') {
        return <Component {...rest} />
    } else if (loggedIn == 'loading') {
        return <div>{ac_strings.loading}</div>
    } else {
        if (typeof window !== "undefined") {
            navigate('/')
        }
        return null
    }

}

export default PrivateRoute