import React from 'react'
import onlineServer16to9 from '@/images/landingPage/online-service-2.jpg'
import onlineServerMobile from '@/images/landingPage/online-service-small-2.jpg'
import Icon from '@/components/Icons/Icon'
import Countdown from 'react-countdown';
import EmbedVideo from '@/components/Images/Video16to9'
import Image2To1 from '@/components/Images/Image2To1'
import { FetchOnePost } from '@/HOC/FetchPosts'
import shortid from 'shortid'
import Link from '@/components/CustomLink'
import { timeToString } from '@/helpers'
import AddToCalendar from 'react-add-to-calendar'
import MailchimpSubscribe from "react-mailchimp-subscribe"
import CustomForm from '@/layout-parts/LandingPage/SignUpFormMailChimp'
import ModalWProps from '@/components/Modal/ModalWProps'
import {
    EmailShareButton,
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    EmailIcon,
    FacebookIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon

} from "react-share";

const Completionist = () => <span>You are good to go!</span>;

const OnlineChurch = () => {
    const refElem = React.useRef<HTMLDivElement | null>(null)

    const handleShowDetailsClick = () => {
        if (refElem.current) {
            refElem.current.scrollIntoView()
        }
    }
    const mailChimpUrl = "https://activechristianity.us2.list-manage.com/subscribe/post?u=ac35386bb66cd1f6e45717bcd&amp;id=f36218379d"
    const onlineChurchUrl = "https://brunstadchristianchurch.online.church"
    const date1 = '1 Nov 2020 17:00:00 GMT'
    const date2 = '1 Nov 2020 20:00:00 GMT'
    const date3 = '2 Nov 2020 02:00:00 GMT'
    const event = {
        title: 'Sample Event',
        description: 'This is the sample event provided as an example only',
        location: 'Portland, OR',
        startTime: date1,
        endTime: '1 Nov 2020 18:00:00 GMT'
    }
    const IconProps = {
        size: 40,
    }

    const text = 'Online Church This Sunday'

    const strings = {
        tagline: 'Join us live this sunday',
        title1: 'Take up your cross:',
        title2: 'The secret to perfect unity',
        timeGeneral: '9AM (PST) / 11AM (CST) / 12PM (EST) ',
        dateGeneral: 'NOVEMBER 1',
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
        cta: 'More details',
        theme: 'Theme:',
        inviteTitle: 'BCC Church Service Live – Take up your cross: The secret to perfect unity',
        inviteDescription: 'Join us this Sunday and connect with our community on our online church service!',
        emailOptionTitle: 'Notify me by email ',
        emailOptionConsent: 'By continuing, you consent to receiving email updates from ActiveChristianity.',
        eventTitle: 'Brunstad Christian Church Online Service',
        eventDescription: 'Sermon theme: “Take up your cross: The secret to perfect unity. Join us on our online service this Sunday, where we will hear more about how we as disciples of Christ are to react to all that\'s going on in the world today. Click on the URL to watch!',
        eventUrl: onlineChurchUrl
    }


    return (
        <div>
            <div className="relative font-roboto font-semibold">
                <div className="absolute inset-0 z-10" style={{ paddingTop: '3rem' }}>
                    <div className="standard-max-w-px mx-auto text-white h-full flex flex-col" >
                        <div className="flex flex-col">
                            <h1 className="uppercase bold text-sm sm:text-base ">Join us <span className="bg-red-600 text-white px-2">Live</span> This Sunday </h1>

                            <h1 className=" text-d4primary text-2xl leading-snug md:text-3xl lg:text-4xl bold sm:leading-normal uppercase shadow" style={{ maxWidth: "450px" }}>
                                Take up your cross:<br /> The secret to perfect unity
                        </h1>
                            <div className="pb-4 flex my-2">
                                <div className="text-sm sm:text-base bg-d4slate-dark p-2 leading-snug"> {strings.timeGeneral}<br />{strings.dateGeneral}</div>
                            </div>
                        </div>
                        <div className="flex flex-col pb-12">
                            <div className="mt-12 sm:mt-0">
                                <Countdown
                                    date={Date.parse(date1)}
                                    renderer={({ days, hours, minutes, seconds, completed }) => {
                                        if (completed) {
                                            // Render a completed state
                                            return <Completionist />;
                                        } else {
                                            // Render a countdown
                                            const countingBlocks = [
                                                { time: days, string: strings.days },
                                                { time: hours, string: strings.hours },
                                                { time: minutes, string: strings.minutes },
                                                { time: seconds, string: strings.seconds }
                                            ]
                                            return (
                                                <div className="flex text-white">
                                                    {countingBlocks.map(b => (
                                                        <span className="flex flex-col items-center border border-white rounded mr-2 p-2">
                                                            <span className="text-sxl sm:text-4xl">{b.time}</span>
                                                            <span className="text-sm sm:text-base">{b.string}</span>
                                                        </span>
                                                    ))}

                                                </div>
                                            )
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <button className="flex items-center bg-d4primary px-4 rounded-full mt-12">
                                    <div className="block sm:hidden pr-2">
                                        <Icon
                                            name="KeyboardArrowRight"
                                            color="white"
                                            size="8"
                                        />
                                    </div>
                                    <div className="hidden sm:block pr-2">
                                        <Icon
                                            name="KeyboardArrowRight"
                                            color="white"
                                            size="12"
                                        />
                                    </div>
                                    <span className="text-lg sm:text-2xl pr-4 font-bold" onClick={handleShowDetailsClick}>{strings.cta}</span>

                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="absolute inset-0" style={{ background: "#252730", opacity: "0.5" }}></div>
                <img className="hidden sm:block inset-0 w-full" src={onlineServer16to9} alt="" />
                <img className="block sm:hidden inset-0 w-full" src={onlineServerMobile} alt="" />
            </div>
            <div className="bg-d4slate-dark text-white py-12 ">
                <div className="standard-max-w-px mx-auto ">
                    <h1 className="text uppercase">Before the service starts</h1>
                    <h1 className="text-2xl text-d4primary font-bold">More on Message of the cross</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 py-4">
                        <div className="py-2 mb-12">
                            <div className="w-full">
                                <EmbedVideo
                                    className={`rounded-xxl sm:rounded-xl overflow-hidden`}
                                    src="https://www.youtube.com/embed/3zIwaKgJrbU"

                                />
                            </div>
                            <Link className="flex flex-col" to="/bible-words-explained-what-does-it-mean-to-take-up-my-cross-daily">
                                <h2 className="text-2xl bold py-4 font-semibold text-d4slate-lighter">Bible words explained: Take up your cross</h2>
                            </Link>
                        </div>
                        {["the-message-of-the-cross-practical-christianity",
                            "the-message-of-the-cross-essential-but-unpopular-christianity"].map(slug => (
                                <div className="py-2 mb-12">
                                    <FetchOnePost
                                        slug={slug}
                                        render={({ post }) => {
                                            return post ? (
                                                <Link className="flex flex-col" to={post?.slug}>
                                                    <Image2To1
                                                        className="rounded-xxl overflow-hidden"
                                                        image={post?.image}
                                                    />
                                                    <h2 className="text-2xl bold py-4 font-semibold text-d4slate-lighter">{post?.title}</h2>
                                                    <p className="leading-normal">{post?.excerpt}</p>
                                                </Link>
                                            ) : <div></div>
                                        }}

                                    />

                                </div>
                            ))
                        }


                    </div>
                </div>

            </div>
            <div className="bg-d4primary py-12" ref={refElem}>
                <div className="standard-max-w-px mx-auto ">
                    <div className="bg-white text-blue-600 rounded-3xl flex flex-col py-6 px-8">

                        <h1 className="text-3xl text-bold mb-4"></h1>
                        <span className="py-4">

                        </span>
                        {[
                            {
                                iconProps: {},
                                date: date1,
                            },
                            {
                                iconProps: { color: 'white' },
                                date: date2,
                            },
                            {
                                iconProps: { color: 'white' },
                                date: date3,
                            }
                        ].map(d => (
                            <span key={shortid()} className="flex">
                                <div className="block pr-4">
                                    <Icon name="AccessTime" {...d.iconProps} />
                                </div>
                                <span className="whitespace-pre-wrap">
                                    {timeToString(new Date(d.date))}
                                </span>
                            </span>
                        ))}

                        <span key={shortid()} className="flex py-4">
                            <div className="pr-4">
                                <Icon name="LocationOn" />
                            </div>
                            <a href={onlineChurchUrl} className="text-blue-700 break-words w-11/12" target="_blank" >{onlineChurchUrl}</a>
                        </span>



                        <div className="grid sm:grid-cols-3 gap-4 py-4">
                            {[
                                {
                                    iconName: "AddAlert",
                                    title: strings.emailOptionTitle,
                                    popUpTitle: strings.emailOptionTitle,
                                    popUpContent: (
                                        <div>
                                            <p className="py-4">
                                                {strings.emailOptionConsent}
                                            </p>
                                            <MailchimpSubscribe
                                                url={mailChimpUrl}
                                                render={({ subscribe, status, message }) => (
                                                    <CustomForm
                                                        status={status}
                                                        message={message}
                                                        onValidated={formData => subscribe(formData)}
                                                    />
                                                )}
                                            />
                                        </div>
                                    )
                                },
                                {
                                    iconName: "Event",
                                    title: 'Add to Calendar',
                                    popUpTitle: "Add to Calendar",
                                    popUpContent: (
                                        <div>
                                            {[
                                                {
                                                    date: date1,
                                                    endDate: '1 Nov 2020 18:00:00 GMT'
                                                },
                                                {
                                                    date: date2,
                                                    event: '1 Nov 2020 21:00:00 GMT'
                                                },
                                                {
                                                    date: date3,
                                                    event: '2 Nov 2020 03:00:00 GMT',
                                                }
                                            ].map(e => {
                                                return (
                                                    <div className="pb-4">
                                                        <span className="whitespace-pre-wrap">
                                                            {timeToString(new Date(e.date))}
                                                        </span>
                                                        <AddToCalendar event={{
                                                            title: strings.eventTitle,
                                                            description: strings.eventDescription,
                                                            startTime: e.date,
                                                            endTime: '1 Nov 2020 18:00:00 GMT'
                                                        }} />
                                                    </div>
                                                )
                                            })}

                                        </div>
                                    )
                                },
                                {
                                    iconName: "GroupAdd",
                                    title: 'Invite a friend',
                                    popUpTitle: 'Invite a friend',
                                    popUpContent: (
                                        <div>
                                            <div className="flex flex-col items-center">
                                                <div className="py-1">
                                                    <FacebookMessengerShareButton url={onlineChurchUrl} appId={"1879474385645145"}>
                                                        <FacebookMessengerIcon {...IconProps} />
                                                        <span>Facebook Messenger</span>
                                                    </FacebookMessengerShareButton>

                                                </div>
                                                <div className="py-1">
                                                    <FacebookShareButton
                                                        url={onlineChurchUrl}
                                                        quote={text}
                                                    >
                                                        <FacebookIcon {...IconProps} />
                                                        <span>  Share on Facebook</span>
                                                    </FacebookShareButton>

                                                </div>
                                                <div className="py-1">
                                                    <WhatsappShareButton url={onlineChurchUrl}>
                                                        <WhatsappIcon {...IconProps} />
                                                        <span>
                                                            Whatsapp
                                                    </span>
                                                    </WhatsappShareButton>
                                                </div>
                                                <div className="py-1">
                                                    <TelegramShareButton
                                                        url={onlineChurchUrl}
                                                        title={text}
                                                    >
                                                        <div className="flex items-center">
                                                            <TelegramIcon {...IconProps} />
                                                            <span>
                                                                Telegram
                                                    </span>
                                                        </div>
                                                    </TelegramShareButton>
                                                </div>
                                                <div className="py-1">
                                                    <EmailShareButton
                                                        url={onlineChurchUrl}
                                                        subject={text}
                                                        body={text}
                                                    >
                                                        <EmailIcon {...IconProps} />
                                                        <span>
                                                            Send Email
                                                    </span>
                                                    </EmailShareButton>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            ].map(item => {
                                return (
                                    <ModalWProps
                                        trigger={(
                                            <button className="bg-blue-900 p-4 text-white rounded-xl flex flex-col sm:flex-row items-center justify-center w-full" >
                                                <Icon name={item.iconName} size="12" />
                                                <span className="px-4 mt-4"> {item.title}</span>
                                            </button>
                                        )}
                                        content={(props: any) => {
                                            return (
                                                <div className="py-12 px-4 bg-d4slate-lighter">
                                                    <h2 className="font-bold pb-4">{item.popUpTitle}</h2>
                                                    {item.popUpContent}
                                                </div>
                                            )
                                        }}
                                        contentLabel="Get reminder"
                                    />

                                )
                            })}

                        </div>
                    </div>



                </div>
            </div>
        </div>

    )
}

export default OnlineChurch