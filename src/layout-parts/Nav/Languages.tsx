import React from 'react'
import { useSelector } from 'react-redux'
import { tranlationUlrsSelector } from '@/state/selectors/other'
import Dropdown from '@/components/Dropdown'

const Languages: React.FC<{ className?: string }> = ({ className }) => {


    const translatedUrls = useSelector(tranlationUlrsSelector)
    const languageOptions = translatedUrls.map(i => ({ label: i.name, href: i.to }))

    return (
        <Dropdown
            className={className}
            testName="tst-languages"
            label={process.env.LANG ? process.env.LANG : ''}
            options={languageOptions}
            selected={undefined}
        />

    )

}

export default Languages
