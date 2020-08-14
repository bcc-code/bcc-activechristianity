
import React from "react"
import { IRootState } from '@/state/types'
import { useSelector } from 'react-redux'
import { navigate } from "gatsby"
import newStrings from '@/strings/NewStrings.json'
const PrivateRoute: React.SFC<any> = ({ component: Component, location, ...rest }) => {
    const auth = useSelector((state: IRootState) => state.auth)


    if (auth.loggedIn === 'success') {
        return <Component {...rest} />
    } else if (auth.loggedIn == 'loading') {
        return <div>{newStrings.loading}</div>
    } else {
        navigate('/')
        return null
    }

}

export default PrivateRoute