import React from "react"
import { IOnePostByType } from '@/layout-parts/RecommendLayout/PostsByTypes'
import { IOnePostByTypeRow } from '@/layout-parts/RecommendLayout/PostsByTypeRow'
import { INavItem, IPostsByFormat, IPostItem, IPostsByFormatCollection, INavItemCount, ISubtopicLinks } from '@/types'

const PostsByTypesLayout = (collection: IPostsByFormat[]) => {


    const postsByTypesRow: IOnePostByTypeRow[] = []
    const postsByTypesRow1: IOnePostByType[] = []
    const postsByTypesRow2: IOnePostByType[] = []


    const nrOfFormats = collection.length
    if (nrOfFormats === 2) {
        postsByTypesRow.push(collection[0], collection[1])
        postsByTypesRow1.push(
            {
                type: collection[0].type,
                post: collection[0].postsRow[0],
                position: '1-wide',
                postThumnailType: 'leftImage'
            },
            {
                type: collection[1].type,
                post: collection[1].postsRow[0],
                position: '3',
                postThumnailType: 'topImage'
            },
            {
                type: {
                    name: "",
                    to: ""
                },
                post: collection[1].postsRow[1],
                position: '4',
                postThumnailType: 'topImage'
            }
        )
    }

    if (nrOfFormats === 3) {
        postsByTypesRow.push(collection[0], collection[1], collection[2])
        postsByTypesRow1.push(
            {
                type: collection[0].type,
                post: collection[0].postsRow[0],
                position: '1-wide',
                postThumnailType: 'leftImage'
            },
            {
                type: collection[1].type,
                post: collection[1].postsRow[0],
                position: '3',
                postThumnailType: 'topImage'
            },
            {
                type: collection[2].type,
                post: collection[2].postsRow[0],
                position: '4',
                postThumnailType: 'topImage'
            }
        )
    }

    if (nrOfFormats === 4) {
        postsByTypesRow.push(collection[0], collection[1], collection[2], collection[2])
        postsByTypesRow1.push(
            {
                type: collection[0].type,
                post: collection[0].postsRow[0],
                position: '1-wide',
                postThumnailType: 'leftImage'
            },
            {
                type: collection[1].type,
                post: collection[1].postsRow[0],
                position: '3',
                postThumnailType: 'topImage'
            },
            {
                type: {
                    name: "",
                    to: ""
                },
                post: collection[1].postsRow[1],
                position: '4',
                postThumnailType: 'topImage'
            }
        )

        postsByTypesRow2.push(

            {
                type: collection[2].type,
                post: collection[2].postsRow[0],
                position: '1',
                postThumnailType: 'topImage'
            },
            {
                type: {
                    name: "",
                    to: ""
                },
                post: collection[2].postsRow[1],
                position: '2',
                postThumnailType: 'topImage'
            },
            {
                type: collection[3].type,
                post: collection[3].postsRow[0],
                position: '2-wide',
                postThumnailType: 'leftImage'
            }
        )
    }

    if (nrOfFormats === 5) {
        postsByTypesRow.push(collection[0], collection[1], collection[2], collection[3], collection[4])
        postsByTypesRow1.push(
            {
                type: collection[0].type,
                post: collection[0].postsRow[0],
                position: '1-wide',
                postThumnailType: 'leftImage'
            },
            {
                type: collection[1].type,
                post: collection[1].postsRow[0],
                position: '3',
                postThumnailType: 'topImage'
            },
            {
                type: collection[2].type,
                post: collection[2].postsRow[0],
                position: '4',
                postThumnailType: 'topImage'
            }
        )
        postsByTypesRow2.push(
            {
                type: collection[3].type,
                post: collection[3].postsRow[0],
                position: '1-wide',
                postThumnailType: 'leftImage'
            },
            {
                type: collection[4].type,
                post: collection[4].postsRow[0],
                position: '3',
                postThumnailType: 'topImage'
            },
            {
                type: {
                    name: "",
                    to: ""
                },
                post: collection[4].postsRow[1],
                position: '4',
                postThumnailType: 'topImage'
            }
        )
    }
    return ({ postsByTypesRow, postsByTypesRow1, postsByTypesRow2 })
}

export default PostsByTypesLayout