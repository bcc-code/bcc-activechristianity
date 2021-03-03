import { createSelector } from 'reselect'

import { IRootState } from '@/state/types'

const authSelectorState = (state: IRootState) => ({ auth: state.auth })
export const loggedInSelector = createSelector(authSelectorState, ({ auth }) => auth.loggedIn)
export const loggedInErrorSelector = createSelector(authSelectorState, ({ auth }) => auth.errorMessage)
export const authSelector = createSelector(authSelectorState, ({ auth }) => auth)

const userLibrarySelector = (state: IRootState) => ({ userLibrary: state.userLibrary })
export const followedTopicsSelector = createSelector(userLibrarySelector, ({ userLibrary }) => userLibrary.followedTopics)
export const bookmarkedSelector = createSelector(userLibrarySelector, ({ userLibrary }) => userLibrary.bookmarkedPosts)

export const followedPlaylistsSelector = createSelector(userLibrarySelector, ({ userLibrary }) => userLibrary.followedPlaylists)

