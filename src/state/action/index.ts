
import { Action } from 'redux'
import { ADD_T_URLS_Payload, ISignInModalContentType, } from '../types'
import { IMedia, IBreadcrumb, IInfobar } from '@/types'

interface ILogin {
  email: string
  password: string
}
export type loggedIn = (payload: ILogin) => Action
export type updateTranslationUrl = (payload: ADD_T_URLS_Payload) => Action
export type logout = () => Action
export type openSignInModal = (payload: ISignInModalContentType) => Action
export type closeSignInModal = () => Action
export type fixPlayer = () => Action
export type updateBreadcrumb = (payload: IBreadcrumb) => Action

export const setIsPlaying = (payload: boolean) => ({
  type: 'SET_IS_PLAYING',
  payload
})

export const setIsModalOpen = (payload: boolean) => ({
  type: 'SET_IS_MODAL_OPEN',
  payload
})

export const openSignInModal: openSignInModal = (payload: ISignInModalContentType) => ({
  type: 'OPEN_SIGNIN_MODAL',
  payload
})

export const closeSignInModal = () => ({
  type: 'CLOSE_SIGNIN_MODAL'
})


export const togglePlayMedia: fixPlayer = () => ({
  type: 'FLOAT_PLAYER'
})

export const updateBreadcrumb: updateBreadcrumb = (payload: IBreadcrumb) => ({
  type: 'UPDATE_BREADCRUMB',
  payload
})

export const updateTranslationUrl = (payload: ADD_T_URLS_Payload) => ({
  type: 'ADD_T_URLS',
  payload
});

export const addTracks = (payload: IMedia[]) => ({
  type: 'ADD_TRACKS',
  payload
})

export const setCurrentMedia = (payload: IMedia) => ({
  type: 'SET_CURRENT_MEDIA',
  payload
})

export const setAutoPlay = (payload: boolean) => ({
  type: 'SET_IS_AUTOPLAY',
  payload
})

export const removeTracks = () => ({
  type: 'REMOVE_TRACKS'
})

export const openInfo = (payload: IInfobar) => ({
  type: 'OPEN_INFO_BAR',
  payload
})

export const closeInfo = () => ({
  type: 'CLOSE_INFO_BAR'
})