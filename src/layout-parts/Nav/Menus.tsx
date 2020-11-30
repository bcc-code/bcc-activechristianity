
import * as React from 'react';
import Icon from '@/components/Icons/Icon'
import ac_strings from '@/strings/ac_strings.js'
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
    "my_content": {
        name: ac_strings.my_content,
        to: `${ac_strings.slug_user}/${ac_strings.slug_user_content}`
    },
    "slug_user_history": {
        name: ac_strings.slug_user,
        to: `${ac_strings.slug_user}/${ac_strings.slug_user_history}`
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
    }
}

export const desktopMenu = ["read", "listen", "watch", "explore"].map(item => menusItems[item]);
export const mobileMenuBase = ["explore", "listen", "read", "watch",];
export const sideMenu = ["about", "contact"].map(item => menusItems[item]);
export const sideResourceMenu = [...mobileMenuBase].map(item => menusItems[item]);
if (process.env.LOCALE === "en") {
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
            <Icon
                name="Home"
                color="slate-light"
            />
        ),
        default: (
            <Icon
                name="Home"
                color="slate-light"
            />

        )
    },
    'explore': {
        selected: (
            <Icon
                name="Explore"
                color="slate-light"
            />


        ),
        default: (
            <Icon
                name="Explore"
                color="slate-light"

            />

        )
    },
    'listen': {
        selected: (
            <Icon
                name="Headset"
                color="slate-light"
            />



        ),
        default: (
            <Icon
                name="Headset"
                color="slate-light"
            />

        )
    },
    'read': {
        selected: (
            <Icon
                name="Description"
                color="slate-light"
            />


        ),
        default: (
            <Icon
                name="Description"
                color="slate-light"
            />


        )
    },
    'watch': {
        selected: (
            <Icon
                name="PlayCircleOutline"
                color="slate-light"
            />


        ),
        default: (
            <Icon
                name="PlayCircleOutline"
                color="slate-light"
            />


        )
    },
    'my-content': {
        selected: (
            <Icon
                name="Bookmarks"
                color="slate-light"
            />


        ),
        default: (
            <Icon
                name="Bookmarks"
                color="slate-light"
            />


        )
    }
}