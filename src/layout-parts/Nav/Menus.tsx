
import * as React from 'react';
import { HeadsetIcon, HomeIcon, ExploreIcon, DescriptionIcon, LocalOfferIcon, BookmarksIcon, PlayCircleOutlineIcon } from '@/components/Icons/MUI'
import ac_strings from '@/strings/ac_strings.js'
export const slug_user = 'user'

export const menusItems = {
    "home": {
        name: ac_strings.home,
        to: "/"
    },
    "listen": {
        name: ac_strings.listen,
        to: ac_strings.slug_listen
    },
    "explore": {
        name: ac_strings.explore,
        to: ac_strings.slug_explore
    },
    "read": {
        name: ac_strings.read,
        to: ac_strings.slug_read
    },
    "watch": {
        name: ac_strings.watch,
        to: ac_strings.slug_watch
    },
    "about": {
        name: ac_strings.about,
        to: ac_strings.slug_about
    },
    "contact": {
        name: ac_strings.contact,
        to: ac_strings.slug_contact
    },
    "glossary": {
        name: ac_strings.glossary,
        to: ac_strings.slug_glossary
    },
    "topic": {
        name: ac_strings.topics,
        to: ac_strings.slug_topic
    },
    "podcast": {
        name: ac_strings.podcast,
        to: `${ac_strings.slug_podcast}/${ac_strings.slug_latest}`
    },
    "scripture": {
        name: ac_strings.scripture,
        to: `${ac_strings.slug_scripture}`
    },
}

export const userMenuItems = {
    "bookmarked": {
        name: ac_strings.bookmarked,
        to: `${slug_user}/${ac_strings.slug_user_bookmarked}`
    },
    "history": {
        name: ac_strings.history,
        to: `${slug_user}/${ac_strings.slug_user_history}`
    },
    "followed": {
        name: ac_strings.followed,
        to: `${slug_user}/${ac_strings.slug_user_followed}`
    },
    "changePassword": {
        name: ac_strings.change_password,
        to: `${slug_user}/${ac_strings.slug_user_change_password}`
    },
    "deleteProfile": {
        name: ac_strings.delete_profile,
        to: `${slug_user}/${ac_strings.slug_user_delete_profile}`
    },
    "myContent": {
        name: ac_strings.my_content,
        to: `${slug_user}/${ac_strings.slug_user_content}`
    },

}
const getDesktopMenu = () => {
    const menuOptions = {
        all: ["read", "listen", "watch", "explore"],
        podcast_only: ["read", "podcast", "watch", "explore"],
        other: ["read", "watch", "explore", "about"]
    }
    const listenSectionKey = process.env.LISTEN_SECTION
    const menu = listenSectionKey && menuOptions[listenSectionKey] ? menuOptions[listenSectionKey] : menuOptions.other
    return menu.map(item => menusItems[item]);
}

const getMobileMenu = (withItems?: boolean) => {
    const listen = ["explore", "read", "listen", "watch"]
    const withoutListen = ["explore", "read", "watch", "topic"]

    const menuOptions = {
        all: ["explore", "read", "listen", "watch"],
        podcast_only: ["read", "podcast", "watch", "explore"],
        other: ["explore", "read", "watch", "topic"]
    }

    const listenSectionKey = process.env.LISTEN_SECTION
    const menu = listenSectionKey && menuOptions[listenSectionKey] ? menuOptions[listenSectionKey] : menuOptions.other
    return withItems ? menu.map(item => menusItems[item]) : menu
}
export const desktopMenu = getDesktopMenu();
export const mobileMenuBase = getMobileMenu();
export const sideMenu = ["about", "contact"].map(item => menusItems[item]);
export const sideResourceMenu = getMobileMenu(true)
if (process.env.GLOSSARY === "true") {
    sideResourceMenu.push(menusItems.glossary)
}

export const iconMapNav: {
    [key: string]: {
        selected: JSX.Element,
        default: JSX.Element
    }
} = {
    'home': {
        selected: (
            <HomeIcon
                className="fill-slate-light"
            />
        ),
        default: (
            <HomeIcon
                className="fill-slate-light"
            />

        )
    },
    'explore': {
        selected: (
            <ExploreIcon
                className="fill-slate-light"
            />


        ),
        default: (
            <ExploreIcon
                className="fill-slate-light"
            />

        )
    },
    'listen': {
        selected: (
            <HeadsetIcon
                className="fill-slate-light"
            />
        ),
        default: (
            <HeadsetIcon
                className="fill-slate-light"
            />

        )
    },
    'podcast': {
        selected: (
            <HeadsetIcon
                className="fill-slate-light"
            />
        ),
        default: (
            <HeadsetIcon
                className="fill-slate-light"
            />

        )
    },
    'read': {
        selected: (
            <DescriptionIcon
                className="fill-slate-light"
            />


        ),
        default: (
            <DescriptionIcon
                className="fill-slate-light"
            />


        )
    },
    'watch': {
        selected: (
            <PlayCircleOutlineIcon
                className="fill-slate-light"
            />


        ),
        default: (
            <PlayCircleOutlineIcon
                className="fill-slate-light"
            />


        )
    },
    'my-content': {
        selected: (
            <BookmarksIcon
                className="fill-slate-light"
            />
        ),
        default: (
            <BookmarksIcon
                className="fill-slate-light"
            />


        )
    },
    'topic': {
        selected: (
            <LocalOfferIcon
                className="fill-slate-light"
            />


        ),
        default: (
            <LocalOfferIcon
                className="fill-slate-light"
            />

        )
    }
}