export default class Other {
    _fetch: FFetch;
    constructor(app: IApp);
    /**
     * Returns a list of bible chapters that are referenced in posts.
     *
     * @returns Promise with the bible state
     */
    bibleState(): Promise<IBibleState>;
}
