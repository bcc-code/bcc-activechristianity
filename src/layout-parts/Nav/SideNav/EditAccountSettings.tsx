import * as React from 'react';
import ac_strings from '@/strings/ac_strings.js'
import SideNavWrapper from './SideNavWrapper'

import { SideNavItem } from '@/components/Button'
import loadable from '@loadable/component'
import ChangePassword from './ChangePassword'

const SideMobile: React.FC<{
    isSideNavOpen: boolean
    close: () => void
    back: () => void
}> = ({ isSideNavOpen, close, back, }) => {

    const [openChangePassword, setOpenChangePassword] = React.useState(false)
    const closeEdit = () => {
        setOpenChangePassword(false)
        close()
    }
    return (
        <SideNavWrapper
            title={ac_strings.account_setting}
            isSideNavOpen={isSideNavOpen}
            back={back}
            className="flex flex-col"
            testName='tst-side-nav-edit-account'
        >
            {openChangePassword && <ChangePassword
                isSideNavOpen={openChangePassword}
                close={closeEdit}
                back={() => setOpenChangePassword(false)}
            />}
            <div className="w-full flex-1 flex flex-col items-center justify-center ">
                <SideNavItem
                    onClick={() => setOpenChangePassword(true)}
                    next
                >
                    {ac_strings.change_password}
                </SideNavItem>
                <SideNavItem>{ac_strings.delete_account}</SideNavItem>
            </div>

        </SideNavWrapper>
    )
}

export default React.memo(SideMobile)
