import React from 'react'
import { useSelector } from "react-redux";
import Link from "@/components/CustomLink"
import LogoFull from '@/images/ACLogoFull'
import SocialPlatforms from '@/layout-parts/Nav/SocialPlatforms'
import UserNav from '@/layout-parts/Nav/User'
import ac_strings from '@/strings/ac_strings.js'


import { IRootState } from '@/state/types'

const Footer: React.FC = () => {
    const authInfo = useSelector((state: IRootState) => state.auth);

    return (
        <div className="w-full border-t relative bg-white">
            <div className="grid sm:grid-cols-4 standard-max-w">
                <div className="sm:col-start-1 sm:col-end-3 w-full flex flex-col sm:flex-row items-center sm:items-start border-b sm:border-none px-4 sm:py-10">
                    <div className="m-4 "
                    >
                        <LogoFull height="36px" width="36px" iconOnly />
                    </div>
                    <div>
                        <div className="text-sm text-center sm:text-left leading-normal" style={{ maxWidth: '440px' }}>{ac_strings.about_activechristianity_body}</div>
                        <Link to={ac_strings.slug_about} className="pt-4 flex text-gray-600 text-sm text-center sm:text-left">{ac_strings.learnMoreAC}</Link>
                    </div>
                </div>
                <div className="sm:col-start-3 px-4 py-10 text-sm border-b sm:border-none flex flex-col justify-center sm:justify-start">
                    <h6 className="font-roboto uppercase pb-4 text-center">{ac_strings.follow_us}</h6>
                    <SocialPlatforms />
                </div>
                <div className="sm:col-start-4 py-10 text-sm border-b sm:border-none flex flex-col justify-center sm:justify-start">
                    {authInfo.loggedIn !== 'success' && (
                        <div className="flex flex-col justify-center sm:justify-start">
                            <h6 className="font-roboto  uppercase pb-4 text-center">{ac_strings.exclusiveContent}</h6>
                            <div className="text-sm flex justify-center" >
                                <UserNav />
                            </div>
                        </div>
                    )}
                </div>

                {/*                 <div className="px-4 py-10 border-b sm:border-none sm:w-1/3">
                    <h6 className="font-roboto uppercase text-sm pb-4"> </h6>
                    <div><input type="text" placeholder="Email address" className="border rounded-xl px-4 py-2" /><button className="px-4 py-2 bg-d4secondary border-d4secondary text-white rounded-xl -m-4">{TS.subject}</button></div>
                </div> */}
            </div>

            <div className="w-full sm:border-t">
                <div className="standard-max-w  w-full flex flex-col sm:flex-row px-4 py-8 text-sm sm:justify-between">
                    <div className="text-d4cadet-blue order-2 sm:order-1 sm:max-w-1/2">
                        {ac_strings.copyright}
                    </div>
                    <div className="flex text-d4slate  w-full sm:w-auto justify-between items-center pb-10 sm:pb-0 order-1 sm:order-2">
                        <div>
                            <Link to={ac_strings.slug_privacy_policy} className="underline pr-4">{ac_strings.consent_privacy_policy}</Link>
                            <Link to={ac_strings.slug_cookie_policy} className="underline pr-4">{ac_strings.consent_cookie_policy}</Link>
                        </div>
                        <Link to={ac_strings.slug_contact} className="border border-d4slate px-2 py-1 rounded-md">{ac_strings.contact}</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default React.memo(Footer)

