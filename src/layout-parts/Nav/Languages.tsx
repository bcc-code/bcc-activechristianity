import React from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '@/state/types'

import Dropdown from '@/components/Dropdown'

const TopDesktop: React.FC<{ className?: string }> = ({ className }) => {

    const { translatedUrls } = useSelector((state: IRootState) => ({ authInfo: state.auth, translatedUrls: state.translatedUrls }));

    const languageOptions = translatedUrls.map(i => ({ label: i.name, href: i.to }))

    return (
        <div >
            <Dropdown
                padding={className}

                label={process.env.LANG ? process.env.LANG : ''}
                options={languageOptions}
                selected={undefined}
            />
        </div>

    )

}

export default TopDesktop
