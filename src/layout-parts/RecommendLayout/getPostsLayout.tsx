import React from "react"
import { IOnePostByType } from '@/layout-parts/RecommendLayout/PostsByTypes'
import { IOnePostByTypeRow } from '@/layout-parts/RecommendLayout/PostsByTypeRow'
import { ITopicPostItems } from '@/types'
import { getRandomArray } from '@/helpers'
const PostsByTypesLayout = (collection: ITopicPostItems[]) => {

    console.log(collection)
    const postsByTypesRow1: IOnePostByType[] = []
    const postsByTypesRow2: IOnePostByType[] = []


    const nrOfFormats = collection.length
    if (nrOfFormats === 2) {
        const c0 = collection[0]
        const c1 = collection[1]
        postsByTypesRow1.push(
            {
                type: { name: c0.name, to: c0.slug },
                post: c0.posts[0],
                position: '1-wide',
                postThumnailType: 'leftImage'
            },
            {
                type: { name: c1.name, to: c1.slug },
                post: c1.posts[0],
                position: '3',
                postThumnailType: 'topImage'
            },
            {
                type: {
                    name: "",
                    to: ""
                },
                post: c1.posts[1],
                position: '4',
                postThumnailType: 'topImage'
            }
        )
    }

    if (nrOfFormats === 3) {
        const c0 = collection[0]
        const c1 = collection[1]
        const c2 = collection[2]
        postsByTypesRow1.push(
            {
                type: { name: c0.name, to: c0.slug },
                post: c0.posts[0],
                position: '1-wide',
                postThumnailType: 'leftImage'
            },
            {
                type: { name: c1.name, to: c1.slug },
                post: c1.posts[0],
                position: '3',
                postThumnailType: 'topImage'
            },
            {
                type: { name: c2.name, to: c2.slug },
                post: c2.posts[0],
                position: '4',
                postThumnailType: 'topImage'
            }
        )
    }

    if (nrOfFormats === 4) {
        const c0 = collection[0]
        const c1 = collection[1]
        const c2 = collection[2]
        const c3 = collection[3]
        postsByTypesRow1.push(
            {
                type: { name: c0.name, to: c0.slug },
                post: c0.posts[0],
                position: '1-wide',
                postThumnailType: 'leftImage'
            },
            {
                type: { name: c1.name, to: c1.slug },
                post: c1.posts[0],
                position: '3',
                postThumnailType: 'topImage'
            },
            {
                type: {
                    name: "",
                    to: ""
                },
                post: c1.posts[1],
                position: '4',
                postThumnailType: 'topImage'
            }
        )

        postsByTypesRow2.push(

            {
                type: { name: c2.name, to: c2.slug },
                post: c2.posts[0],
                position: '1',
                postThumnailType: 'topImage'
            },
            {
                type: {
                    name: "",
                    to: ""
                },
                post: c2.posts[1],
                position: '2',
                postThumnailType: 'topImage'
            },
            {
                type: { name: c3.name, to: c3.slug },
                post: c3.posts[0],
                position: '2-wide',
                postThumnailType: 'leftImage'
            }
        )
    }

    if (nrOfFormats === 5) {
        const c0 = collection[0]
        const c1 = collection[1]
        const c2 = collection[2]
        const c3 = collection[3]
        const c4 = collection[4]
        postsByTypesRow1.push(
            {
                type: { name: c0.name, to: c0.slug },
                post: c0.posts[0],
                position: '1-wide',
                postThumnailType: 'leftImage'
            },
            {
                type: { name: c1.name, to: c1.slug },
                post: c1.posts[0],
                position: '3',
                postThumnailType: 'topImage'
            },
            {
                type: { name: c2.name, to: c2.slug },
                post: c2.posts[0],
                position: '4',
                postThumnailType: 'topImage'
            }
        )
        postsByTypesRow2.push(
            {
                type: { name: c3.name, to: c3.slug },
                post: c3.posts[0],
                position: '1-wide',
                postThumnailType: 'leftImage'
            },
            {
                type: { name: c4.name, to: c4.slug },
                post: c4.posts[0],
                position: '3',
                postThumnailType: 'topImage'
            },
            {
                type: {
                    name: "",
                    to: ""
                },
                post: c4.posts[1],
                position: '4',
                postThumnailType: 'topImage'
            }
        )
    }

    if (nrOfFormats > 5) {
        const c0 = collection[0]
        const c1 = collection[1]
        const c2 = collection[2]
        const c3 = collection[3]
        const c4 = collection[4]
        const c5 = collection[5]
        postsByTypesRow1.push(
            {
                type: { name: c0.name, to: c0.slug },
                post: c0.posts[0],
                position: '1-wide',
                postThumnailType: 'leftImage'
            },
            {
                type: { name: c1.name, to: c1.slug },
                post: c1.posts[0],
                position: '3',
                postThumnailType: 'topImage'
            },
            {
                type: { name: c2.name, to: c2.slug },
                post: c2.posts[0],
                position: '4',
                postThumnailType: 'topImage'
            }
        )
        postsByTypesRow2.push(
            {
                type: { name: c3.name, to: c3.slug },
                post: c3.posts[0],
                position: '1-wide',
                postThumnailType: 'leftImage'
            },
            {
                type: { name: c4.name, to: c4.slug },
                post: c4.posts[0],
                position: '3',
                postThumnailType: 'topImage'
            },
            {
                type: { name: c5.name, to: c5.slug },
                post: c5.posts[0],
                position: '4',
                postThumnailType: 'topImage'
            }
        )
    }
    return ({ postsByTypesRow1, postsByTypesRow2 })


}

export default PostsByTypesLayout