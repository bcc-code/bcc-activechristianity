import { createSelector } from 'reselect'

import { IRootState } from '@/state/types'

const authSelector = (state: IRootState) => ({ auth: state.auth })
export const loggedInSelector = createSelector(authSelector, ({ auth }) => auth.loggedIn)

const userLibrarySelector = (state: IRootState) => ({ userLibrary: state.userLibrary })
export const followedTopicsSelector = createSelector(userLibrarySelector, ({ userLibrary }) => userLibrary.followedTopics)
export const bookmarkedSelector = createSelector(userLibrarySelector, ({ userLibrary }) => userLibrary.bookmarkedPosts)

export const followedPlaylistsSelector = createSelector(userLibrarySelector, ({ userLibrary }) => userLibrary.followedPlaylists)

