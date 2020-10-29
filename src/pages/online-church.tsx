import React from 'react'
import onlineServer16to9 from '@/images/landingPage/online-service-2.jpg'
import onlineServerMobile from '@/images/landingPage/online-church-small.jpg'
import Icon from '@/components/Icons/Icon'
import Countdown from 'react-countdown';
import EmbedVideo from '@/components/Images/Video16to9'
import Image2To1 from '@/components/Images/Image2To1'
import { FetchOnePost } from '@/HOC/FetchPosts'
import shortid from 'shortid'
import Link from '@/components/CustomLink'
import { timeToString } from '@/helpers'
import AddToCalendarLocal from '@/layout-parts/LandingPage/AddToCalendar'
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
    const date1 = '1 Nov 2020 17:00:00 UTC'
    const date2 = '1 Nov 2020 20:00:00 UTC'
    const date3 = '2 Nov 2020 02:00:00 UTC'

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
        cta: 'See details',
        theme: 'Theme:',
        inviteTitle: 'Online Church Service this Sunday. ',
        inviteDescription: 'BCC Church Service Live – Take up your cross: The secret to perfect unity. Join us this Sunday and connect with our community on our online church service!',
        emailOptionTitle: 'Notify me by email ',
        emailOptionConsent: 'By continuing, you consent to receiving email updates from ActiveChristianity.',
        eventTitle: 'Brunstad Christian Church Online Service',
        eventDescription: 'Sermon theme: “Take up your cross: The secret to perfect unity. Join us on our online service this Sunday, where we will hear more about how we as disciples of Christ are to react to all that\'s going on in the world today. Click on the URL to watch!',
        eventUrl: onlineChurchUrl
    }


    return (
        <div>
            <div className="relative font-roboto font-semibold">
                <div className="absolute inset-0 z-10 pt-4">
                    <div className="standard-max-w-px mx-auto text-white h-full flex flex-col" >
                        <div className="flex flex-col">
                            <span className="pb-2">Join us <span className="bg-red-600 text-white px-2 rounded">Live</span> This Sunday </span>

                            <h1 className="text-xl leading-snug md:text-3xl lg:text-4xl bold sm:leading-normal shadow">
                                Take up your cross:<br /> The secret to perfect unity
                        </h1>

                        </div>
                        <div className="flex flex-col pb-12">
                            <div className="mt-4 sm:mt-0">
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
                                                        <span className="flex flex-col items-center border border-white rounded-lg mr-2 p-2">
                                                            <span className="text-xs sm:text-4xl">{b.time}</span>
                                                            <span className="text-xs sm:text-base">{b.string}</span>
                                                        </span>
                                                    ))}

                                                </div>
                                            )
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <button className="flex items-center bg-d4primary text-black py-2 my-4 px-4 rounded-full">

                                    <span className="text-sm sm:text-2xl font-bold" onClick={handleShowDetailsClick}>{strings.cta}</span>
                                    <div className="block sm:hidden">
                                        <Icon
                                            name="KeyboardArrowRight"

                                            size="6"
                                        />
                                    </div>
                                    <div className="hidden sm:block">
                                        <Icon
                                            name="KeyboardArrowRight"

                                            size="12"
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="absolute inset-0" style={{ background: "#252730", opacity: "0.5" }}></div>
                <img className="hidden sm:block inset-0 w-full" src={onlineServer16to9} alt="" />
                <img className="block sm:hidden inset-0 w-full" src={onlineServerMobile} alt="" />
            </div>
            <div className="bg-d4slate-dark text-white py-4 ">
                <div className="standard-max-w-px mx-auto ">
                    <h1 className="text-xs uppercase font-bold pb-2">Before the service starts</h1>
                    <h1 className="font-bold text-lg">More on Message of the cross</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 py-4">
                        <div className="py-2 mb-6">
                            <FetchOnePost
                                slug={"bible-words-explained-what-does-it-mean-to-take-up-my-cross-daily"}
                                render={({ post }) => {
                                    return post ? (
                                        <>
                                            <div className="w-full">
                                                <EmbedVideo
                                                    className={`rounded-xxl sm:rounded-xl overflow-hidden`}
                                                    src="https://www.youtube.com/embed/3zIwaKgJrbU"

                                                />
                                            </div>
                                            <Link className="flex flex-col" to="/bible-words-explained-what-does-it-mean-to-take-up-my-cross-daily">
                                                <h2 className="text-lg bold py-4 font-semibold text-d4slate-lighter leading-normal">{post.title}</h2>
                                                <p className="leading-normal">{post?.excerpt}</p>
                                            </Link>
                                        </>
                                    ) : <div></div>
                                }}

                            />

                        </div>

                        {["the-message-of-the-cross-practical-christianity",
                            "the-message-of-the-cross-essential-but-unpopular-christianity"].map(slug => (
                                <div className="py-2 mb-6">
                                    <FetchOnePost
                                        slug={slug}
                                        render={({ post }) => {
                                            return post ? (
                                                <Link className="flex flex-col" to={post?.slug}>
                                                    <Image2To1
                                                        className="rounded-xxl overflow-hidden"
                                                        image={post?.image}
                                                    />
                                                    <h2 className="text-lg bold py-4 font-semibold text-d4slate-lighter leading-normal">{post?.title}</h2>
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
            <div className=" py-8" ref={refElem} style={{ background: "#e5e5e5" }}>
                <div className="standard-max-w-px mx-auto ">
                    <div className="bg-white text-d4slate-dark rounded-xl flex flex-col py-6 px-4">

                        <h5 className="mb-4 ">
                            <Icon name="Event" /><span className="font-bold">Event:</span>
                            <br />
                            <span className="">Brunstad Christian Church Online Service</span>
                        </h5>
                        <h5 className="mb-4 ">
                            <Icon name="Event" /><span className="font-bold">Theme:</span>
                            <br />
                            <span className="leading-normal">Take up your cross: The secret to perfect unit</span>
                            <br />
                            <span className="leading-normal">Join us on our online service Live this Sunday November 1, where we will hear more about how we as disciples are to react to all that’s going on in the world today. Set a reminder so you don’t miss this!</span>
                        </h5>
                        <div className="mb-4">
                            <Icon name="AccessTime" /><span className="font-bold">Date and Time:</span>
                            {[
                                {
                                    date: date1,
                                },
                                {
                                    date: date2,
                                },
                                {
                                    date: date3,
                                }
                            ].map(d => (
                                <span key={shortid()} className="flex">

                                    <span className="whitespace-pre-wrap">
                                        {timeToString(new Date(d.date))}
                                    </span>
                                </span>
                            ))}
                        </div>


                        <div className="pr-4">
                            <Icon name="LocationOn" />
                            <span className="font-bold">Watch live here:</span>
                            <span key={shortid()} className="flex">

                                <a href={onlineChurchUrl} className="text-blue-700 break-words w-11/12" target="_blank" >{onlineChurchUrl}</a>
                            </span>

                        </div>

                    </div>
                    <div>
                        <div className="grid sm:grid-cols-3 gap-4 py-4">
                            {[{
                                iconName: "GroupAdd",
                                bgColor: "bg-d4slate-light",
                                title: 'Invite a friend',
                                popUpTitle: 'Invite a friend',
                                popUpContent: (
                                    <div className="mx-auto w-full">
                                        <div className="flex flex-col">
                                            <div className="py-1">
                                                <FacebookMessengerShareButton
                                                    url={onlineChurchUrl}
                                                    title={strings.inviteTitle}

                                                    appId={"1879474385645145"}
                                                >
                                                    <div className="flex items-center">
                                                        <FacebookMessengerIcon {...IconProps} />
                                                        <span className="px-2">Facebook Messenger</span>
                                                    </div>

                                                </FacebookMessengerShareButton>

                                            </div>
                                            <div className="py-1">
                                                <FacebookShareButton
                                                    url={onlineChurchUrl}
                                                    quote={`${strings.inviteTitle} | ${strings.inviteDescription}`}
                                                >
                                                    <div className="flex items-center">
                                                        <FacebookIcon {...IconProps} />
                                                        <span className="px-2">Facebook</span>
                                                    </div>

                                                </FacebookShareButton>

                                            </div>
                                            <div className="py-1">
                                                <WhatsappShareButton
                                                    url={onlineChurchUrl}
                                                    title={`${strings.inviteTitle} | ${strings.inviteDescription}`}
                                                >
                                                    <div className="flex items-center">
                                                        <WhatsappIcon {...IconProps} />
                                                        <span className="px-2">Whatsapp</span>
                                                    </div>


                                                </WhatsappShareButton>
                                            </div>
                                            <div className="py-1">
                                                <TelegramShareButton
                                                    url={onlineChurchUrl}
                                                    title={`${strings.inviteTitle} | ${strings.inviteDescription}`}
                                                >
                                                    <div className="flex items-center">
                                                        <TelegramIcon {...IconProps} />
                                                        <span className="px-2">Telegram</span>
                                                    </div>

                                                </TelegramShareButton>
                                            </div>
                                            <div className="py-1">
                                                <EmailShareButton
                                                    url={onlineChurchUrl}
                                                    subject={strings.inviteTitle}
                                                    body={strings.inviteDescription}
                                                >
                                                    <div className="flex items-center">
                                                        <EmailIcon {...IconProps} />
                                                        <span className="px-2">Send Email</span>
                                                    </div>
                                                </EmailShareButton>
                                            </div>
                                        </div>
                                    </div>
                                )
                            },
                            {
                                iconName: "AddAlert",
                                bgColor: "bg-d4primary",
                                title: strings.emailOptionTitle,
                                popUpTitle: strings.emailOptionTitle,
                                popUpContent: (
                                    <div>
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
                                bgColor: "bg-d4slate-dark",
                                title: 'Add to Calendar',
                                popUpTitle: "Add to Calendar",
                                popUpContent: (
                                    <div>
                                        {[
                                            {
                                                date: date1,
                                                endDate: '1 Nov 2020 18:00:00 UTC'
                                            },
                                            {
                                                date: date2,
                                                event: '1 Nov 2020 21:00:00 UTC'
                                            },
                                            {
                                                date: date3,
                                                event: '2 Nov 2020 03:00:00 UTC',
                                            }
                                        ].map(e => {
                                            return (
                                                <div className="pb-4">
                                                    <span className="whitespace-pre-wrap">
                                                        {timeToString(new Date(e.date))}
                                                    </span>

                                                    <AddToCalendarLocal
                                                        event={{
                                                            title: strings.eventTitle,
                                                            description: strings.eventDescription,
                                                            startTime: e.date,
                                                            endTime: '1 Nov 2020 18:00:00 UTC'
                                                        }}

                                                    />
                                                </div>
                                            )
                                        })}

                                    </div>
                                )
                            },

                            ].map(item => {
                                return (
                                    <ModalWProps
                                        trigger={(
                                            <button classNamw={`${item.bgColor} p-4 text-white rounded-xl flex  items-center justify-center w-full`} >
                                                <Icon name={item.iconName} size="8" />
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