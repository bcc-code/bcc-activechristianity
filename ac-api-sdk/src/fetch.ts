/* THIS IS ONLY FOR NODE TESTING */
//let cookie: string;
/* END */
function strArr(sa: any, delimiter: string = ', '): string {
  if (!sa) return ''
  if (typeof sa === 'object') {
    return Object.keys(sa).map((k: string) => `${k}: ${strArr(sa[k])}`).join(delimiter)
  }
  return Array.isArray(sa) ? sa.join(delimiter) : sa
}

function errorMessage(gqlError: IgqlError): string {
  let msg = strArr(gqlError.message)
  if (gqlError.extensions) {
    if (gqlError.extensions.validation) {
      msg = strArr(gqlError.extensions.validation)
    }
  }
  return msg
}

export default (config: IConfig):FFetch => {
  return (query: string, variables: any = {}):Promise<any> => {
    //return (window as any).gqlFetch(query, variables);

    const body = JSON.stringify({
      variables,
      query: query.trim(),
    })

    return fetch(config.gql_api_url, {
      method: 'POST',
      body,
      credentials: 'include',
      mode: 'cors', // 'cors' by default
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
      return res.json()
    }).then((gqlResponse: IgqlResponse) => {
      if (gqlResponse.errors) {
        if (config.debug) console.error(gqlResponse.errors.map(errorMessage).join(' & '))
        return Promise.reject(gqlResponse.errors.map(errorMessage))
      } else {
        if (config.debug) console.info(gqlResponse.data)
        return Promise.resolve(gqlResponse.data)
      }
    })
  }
}