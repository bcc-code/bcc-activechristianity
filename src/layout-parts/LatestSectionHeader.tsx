import * as React from 'react'
import Link from '@/components/CustomLink'
import Icon from '@/components/Icons'
import ac_strings from '@/strings/ac_strings.json'

const LatestSectionHeader: React.FC<{ latestSlug: string }> = ({ latestSlug }) => {
    return (
        <Link to={`${latestSlug}`} className="font-roboto relative flex justify-between mt-8 mx-4 pt-4 sm:pt-12 pb-2 text-d4dark text-base sm:border-b">
            <div className="flex items-center">
                <span className="sm:hidden"><Icon name="clock" size="sm" /></span>
                <span className="block mx-2">{ac_strings.latest}</span>
            </div>
            <div className="text-d4gray flex items-center">
                <span>{ac_strings.more}</span>
                <Icon className="pl-4" name="right-arrow" size="base" />
            </div>
        </Link>
    )
}

export default LatestSectionHeader