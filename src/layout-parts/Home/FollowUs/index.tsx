import * as React from "react"
import SocialPlatforms from '@/layout-parts/Nav/SocialPlatforms'
import ac_strings from '@/strings/ac_strings.js'
const FollowUs = () => {
    return (
        <div className="px-4 rounded-lg flex flex-col py-8" style={{ background: '#edf2f7' }}>
            <h6 className="text-ac-slate-dark text-lg font-bold pb-4 border-b mb-4">{ac_strings.follow_us}</h6>
            <SocialPlatforms col />
        </div>
    )
}

export default FollowUs