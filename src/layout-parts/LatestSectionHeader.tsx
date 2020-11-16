import * as React from 'react'
import Link from '@/components/CustomLink'
import Icon from '@/components/Icons/Icon'
import ac_strings from '@/strings/ac_strings.js'

const LatestSectionHeader: React.FC<{ latestSlug: string }> = ({ latestSlug }) => {
    return (
        <Link to={`${latestSlug}`} className="font-roboto relative flex justify-between mt-8 pt-4 sm:pt-12 pb-2 text-d4dark text-base sm:border-b">
            <div className="flex items-center">
                <span className="block mx-2">{ac_strings.latest}</span>
            </div>
            <div className="text-d4gray flex items-center">
                <span>{ac_strings.more}</span>
                <span className="pr-6"><Icon name="ArrowForward" size="6" /></span>
            </div>
        </Link>
    )
}

export default LatestSectionHeader