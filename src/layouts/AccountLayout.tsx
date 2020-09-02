import React from 'react'
import Link from '@/components/CustomLink'
import LeftSidebarLayout, { ISiderbar } from './LeftSidebarLayout'
import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'
import { useDispatch } from 'react-redux'
import { initiateLogout } from '@/state/action/authAction'
import UserInitials from '@/layout-parts/User/UserInitial'
import { LayoutH1 } from '@/layout-parts'
import { INavItem } from '@/types'

const AccountLayout: React.SFC<{ pathname: string, userLinks: INavItem[] }> = ({ children, pathname, userLinks }) => {

    const dispatch = useDispatch()
    const [currentPageTitle, setCurrentPageTitle] = React.useState<null | string>(null)

    React.useEffect(() => {
        if (currentPageTitle === null) {
            const page = userLinks.find(item => {
                return `/${item.to}` === pathname
            })
            if (page) {
                setCurrentPageTitle(page.name)
            }

        }
    }, [pathname])

    const handleLogout = () => {
        dispatch(initiateLogout())

    }

    const title = ac_strings.title_user

    const menuItemClassName = `flex tracking-wide text-base sm:text-lg sm:mb-2 leading-loose `
    const SidebarNav: React.FC<ISiderbar> = ({ closeMobileNav }) => {
        const handleClick = (title: string) => {
            setCurrentPageTitle(title)
            closeMobileNav()
        }

        return (
            <div >
                <div className="hidden sm:block py-8">
                    <UserInitials />
                </div>
                <div className="flex flex-col pb-8">
                    {userLinks.map((item, i) => (
                        <Link
                            key={i}
                            activeClassName="font-bold"
                            to={item.to}
                            className={menuItemClassName}
                            onClick={() => handleClick(item.name)}

                        >
                            <div>{item.name}</div>
                        </Link>
                    )
                    )}
                    <button
                        className={menuItemClassName}
                        onClick={handleLogout}
                        onKeyDown={handleLogout}
                    >
                        {TS.logout}
                    </button>
                </div>

            </div>

        )
    }

    return (
        <LeftSidebarLayout
            title={title}
            sidebar={SidebarNav}

            content={(
                <div className="sm:pt-18 px-4">
                    <LayoutH1 title={currentPageTitle || ''} />
                    {children}
                </div>
            )}
        />

    )
}


export default AccountLayout

