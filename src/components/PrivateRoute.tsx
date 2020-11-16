
import React from "react"
import { IRootState } from '@/state/types'
import { useSelector } from 'react-redux'
import { navigate } from "gatsby"
import ac_strings from '@/strings/ac_strings.js'
const PrivateRoute: React.FC<any> = ({ component: Component, location, ...rest }) => {
    const auth = useSelector((state: IRootState) => state.auth)


    if (auth.loggedIn === 'success') {
        return <Component {...rest} />
    } else if (auth.loggedIn == 'loading') {
        return <div>{ac_strings.loading}</div>
    } else {
        navigate('/')
        return null
    }

}

export default PrivateRoute