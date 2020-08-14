import SDK from '../../ac-api-sdk/src'

const api = SDK({
    gql_api_url: process.env.API_URL
})

export const {
    auth,
    blog,
    other
} = api
