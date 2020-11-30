import * as React from 'react'
import Link from '@/components/CustomLink'
import Icon from '@/components/Icons/Icon'
import ac_strings from '@/strings/ac_strings.js'

const LatestSectionHeader: React.FC<{ latestSlug: string }> = ({ latestSlug }) => {
    return (
        <Link to={`${latestSlug}`} className="font-roboto relative flex justify-between mt-8 pt-4 sm:pt-12 pb-2 text-d4dark text-base sm:border-b">
            <div className="flex items-center">
                <span className="block text-lg">{ac_strings.latest}</span>
            </div>
            <div className="uppercase text-gray-400 tracking-wider flex items-center text-sm">
                <span>{ac_strings.more}</span>
                <span ><Icon name="KeyboardArrowRight" size="4" /></span>
            </div>
        </Link>
    )
}

export default LatestSectionHeader