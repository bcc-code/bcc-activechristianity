import * as React from 'react'
import Link from '@/components/CustomLink'
import LatestIcon from '@/components/Icons/Latest'
import ArrowRightIcon from '@/components/Icons/ArrowRightAlt'
import ac_strings from '@/strings/ac_strings.json'

const LatestSectionHeader: React.FC<{ latestSlug: string }> = ({ latestSlug }) => {
    return (
        <Link to={`/${latestSlug}`} className="font-roboto relative flex justify-between mt-8 mx-4 pt-4 sm:pt-12 pb-2 text-d4dark text-base sm:border-b">
            <div className="flex items-center">
                <span className="sm:hidden"><LatestIcon /></span>
                <span className="block mx-2">{ac_strings.latest}</span>
            </div>
            <div className="text-d4gray flex">
                <span>{ac_strings.more}</span><ArrowRightIcon />
            </div>
        </Link>
    )
}

export default LatestSectionHeader