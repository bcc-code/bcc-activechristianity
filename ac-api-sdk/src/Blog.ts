import gql from './gql'
import Emitter from './Emitter'

interface BlogEvents {
}

export default class Blog extends Emitter {

  _fetch: FFetch

  constructor(app: IApp) {
    super()
    this._fetch = app.$fetch
  }

  on<K extends keyof BlogEvents, T extends BlogEvents[K]>(event: K, cb: T) {
    super.on(event, cb)
  }

  /**
   * Returns popular posts
   *
   * @param count
   */
  async popularPosts(count: number = 24) {
    return this._fetch(gql.queries.popularPosts, { count })
  }

  /**
   * Returns recommended posts for the given post id
   *
   * @param postId
   * @param count
   */
  async recommendedByPost(postId: number, count: number = 5) {
    return this._fetch(gql.queries.recommendedByPost, { postId, count })
  }

  /**
   * Returns recommended posts for the current user, mostly based on read history
   *
   * @param count
   */
  async recommended(count: number = 5) {
    return this._fetch(gql.queries.recommended, { count })
  }

  /**
   * Track that a user has opened a post
   *
   * @returns Object<status, message>
   */
  async visitsPost(postId: number) {
    return this._fetch(gql.mutations.visitsPost, { postId })
  }

  /**
   * Track how much time the user has read the current post
   *
   * @returns Object<status, message>
   */
  async readingPost(postId: number) {
    return this._fetch(gql.mutations.readingPost, { postId })
  }

  /**
   * Get a list of PostRefs for posts the user has read
   *
   * @returns Object<status, message>
   */
  async history(limit: number):Promise<[ResourceRef]> {
    return this._fetch(gql.queries.history, { limit })
  }

  /**
   * Get a list of PostRefs for posts the user started reading, but haven't finished
   *
   * @returns Object<status, message>
   */
  async unfinishedPosts():Promise<[ResourceRef]> {
    return this._fetch(gql.queries.unfinishedPosts)
  }

  /**
   * Follow a topic
   *
   * @returns Object<status, message>
   */
  async followTopic(topicId: number, toggle: boolean) {
    return this._fetch(gql.mutations.followTopic, { topicId, toggle })
  }

  /**
   * Follow a tag
   *
   * @returns Object<status, message>
   */
  async followTag(tagId: number, toggle: boolean) {
    return this._fetch(gql.mutations.followTag, { tagId, toggle })
  }

  /**
   * Get resources that the user chose to follow
   *
   * @returns Object<status, message>
   */
  async following():Promise<{
    topics: [ResourceRef]
  }> {
    return this._fetch(gql.queries.following)
  }

  /**
   * Toggle likeing a post
   *
   * @returns Object<status, message>
   */
  async likePost(postId: number, toggle: boolean) {
    return this._fetch(gql.mutations.likePost, { postId, toggle })
  }

  /**
   * Get posts that the user has liked
   *
   * @returns Object<status, message>
   */
  async liked():Promise<[ResourceRef]> {
    return this._fetch(gql.queries.liked)
  }
}