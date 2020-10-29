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
const Completionist = () => <span>You are good to go!</span>;

const OnlineChurch = () => {
    const refElem = React.useRef<HTMLDivElement | null>(null)

    const handleShowDetailsClick = () => {
        if (refElem.current) {
            refElem.current.scrollIntoView()
        }
    }

    const date1 = '1 Nov 2020 17:00:00 GMT'
    const date2 = '1 Nov 2020 20:00:00 GMT'
    const date3 = '2 Nov 2020 02:00:00 GMT'

    return (
        <div>
            <div className="relative font-roboto font-semibold">
                <div className="absolute inset-0 z-10" style={{ paddingTop: '3rem' }}>
                    <div className="standard-max-w-px mx-auto text-white h-full flex flex-col justify-between" >
                        <div className="flex flex-col">
                            <h1 className="text-base sm:text-3xl bold pb-4">Coming Up</h1>


                            <h1 className="uppercase bold text-sm sm:text-base ">Join us <span className="bg-red-600 text-white px-2">Live</span> This Sunday </h1>

                            <h1 className=" text-d4primary text-2xl leading-snug md:text-3xl lg:text-4xl bold sm:leading-normal uppercase shadow" style={{ maxWidth: "450px" }}>
                                Take up your cross:<br /> The secret to perfect unity
                        </h1>
                            <div className="pb-4 flex my-2">
                                <div className="text-sm sm:text-base bg-d4slate-dark p-2 leading-snug"> 9AM (PST) / 11AM (CST) / 12PM (EST) <br />NOVEMBER 1</div>
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
                                            return (
                                                <div className="flex text-white">
                                                    <span className="flex flex-col items-center border border-white rounded mr-2 p-2">
                                                        <span className="text-sxl sm:text-4xl">{days}</span>
                                                        <span className="text-sm sm:text-base">Days</span>
                                                    </span>
                                                    <span className="flex flex-col items-center border border-white rounded mr-2 p-2">
                                                        <span className="text-ssxl sm:text-4xl">{hours}</span>
                                                        <span className="text-sm sm:text-base">Hours</span>
                                                    </span>
                                                    <span className="flex flex-col items-center border border-white rounded mr-2 p-2">
                                                        <span className="text-sxl sm:text-4xl">{minutes}</span>
                                                        <span className="text-sm sm:text-base">Minutes</span>
                                                    </span>
                                                    <span className="flex flex-col items-center border border-white rounded mr-2 p-2">
                                                        <span className="text-sxl sm:text-4xl">{seconds}</span>
                                                        <span className="text-sm sm:text-base">Second</span>
                                                    </span>
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
                                    <span className="text-lg sm:text-2xl pr-4 font-bold" onClick={handleShowDetailsClick}>More details</span>

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
                        <div className="py-2 mb-12">
                            <FetchOnePost
                                slug="the-message-of-the-cross-practical-christianity"
                                render={({ post }) => {
                                    return (
                                        <Link className="flex flex-col" to={post?.slug}>
                                            <Image2To1
                                                className="rounded-xxl overflow-hidden"
                                                image={post?.image}
                                            />
                                            <h2 className="text-2xl bold py-4 font-semibold text-d4slate-lighter">{post?.title}</h2>
                                            <p className="leading-normal">{post?.excerpt}</p>
                                        </Link>
                                    )
                                }}

                            />

                        </div>
                        <div className="py-2 mb-12">
                            <FetchOnePost
                                slug="the-message-of-the-cross-essential-but-unpopular-christianity"
                                render={({ post }) => {
                                    return (
                                        <Link className="flex flex-col" to={post?.slug}>
                                            <Image2To1
                                                className="rounded-xxl overflow-hidden"
                                                image={post?.image}
                                            />
                                            <h2 className="text-2xl bold py-4 font-semibold text-d4slate-lighter">{post?.title}</h2>
                                            <p className="leading-normal">{post?.excerpt}</p>
                                        </Link >
                                    )
                                }}

                            />

                        </div>

                    </div>
                </div>

            </div>
            <div className="bg-d4primary py-12" ref={refElem}>
                <div className="standard-max-w-px mx-auto ">
                    <div className="bg-white text-blue-600 rounded-3xl flex flex-col  py-6  px-8">

                        <h1 className="text-3xl text-bold mb-4">Details</h1>
                        <span className="py-4">
                            Theme: Take up your cross: The secret to perfect unity
                            Set a reminder so you don't miss this!
                        </span>
                        <span key={shortid()} className="flex">
                            <div className="block pr-4">
                                <Icon name="AccessTime" />
                            </div>
                            <span className="whitespace-pre-wrap">
                                {timeToString(new Date(date1))}
                            </span>
                        </span>

                        <span key={shortid()} className="flex">
                            <div className="pr-4">
                                <Icon name="AccessTime" color="white" />
                            </div>
                            <span className="">
                                {timeToString(new Date(date2))}
                            </span>
                        </span>
                        <span key={shortid()} className="flex">
                            <div className="pr-4">
                                <Icon name="AccessTime" color="white" />
                            </div>
                            <span className="">
                                {timeToString(new Date(date3))}
                            </span>
                        </span>
                        <span key={shortid()} className="flex py-4">
                            <div className="pr-4">
                                <Icon name="LocationOn" />
                            </div>
                            <a href="https://brunstadchristianchurch.online.church" className="text-blue-700 break-words w-11/12" target="_blank" >https://brunstadchristianchurch.online.church/</a>
                        </span>



                        <div className="grid sm:grid-cols-3 gap-4 py-4">
                            <button className="bg-blue-900 p-4 text-white rounded-xl flex flex-col sm:flex-row items-center" >
                                <Icon name="AddAlert" size="12" />
                                <span className="px-4 mt-4">  Receive Notification</span>
                            </button>

                            <button className="bg-blue-900 p-4 text-white rounded-xl flex flex-col sm:flex-row items-center" >
                                <Icon name="Event" size="12" />
                                <span className="px-4 mt-4"> Add to Calendar</span>
                            </button>
                            <button className="bg-blue-900 p-4 text-white rounded-xl flex flex-col sm:flex-row items-center" >
                                <Icon name="GroupAdd" size="12" />
                                <span className="px-4 mt-4">Invite</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default OnlineChurch