# AC Backend SDK

## Testing:

`npm run test`


## Scopes

 - **auth** Used for authentication and session

 - **blog** Used for all functions relevant to posts, topics etc.

 - **other** Used for all other public functions

### Auth

  - **auth.on(event: string)** Possible Events: *onUser*, *onLogin*, *onLogout*

  - **auth.login(email: string, password: string, remember: boolean)** Start a user session

  - **auth.register(fullname: string, email: string, password: string, remember: boolean)** Register a new user and start a session

  - **auth.profile()** Returns the profile for the current session

  - **auth.logout()** Close the current user session

  - **auth.reset(email: string)** Requests a password reset link to be sent to the given email address


### Blog

 - **blog.visitsPost(postId: number)** Track that a user has opened a post *Always first before readingPost*

 - **blog.readingPost(postId: number)** Call while the user reads a post. Every 10s or so.

 - **blog.popularPosts(count: number)** Returns popular posts

 - **blog.recommendedByPost(postId: number, count: number)** Returns recommended posts for the given post id

 - **blog.recommended(count: number)** Returns recommended posts for the current user, mostly based on read history

 - **blog.history(limit: number)** Get a list of PostRefs for posts the user has read.

 - **blog.unfinishedPosts()** Get the latest 10 PostRefs of posts the user hasn't finished reading.

 - **blog.followTopic(topicId: number, toggle: boolean)** Follow and unfollow a topic.

  - **blog.followTag(tagId: number, toggle: boolean)** Follow and unfollow a tag.

 - **blog.following()** Retrieve ResourceRefs for all resources that the user is following. (Open for future additions)

 - **blog.likePost(postId: number, toggle: boolean)** Like or unlinke a post

 - **blog.liked()** Retrieve all PostRefs of posts the user has liked


### Other

 - **other.bibleState()** Returns a list of bible chapters that are referenced in posts.

 - **other.biblePosts(id: string, ch: number)** Returns a list of postRefs belonging to a specific bible chapter.