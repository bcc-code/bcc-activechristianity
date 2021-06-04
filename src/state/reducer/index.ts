import { combineReducers } from "redux";
import translatedUrls from "./translationUrl"
import playlist from "./mp_playlist"
import isAutoPlay from "./mp_isAutoPlay"
import currentMedia from "./mp_currentMedia"
import isPlaying from "./mp_isPlaying"
import mpPlayPause from "./mp_playpause"
import isSignInModalOpen from './signInModalOpen'
import isModalOpen from './modalOpen'
import auth from './authReducer'
import userLibrary from './userLibrary'
import mpHeight from './mp_height'
import breadcrumb from './breadcrumb'
import infobar from './infobar'
export default combineReducers({
    auth,
    userLibrary,
    translatedUrls,
    playlist,
    isAutoPlay,
    isSignInModalOpen,
    isModalOpen,
    mpPlayPause,
    isPlaying,
    currentMedia,
    mpHeight,
    breadcrumb,
    infobar
});