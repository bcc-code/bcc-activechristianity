import { combineReducers } from 'redux';

/* import isModalOpen from './modalOpen' */
import auth from './authReducer';
import breadcrumb from './breadcrumb';
import infobar from './infobar';
import currentMedia from './mp_currentMedia';
import isAutoPlay from './mp_isAutoPlay';
import isPlaying from './mp_isPlaying';
import playlist from './mp_playlist';
import mpPlayPause from './mp_playpause';
import isSignInModalOpen from './signInModalOpen';
import translatedUrls from './translationUrl';
import userLibrary from './userLibrary';

export default combineReducers({
	auth,
	userLibrary,
	translatedUrls,
	playlist,
	isAutoPlay,
	isSignInModalOpen,
	mpPlayPause,
	isPlaying,
	currentMedia,
	breadcrumb,
	infobar
});
