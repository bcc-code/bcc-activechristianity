import * as React from "react"
import SocialPlatforms from '@/layout-parts/Nav/SocialPlatforms'
import ac_strings from '@/strings/ac_strings'
const FollowUs = () => {
    return (
        <div className="px-4 rounded-lg flex flex-col" style={{ backgroundImage: 'linear-gradient(#edf2f7,#fff)' }}>
            <h6 className="text-ac-slate-dark text-lg font-bold py-8 border-b">{ac_strings.follow_us}</h6>
            <SocialPlatforms col />
        </div>
    )
}

export default FollowUs