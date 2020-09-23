import React from "react"
import Link from '@/components/CustomLink'
import ac_strings from '@/strings/ac_strings.json'
import Icon from '@/components/Icons'


const MoreLatest: React.FC<{ latestSlug: string }> = ({ latestSlug }) => (
    <div className="w-full flex justify-center py-4">
        <Link
            className="flex items-center px-2 py-1 text-d4secondary text-sm"
            to={`/${latestSlug}`}
        >
            <span>{ac_strings.moreLatest}</span>
            <Icon name="chev-right" size="sm" />
        </Link>
    </div>
)

export default MoreLatest