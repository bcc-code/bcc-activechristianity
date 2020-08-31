
import React from "react"
import { Router } from "@reach/router"
import MetaTag from '@/components/Meta'
import Profile from "@/layout-parts/Form/Profile"
import Layout from "@/layouts/AccountLayout"
import PrivateRoute from "@/components/PrivateRoute"
import Bookmarked from "@/layout-parts/User/Bookmarked"
import History from "@/layout-parts/User/History"
import Followed from "@/layout-parts/User/Followed"
import Downloaded from "@/layout-parts/User/Downloaded"
import ChangePassword from "@/layout-parts/Form/ChangePassword"
import DeleteProfile from "@/layout-parts/Form/Delete"
import TS from '@/strings'
import ac_string from '@/strings/ac_strings.json'

const User: React.FC<IProps> = (props) => {

    return (
        <div>
            <MetaTag title={TS.account} type="page" breadcrumb={[]} />
            {typeof window !== 'undefined' ? (
                <Layout pathname={props.location.pathname}>
                    <Router basepath={`/${ac_string.slug_user}`}>
                        <PrivateRoute path="/" title={TS.account} component={Profile} />
                        {/*                         <PrivateRoute path="/" title={TS.account} component={Profile} />
                        <PrivateRoute path={`/${userChildren.bookmarked.to}`} component={Bookmarked} />
                        <PrivateRoute path={`/${userChildren.history.to}`} component={History} />
                        <PrivateRoute path={`/${userChildren.followed.to}`} component={Followed} />
                        <PrivateRoute path={`/${userChildren.ebooks.to}`} component={Downloaded} />
                        <PrivateRoute path={`/${userChildren.password.to}`} component={ChangePassword} />
                        <PrivateRoute path={`/${userChildren.delete.to}`} component={Delete} /> */}
                    </Router>
                </Layout>
            ) : (
                    <div><h1>User account page </h1></div>
                )}

        </div>


    )
}

export default User

interface IProps {
    location: {
        pathname: string
    }
}