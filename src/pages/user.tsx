
import React from "react"
import { graphql } from "gatsby"
import { Router } from "@reach/router"
import MetaTag from '@/components/Meta'
import Profile from "@/layout-parts/Form/Profile"
import Layout from "@/layouts/UserLayout"
import PrivateRoute from "@/components/PrivateRoute"
import Bookmarked from "@/layout-parts/User/Bookmarked"
import History from "@/layout-parts/User/History"
import Followed from "@/layout-parts/User/Followed"
import MyContent from "@/layout-parts/User/MyContent"
import Downloaded from "@/layout-parts/User/Downloaded"
import ChangePassword from "@/layout-parts/Form/ChangePassword"
import DeleteProfile from "@/layout-parts/Form/Delete"
import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.js'
import { IPage } from '@/types'
const componentMap = {
    "bookmarked": {
        slug: ac_strings.slug_user_bookmarked,
        title: ac_strings.bookmarked,
        component: Bookmarked,
    },
    "history": {
        slug: ac_strings.slug_user_history,
        title: ac_strings.history,
        component: History,
    },
    "followed": {
        slug: ac_strings.slug_user_followed,
        title: ac_strings.followed,
        component: Followed,
    },
    "changePassword": {
        slug: ac_strings.slug_user_change_password,
        title: ac_strings.change_password,
        component: ChangePassword,
    },
    "deleteProfile": {
        slug: ac_strings.slug_user_delete_profile,
        title: ac_strings.delete_profile,
        component: DeleteProfile,
    },
    "myContent": {
        slug: ac_strings.slug_user_content,
        title: ac_strings.my_content,
        component: MyContent,
    },
}
const User: React.FC<IUserProps> = ({ data }) => {



    const userLinks = Object.keys(componentMap).map(key => {
        const item = componentMap[key]
        return ({ name: item.title, to: `${ac_strings.slug_user}/${item.slug}` })
    })

    return (
        <div>
            <MetaTag title={TS.account} type="page" breadcrumb={[]} />
            <Layout
                pathname={ac_strings.slug_user}
                userLinks={userLinks}
            >
                <Router basepath={`/${ac_strings.slug_user}`}>
                    <PrivateRoute path="/" title={TS.account} component={MyContent} />

                    {Object.keys(componentMap).map(key => {
                        const page = componentMap[key]


                        return (
                            <PrivateRoute path={`/${page.slug}`} component={componentMap[key].component} />
                        )
                    })}
                    <PrivateRoute path={ac_strings.my_content} component={MyContent} />
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

export const pageQuery = graphql`
    query User {
        ac {
            allPages{
                id
                title
                slug
                label
                parent {
                         id
                }
            }
        }
    }
`
