
import * as request from './requests';
import endpoints from '@/strings/static/endpoints'
import { IGetPostsAndTopics } from './requests'
const baseUrl = endpoints.api_url
const sendQuery = (query: string) => {
    const options = {
        method: 'POST',
        'credentials': 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "x-lang": process.env.LANG_CODE
        },
        body: JSON.stringify({ query })
    }
    return fetch(baseUrl, options)
        .then(response => response.json())
        .then(res => {
            if (res.errors) {
                console.log(res.errors)
                res.errors.forEach(e => console.error(e.toString()))
                return Promise.reject(res.errors)
            } else {
                return res.data
            }

        })
}

export default {
    login: (username: string, password: string, remember: boolean) => {
        const query = request.loginMutation(username, password, remember)

        return sendQuery(query)
    },
    register: (email: string, password: string, remember: boolean) => {
        const query = request.registerMutation(email, password, remember)

        return sendQuery(query)
    },
    forgotPassword: (email: string) => {
        const query = request.forgotPasswordMutation(email)
        return sendQuery(query)
    },
    giveConsent: () => {
        const query = request.giveConsent

        return sendQuery(query)
    },
    toggleNotify: (agree: boolean) => {
        const query = request.toggleNotify(agree)
        return sendQuery(query)
    },
    toggleNotifyAndGiveConsent: (agree: boolean) => {
        const query = request.toggleNotifyAndGiveConsent(agree)
        return sendQuery(query)
    },
    profile: () => {
        const query = request.profileQuery

        return sendQuery(query).then(res => res.me)
    },
    logout: () => {
        const query = request.logoutMutation
        return sendQuery(query).then(res => {
            return res.signOut
        })
    },
    bookmarked: () => {
        const query = request.bookmarkedPostQuery
        return sendQuery(query)
    },
    bookmarkedPost: (id: string, toggle: boolean) => {
        const query = request.bookmarkPostMutation(id, toggle)
        return sendQuery(query)
    },
    following: () => {
        const query = request.followingQuery
        return sendQuery(query)
    },
    followPlaylist: (id: number, toggle: boolean) => {

        const query = request.followPlaylistMutation(id, !toggle)

        return sendQuery(query)
    },
    followTopic: (id: number, toggle: boolean) => {

        const query = request.followTopicMutation(id, !toggle)
        return sendQuery(query)
    },
    visitsPost: (id: string) => {
        const query = request.visitsPostMutation(id)
        return sendQuery(query)
    },
    history: () => {
        const query = request.latestHistoryQuery
        return sendQuery(query)
    },
    readingPost: (id: string) => {
        const query = request.readingPostMutation(id)
        return sendQuery(query)
    },
    unfinishedPosts: () => {
        const query = request.unfinishedQuery
        return sendQuery(query)
    },
    biblePosts: (bookId: number, chapter: number) => {
        const query = request.biblePostsQuery(bookId, chapter)
        return sendQuery(query)
    },
    topicReommendedPosts: (id: number) => {
        const query = request.topicReommendedPostsQuery(id)
        return sendQuery(query)
    },

    recommendedByPost: (id: number | string) => {
        const query = request.recommendedByPostQuery(id)
        return sendQuery(query)
    },
    recommended: () => {
        const query = request.recommendedPostsAndPopularTopic()
        return sendQuery(query)
    },
    getPostsByIds: (ids: string[]) => {
        const query = request.getPostsByIds(ids)
        return sendQuery(query).then(res => {
            return res
        })
    },
    getPostsAndTopicsByIds: (params: IGetPostsAndTopics) => {
        const { postsIds, topicsIds } = params
        const query = request.getPostsByIds({ postsIds, topicsIds })
        return sendQuery(query).then(res => {
            return res
        })
    },
    getScriptureChaptersPost: (bookId: string, ch: string) => {
        const query = request.getScriptChapterPostsQuery(bookId, ch)
        return sendQuery(query).then(res => {
            return res
        })
    },
    getOnePostById: (id: string) => {
        const query = request.getOnePostByIdQuery(id)
        return sendQuery(query)
    },
    getOnePagetById: (id: string) => {
        const query = request.getOnePageByIdQuery(id)

        return sendQuery(query)
    },
    getOnePreviewPostById: (id: string) => {
        const query = request.getOnePreviewPostByIdQuery(id)
        return sendQuery(query)
    },
    getOnePreviewPagetById: (id: string) => {
        const query = request.getOnePreviewPageByIdQuery(id)

        return sendQuery(query)
    },
    getPostsPerPageQueryByTopicId: (id: string, page: number) => {
        const query = request.getPostsPerPageQuery(id, page)
        return sendQuery(query)
    },
    getPostsPerPageQueryBySubtopicId: (id: string, subTopicId: string, page: number) => {
        const query = request.getPostsPerPageBySubtopicId(id, subTopicId, page)
        return sendQuery(query)
    }
}