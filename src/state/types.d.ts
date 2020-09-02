import { Dispatch, Action } from 'redux'
import { ITrack, IUser, IMedia, ITrackType, INavItem, ITranslations, IApiItem } from '@/types'


export interface StateAction extends Action {
  dispatch: Dispatch
  payload?: any
}

export interface IRootState {
  auth: IUserState,
  translatedUrls: ITranslationNavItem[]
  playlist: IMedia[]
  isAutoPlay: boolean,
  isPlaying: boolean,
  isSignInModalOpen: ISignInModalContentType
  isModalOpen: boolean
  isPlayerFloating: boolean
  userLibrary: IUserLibrary
  currentMedia: IMedia
  mpHeight: number
  breadcrumb: INavItem[]
}

export interface IUserLibrary {
  followedTopics: IApiItem[]
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

export type ISignInModalContentType = 'signUpOptions' | 'signInOptions' | 'signInForm' | 'signUpForm' | null

export interface ADD_T_URLS_Payload {
  translated: ITranslations[]
}

export interface SET_SCREEN_SIZE_Payload {
  size: ScreenSizeType
  width: number,
  height: number
}
