
import React from "react"
import { graphql } from "gatsby"
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
import { IPage } from '@/types'
const componentMap = {
    Bookmarked,
    History,
    Followed,
    Downloaded,
    ChangePassword,
    DeleteProfile
}
const User: React.FC<IUserProps> = ({ data }) => {
    console.log(data)
    const [userPages, setUserPages] = React.useState<IPage[]>([])
    const [profilePage, setProfilePage] = React.useState<IPage | undefined>(undefined)

    React.useEffect(() => {
        const selected: IPage[] = []
        data.ac.allPages.forEach(p => {
            if (`${p.id}` === process.env.USER_PAGE_ID) {
                setProfilePage(p)
            } else if (p.parent && `${p.parent.id}` === process.env.USER_PAGE_ID) {
                selected.push(p)
            }
        })
        setUserPages(selected)
    }, [data])

    const userLinks = userPages.map(item => ({ name: item.title, to: `${ac_string.slug_user}/${item.slug}` }))

    return (
        <div>
            <MetaTag title={TS.account} type="page" breadcrumb={[]} />
            {profilePage ? (
                <Layout
                    pathname={profilePage.slug}
                    userLinks={userLinks}
                >
                    <Router basepath={`/${ac_string.slug_user}`}>
                        <PrivateRoute path="/" title={TS.account} component={Profile} />

                        {userPages.map(page => {

                            const Component = componentMap[page.label]

                            return (
                                <PrivateRoute path={`/${page.slug}`} component={Component} />
                            )
                        })}
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
