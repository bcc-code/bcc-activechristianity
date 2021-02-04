import { Dispatch, Action } from 'redux'
import { ITrack, IUser, IMedia, ITrackType, INavItem, ITranslations, IApiItem, IBreadcrumb } from '@/types'


export interface StateAction extends Action {
  dispatch: Dispatch
  payload?: any
}

export interface IRootState {
  auth: IUserState,
  translatedUrls: ITranslationNavItem[]
  playlist: IMedia[]
  isAutoPlay: boolean,

  isSignInModalOpen: ISignInModalContentType
  isModalOpen: boolean
  mpPlayPause: boolean
  userLibrary: IUserLibrary
  currentMedia: IMedia,
  isPlaying: boolean,
  mpHeight: number
  breadcrumb: IBreadcrumb
}

export interface IUserLibrary {
  followedTopics: IApiItem[]
  followedPlaylists: IApiItem[]
  followedAuthors: IApiItem[]
  unfinishedPosts: IApiItem[]
  bookmarkedPosts: IApiItem[]
  historyPosts: IApiItem[]
}
export interface IUserState {
  is_editor?: boolean
  user?: IUser
  loggedIn: 'loading' | 'success' | 'loading' | 'notLoggedIn'
  errorMessage?: string
}

export type ISignInModalContentType = 'signUpOptions' | 'signInOptions' | 'signInForm' | 'signUpForm' | "forgotPassword" | "giveConsent" | null

export interface ADD_T_URLS_Payload {
  translated: ITranslations[]
}

export interface SET_SCREEN_SIZE_Payload {
  size: ScreenSizeType
  width: number,
  height: number
}
