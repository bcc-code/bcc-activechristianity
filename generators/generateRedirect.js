
const query = `{
    ac {
        redirects {
            to
            from
         }
    }
  }`
module.exports = function generateRedirects(actions, graphql) {
    const { createRedirect } = actions 
    return graphql(query).then((result) => {
        if (result.errors) {
          result.errors.forEach(e => console.error(e.toString()))
          return Promise.reject(result.errors)
        }
    
        const {redirects}= result.data.ac

        console.log("Generating redirects")
        _.each(redirects, ({to,from}) => {
         
  
          ccreateRedirect({
            fromPath:from,
            toPath:to,
            isPermanent: true
          })
        })
    
      })
}