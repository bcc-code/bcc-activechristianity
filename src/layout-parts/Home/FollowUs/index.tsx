import * as React from "react"
import SocialPlatforms from '@/layout-parts/Nav/SocialPlatforms'
const FollowUs = () => {
    return (
        <div className="px-4 rounded-lg flex flex-col" style={{ backgroundImage: 'linear-gradient(#edf2f7,#fff)' }}>
            <h6 className="text-d4slate-dark text-lg font-bold py-8 border-b">Follow Us</h6>
            <SocialPlatforms col />
        </div>
    )
}

export default FollowUs