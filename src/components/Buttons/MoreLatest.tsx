import React from "react"
import Link from '@/components/CustomLink'
import newString from '@/strings/ac_strings.json'
import ArrowRight from '@/components/Icons/ArrowRight'


const MoreLatest: React.FC<{ latestSlug: string }> = ({ latestSlug }) => (
    <div className="w-full flex justify-center py-4">
        <Link
            className="flex items-center px-2 py-1 text-d4secondary text-sm"
            to={`/${latestSlug}`}
        >
            <span>{newString.moreLatest}</span>
            <ArrowRight className="h-3 w-3 ml-4" />
        </Link>
    </div>
)

export default MoreLatest