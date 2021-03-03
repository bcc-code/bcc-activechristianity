
import React from "react"
import { graphql } from "gatsby"
import { Router } from "@reach/router"
import MetaTag from '@/components/Meta'
import Layout from "@/layouts/UserLayout"
import PrivateRoute from "@/components/PrivateRoute"
import Bookmarked from "@/layout-parts/User/Bookmarked"
import History from "@/layout-parts/User/History"
import Followed from "@/layout-parts/User/Followed"
import MyContent from "@/layout-parts/User/MyContent"
import ChangePassword from "@/layout-parts/Form/ChangePassword"
import DeleteProfile from "@/layout-parts/Form/Delete"
import ac_strings from '@/strings/ac_strings.js'
import { IPage } from '@/types'
import { menusItems, slugUser, userMenuItems } from '@/strings/generated/menus.json'


const componentMap = {
    "bookmarked": Bookmarked,
    "history": History,
    "followed": Followed,
    "changePassword": ChangePassword,
    "deleteProfile": DeleteProfile,
    "myContent": MyContent
}
const User: React.FC<IUserProps> = () => {

    const userLinks = Object.keys(userMenuItems).map(key => userMenuItems[key])

    return (
        <div>
            <MetaTag title={ac_strings.account} type="page" breadcrumb={[]} />
            <Layout
                pathname={slugUser}
                userLinks={userLinks}
            >
                <Router basepath={`/${slugUser}`}>
                    <PrivateRoute path="/" title={ac_strings.account} component={MyContent} />

                    {Object.keys(userMenuItems).map(key => {
                        const component = componentMap[key]
                        const page = userMenuItems[key]

                        return (
                            <PrivateRoute path={`/${(page.to).replace(`${slugUser}/`, "")}`} component={component} />
                        )
                    })}
                    <PrivateRoute path={userMenuItems.myContent.to} component={MyContent} />
                </Router>
            </Layout>

        </div>


    )
}

export default User

interface IProps {
    path: string
    location: {
        pathname: string
    }
    pageContext: {
        title: string
        userPages: {
            component: string
            path: string
            title: string
        }[]
    }
}


interface IUserProps {
    path: string
    data: {
        ac: {
            allPages: IPage[]
        }
    }
}
