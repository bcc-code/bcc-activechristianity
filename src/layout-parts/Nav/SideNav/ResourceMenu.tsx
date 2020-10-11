import * as React from 'react';
import ac_strings from '@/strings/ac_strings.json'
import SideNavWrapper from './SideNavWrapper'
import { SideNavItem } from '@/components/Button'
import { INavItem } from '@/types'
const SideMobile: React.FC<{
    isSideNavOpen: boolean
    close: () => void
    back: () => void
    menu: INavItem[]
}> = ({ isSideNavOpen, close, back, menu }) => {


    return (
        <SideNavWrapper
            title={ac_strings.resource}
            isSideNavOpen={isSideNavOpen}
            back={back}
            className="flex flex-col "
        >
            <div className="mx-auto flex-1 flex flex-col font-roboto items-center justify-center font-semibold">
                {menu.map((item, i) => {
                    return (
                        <SideNavItem key={i} to={item.to} className=" px-4 py-2" onClick={close}>
                            {item.name}
                        </SideNavItem>
                    )
                })}


            </div>

        </SideNavWrapper >
    )
}

export default React.memo(SideMobile)
