
import * as request from './requests';

const baseUrl = process.env.API_URL || "API_URL"
const sendQuery = (query: string) => {
    return fetch(baseUrl, {
        method: 'POST',
        'credentials': 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            /*              */
        },
        body: JSON.stringify({ query })
    })
        .then(response => response.json())
        .then(res => {
            return res.data
        })
}

export default {
    login: (username: string, password: string, remember: boolean) => {
        const query = request.loginMutation(username, password, remember)
        return sendQuery(query).then(res => res.signIn.user)
    },
    register: (username: string, email: string, password: string, remember: boolean) => {
        const query = request.registerMutation(username, email, password, remember)
        return sendQuery(query).then(res => res.signUp.user) //signUp
    },
    forgotPassword: (email: string) => {
        const query = request.forgotPasswordMutation(email)
        return sendQuery(query)
    },
    profile: () => {
        const query = request.profileQuery

        return sendQuery(query).then(res => {
            return res.me
        })
    },
    logout: () => {
        const query = request.logoutMutation
        return sendQuery(query).then(res => {
            return res.signOut
        })
    },
    liked: () => {
        const query = request.likedPostsQuery
        return sendQuery(query).then(res => {
            return res
        })
    },
    likePost: (id: string, toggle: boolean) => {
        const query = request.likePostMutation(id, toggle)
        return sendQuery(query).then(res => {
            return res
        })
    },
    following: () => {
        const query = request.followingQuery
        return sendQuery(query).then(res => {
            return res
        })
    },
    followPlaylist: (id: number, toggle: boolean) => {
        console.log(id)
        const query = request.followPlaylistMutation(id, !toggle)
        console.log(query)
        return sendQuery(query).then(res => {
            console.log(res)
            return res
        })
    },
    followTopic: (id: number, toggle: boolean) => {
        const query = request.followTopicMutation(id, !toggle)
        return sendQuery(query).then(res => {
            return res
        })
    },
    visitsPost: (id: string) => {
        const query = request.visitsPostMutation(id)
        return sendQuery(query).then(res => {
            return res
        })
    },
    history: () => {
        const query = request.latestHistoryQuery
        return sendQuery(query).then(res => {
            return res
        })
    },
    readingPost: (id: string) => {
        const query = request.readingPostMutation(id)
        return sendQuery(query).then(res => {
            return res
        })
    },
    unfinishedPosts: () => {
        const query = request.unfinishedQuery
        return sendQuery(query).then(res => {
            return res
        })
    },
    biblePosts: (bookId: number, chapter: number) => {
        const query = request.biblePostsQuery(bookId, chapter)
        return sendQuery(query).then(res => {
            return res
        })
    },
    topicReommendedPosts: (id: number) => {
        const query = request.topicReommendedPostsQuery(id)
        return sendQuery(query).then(res => {
            return res
        })
    },

    recommendedByPost: (id: number | string) => {
        const query = request.recommendedByPostQuery(id)
        return sendQuery(query).then(res => {
            return res
        })
    },
}