import React from 'react'
import SocialPlatforms from '@/layout-parts/Nav/SocialPlatforms'
import ac_strings from '@/strings/ac_strings.js'

import AcLogoOnly from '@/images/ACLogo/LogoOnly'

const Footer: React.FC = () => {
    return (
        <div className="w-full border-t relative bg-white z-50 mb-64">
            <div className="standard-max-w flex flex-col sm:flex-row">
                <div className=" sm:w-1/2 w-full flex flex-col sm:flex-row items-center sm:items-start border-b sm:border-none px-4 sm:py-10">
                    <div className="p-4">
                        <AcLogoOnly height="36px" width="36px" />
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-sm text-center sm:text-left leading-normal" style={{ maxWidth: '440px' }}>{ac_strings.about_activechristianity_body}</div>
                        <a href={`/${ac_strings.slug_about}`} className="py-4 underline flex text-gray-600 text-sm text-center sm:text-left">{ac_strings.learn_more_ac}</a>
                    </div>
                </div>
                <div className="sm:w-1/2 px-4 py-10 text-sm border-b sm:border-none flex flex-col justify-center sm:justify-start">
                    <h6 className="font-roboto uppercase pb-4 text-center">{ac_strings.follow_us}</h6>
                    <SocialPlatforms />
                </div>
            </div>

            <div className="w-full sm:border-t">
                <div className="standard-max-w  w-full flex flex-col sm:flex-row px-4 pt-8 pb-16 text-sm sm:justify-between">
                    <div className="text-d4cadet-blue order-2 sm:order-1 sm:max-w-1/2">
                        {ac_strings.copyright}
                    </div>
                    <div className="flex text-ac-slate  w-full sm:w-auto justify-between items-center pb-10 sm:pb-0 order-1 sm:order-2">
                        <div>
                            <a href={`/${ac_strings.slug_privacy_policy}`} className="underline pr-4">{ac_strings.consent_privacy_policy}</a>
                            <a href={`/${ac_strings.slug_cookie_policy}`} className="underline pr-4">{ac_strings.consent_cookie_policy}</a>
                        </div>
                        <a href={`/${ac_strings.slug_contact}`} className="border border-ac-slate px-2 py-1 rounded-md">{ac_strings.contact}</a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default React.memo(Footer)

