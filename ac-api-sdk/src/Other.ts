import gql from './gql'

export default class Other {

  _fetch: FFetch

  constructor(app: IApp) {
    this._fetch = app.$fetch
  }

  /**
   * Returns a list of bible chapters that are referenced in posts.
   *
   * @returns Promise with the bible state
   */
  async bibleState(): Promise<IBibleState> {
    const { bible } = await this._fetch(gql.queries.bible)
    return bible
  }

  /**
   * Returns a list of postRefs belonging to a specific bible chapter.
   *
   * @returns Promise with the array or postRef results
   */
  async biblePosts(id: string, ch: number): Promise<IBibleState> {
    const { biblePosts } = await this._fetch(gql.queries.biblePosts, { id, ch })
    return biblePosts
  }

}