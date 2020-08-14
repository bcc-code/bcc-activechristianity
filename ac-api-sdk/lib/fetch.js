/* THIS IS ONLY FOR NODE TESTING */
//let cookie: string;
/* END */
function strArr(sa, delimiter = ', ') {
    if (!sa)
        return '';
    if (typeof sa === 'object') {
        return Object.keys(sa).map((k) => `${k}: ${strArr(sa[k])}`).join(delimiter);
    }
    return Array.isArray(sa) ? sa.join(delimiter) : sa;
}
function errorMessage(gqlError) {
    let msg = strArr(gqlError.message);
    if (gqlError.extensions) {
        if (gqlError.extensions.validation) {
            msg = strArr(gqlError.extensions.validation);
        }
    }
    return msg;
}
export default (config) => {
    return (query, variables = {}) => {
        //return (window as any).gqlFetch(query, variables);
        const body = JSON.stringify({
            variables,
            query: query.trim(),
        });
        return fetch(config.gql_api_url, {
            method: 'POST',
            body,
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
                /* THIS IS ONLY FOR NODE TESTING */
                //cookie
                /* END */
            },
        }).then(res => {
            /* THIS IS ONLY FOR NODE TESTING */
            //cookie = res.headers.get('set-cookie') as string;
            /* END */
            return res.json();
        }).then((gqlResponse) => {
            if (gqlResponse.errors) {
                if (config.debug)
                    console.error(gqlResponse.errors.map(errorMessage).join(' & '));
                return Promise.reject(gqlResponse.errors.map(errorMessage));
            }
            else {
                if (config.debug)
                    console.info(gqlResponse.data);
                return Promise.resolve(gqlResponse.data);
            }
        });
    };
};
