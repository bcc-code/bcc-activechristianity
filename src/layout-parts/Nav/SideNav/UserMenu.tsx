import * as React from 'react';
import Link from '@/components/CustomLink'
import ac_strings from '@/strings/ac_strings.json'
import TS from '@/strings'
import SideNavWrapper from './SideNavWrapper'
import UserInitial from '@/layout-parts/User/UserInitial'

import { SideNavItem } from '@/components/Button'
import loadable from '@loadable/component'
const EditProfile = loadable(() => import('./EditProfile'))
const EditAccountSettings = loadable(() => import('./EditAccountSettings'))

const SideMobile: React.FC<{
    isSideNavOpen: boolean
    close: () => void
    back: () => void
}> = ({ isSideNavOpen, close, back }) => {

    const [openEditProfile, setOpenEditProfile] = React.useState(false)
    const closeEditProfile = () => {
        setOpenEditProfile(false)
        close()
    }

    const [openEditAcc, setOpenEditAcc] = React.useState(false)
    const closeEditAcc = () => {
        setOpenEditAcc(false)
        close()
    }


    return (
        <SideNavWrapper
            title={ac_strings.my_profile}
            isSideNavOpen={isSideNavOpen}
            back={back}
            className="flex flex-col "
        >
            {openEditProfile && <EditProfile
                close={closeEditProfile}
                back={() => setOpenEditProfile(false)}
                isSideNavOpen={openEditProfile}
            />}
            {openEditAcc && <EditAccountSettings
                close={closeEditAcc}
                back={() => setOpenEditAcc(false)}
                isSideNavOpen={openEditAcc}
            />}
            <div className="w-full justify-center items-center flex flex-col px-4 py-8">
                <UserInitial />
                {/*               <button onClick={() => setOpenEditProfile(true)}
                    className="border border-d4slate-light text-d4slate-light text-sm rounded-full px-2 py-1 ">
                    {ac_strings.edit_profile}
                </button> */}
            </div>
            {/*             <SideNavItem
                onClick={() => setOpenEditAcc(true)}
                next
            >
                {ac_strings.account_setting}
            </SideNavItem > */}
            {[
                {
                    name: "My Content",
                    to: '/user/my-content'
                },
                {
                    name: "History",
                    to: '/user/history'
                }
            ].map((item, i) => {
                return (
                    <SideNavItem key={i} to={item.to} onClick={close}>
                        {item.name}
                    </SideNavItem >
                )
            })}

        </SideNavWrapper >
    )
}

export default React.memo(SideMobile)
