import axios from 'axios';
import * as types from '../../constants/actionTypes';
import { TMDB_URL, TMDB_API_KEY } from '../../constants/api';
import firebase from 'firebase';
import firebaseConfig from '../_global/firebase/firebaseApp';
import _ from 'lodash';

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
  }

// GENRES
// oke
export function retrieveMoviesGenresSuccess(res) {
	firebase.database().ref('genres/').set(res.data.genres)
	return {
		type: types.RETRIEVE_MOVIES_GENRES_SUCCESS,
		moviesGenres: res.data
	};
}
// oke
export function retrieveMoviesGenres() {
	// return function (dispatch) {
	// 	return axios.get(`${TMDB_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`)
	// 	.then(res => {
	// 		dispatch(retrieveMoviesGenresSuccess(res));
	// 	})
	// 	.catch(error => {
	// 		console.log(error); //eslint-disable-line
	// 	});
	// };
	return (dispatch) => {
		firebase.database().ref('genres').once('value',(data) =>{
				dispatch({
					type: types.RETRIEVE_MOVIES_GENRES_SUCCESS,
					moviesGenres: data.val()
				})
			})
	}
}

// POPULAR - OK
export const retrievePopularMoviesSuccess = (res) => {
	console.log(res.data,'data popularrr')
	firebase.database().ref('/movies/popular').set(res.data)
	return {
		type: types.RETRIEVE_POPULAR_MOVIES_SUCCESS,
		popularMovies: res.data
	};
	
}

export function retrievePopularMovies(page) {
	// return function (dispatch) {
	// 	return axios.get(`${TMDB_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`)
	// 	.then(res => {
	// 		dispatch(retrievePopularMoviesSuccess(res));
	// 	})
	// 	.catch(error => {
	// 		console.log('Popular', error); //eslint-disable-line
	// 	});
	// };
	return (dispatch) => {
		firebase.database().ref('/movies/popular').once('value',(data) =>{
				dispatch({
					type: types.RETRIEVE_POPULAR_MOVIES_SUCCESS,
					popularMovies: data.val()
				})
			})
	}
}

// NOW PLAYING - OK
export function retrieveNowPlayingMoviesSuccess(res) {
	firebase.database().ref('/movies/now_playing').set(res.data)
	return {
		type: types.RETRIEVE_NOWPLAYING_MOVIES_SUCCESS,
		nowPlayingMovies: res.data
	};
}

export function retrieveNowPlayingMovies(page) {
	// return function (dispatch) {
	// 	return axios.get(`${TMDB_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&page=${page}`)
	// 	.then(res => {
	// 		dispatch(retrieveNowPlayingMoviesSuccess(res));
	// 	})
	// 	.catch(error => {
	// 		console.log('Now Playing', error); //eslint-disable-line
	// 	});
	// };
	return (dispatch) => {
		firebase.database().ref('/movies/now_playing').once('value',(data) =>{
				dispatch({
					type: types.RETRIEVE_NOWPLAYING_MOVIES_SUCCESS,
					nowPlayingMovies: data.val()
				})
			})
	}
}

// MOVIES LIST - OK
export function retrieveMoviesListSuccess(res) {
	console.log(res,'alo 456')
	return {
		type: types.RETRIEVE_MOVIES_LIST_SUCCESS,
		list: res
	};
}

export function retrieveMoviesList(type, page) {
	return function (dispatch) {
		return firebase.database().ref('movies/' + type).once('value',(data) =>{
			dispatch(retrieveMoviesListSuccess(data.val()));
		})
		// .then(res => {
		// 	dispatch(retrieveMoviesListSuccess(res));
		// })
		// .catch(error => {
		// 	console.log('Movies List', error); //eslint-disable-line
		// });
	};
	// return (dispatch) => {
	// 	firebase.database().ref('/movies/' + type).once('value',(data) =>{
	// 		console.log(data.val(),'alo 123');
	// 			// dispatch({
	// 			// 	type: types.RETRIEVE_MOVIES_LIST_SUCCESS,
	// 			// 	list: data.val()
	// 			// })
	// 		})
	// }
	
}

// SEARCH RESULTS
export function retrieveMoviesSearchResultsSuccess(res) {
	return {
		type: types.RETRIEVE_MOVIES_SEARCH_RESULT_SUCCESS,
		searchResults: res.data
	};
}

export function retrieveMoviesSearchResults(query, page) {
	return function (dispatch) {
		return axios.get(`${TMDB_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=${page}`)
		.then(res => {
			dispatch(retrieveMoviesSearchResultsSuccess(res));
		})
		.catch(error => {
			console.log('Movies Search Results', error); //eslint-disable-line
		});
	};
}

// MOVIE DETAILS
export function retrieveMovieDetailsSuccess(res) {
	// console.log(res,'moive detailsssssssssss alo 123')
	// firebase.database().ref('movies/all/' + res.data.id).set(res.data)
	return {
		type: types.RETRIEVE_MOVIE_DETAILS_SUCCESS,
		details: res
	};
}

export function retrieveMovieDetails(movieId) {
	return function (dispatch) {
		return firebase.database().ref('movies/all/' + movieId).once('value',(data)=>{
			dispatch(retrieveMovieDetailsSuccess(data.val()));
		})
	};
	// return function (dispatch) {
	// 	return axios.get(`${TMDB_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=casts,images,videos`)
	// 	.then(res => {
	// 		dispatch(retrieveMovieDetailsSuccess(res));
	// 	})
	// 	.catch(error => {
	// 		console.log('Movie Details', error); //eslint-disable-line
	// 	});
	// };
}
