import React from 'react'

import FetchSocialMediaPlatform from '@/HOC/FetchSocialMediaPlatforms'
interface ISubscribePodcast {
    showText?: boolean
}

export const SubscribePodcast: React.FC<ISubscribePodcast> = ({ showText }) => (
    <FetchSocialMediaPlatform
        podcast
        render={({ platforms }) => (
            <div className="flex flex-col mt-2 mb-4 ">
                {showText === true && <span className="w-full text-sm sm:text-center pb-4">Subscribe on</span>}
                <div className="w-full flex flex-wrap">
                    {/*  */}
                    {platforms.map((item, k) => {
                        return (
                            <a key={k} className="flex-1 max-h-8 max-w-8 mx-2" href={item.url} rel="noopener noreferrer">{item.icon}</a>
                        )
                    })}
                </div>
            </div>
        )}


    />

)