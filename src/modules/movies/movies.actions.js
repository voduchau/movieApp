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

export const retrievePopularMovies = (page) => {
	// return function (dispatch) {
	// 	return axios.get(`${TMDB_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`)
	// 	.then(res => {
	// 		dispatch(retrievePopularMoviesSuccess(res));
	// 	})
	// 	.catch(error => {
	// 		console.log('Popular', error); //eslint-disable-line
	// 	});
	// };
	return async (dispatch) => {
		await firebase.database().ref('/movies/popular').once('value',(data) =>{
				dispatch({
					type: types.RETRIEVE_POPULAR_MOVIES_SUCCESS,
					popularMovies: data.val()
				})
			})
	}
}

// NOW PLAYING - OK
export const retrieveNowPlayingMoviesSuccess = (res) => {
	firebase.database().ref('/movies/now_playing').set(res.data)
	return {
		type: types.RETRIEVE_NOWPLAYING_MOVIES_SUCCESS,
		nowPlayingMovies: res.data
	};
}

export const retrieveNowPlayingMovies = (page) => {
	// return function (dispatch) {
	// 	return axios.get(`${TMDB_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&page=${page}`)
	// 	.then(res => {
	// 		console.log(res.data,'112321312312312')
	// 		dispatch(retrieveNowPlayingMoviesSuccess(res));
	// 	})
	// 	.catch(error => {
	// 		console.log('Now Playing', error); //eslint-disable-line
	// 	});
	// };
	return async (dispatch) => {
		await firebase.database().ref('/movies/now_playing').once('value',(data) =>{
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
	// firebase.database().ref('movies/top_rated/').set(res.data)
	return {
		type: types.RETRIEVE_MOVIES_LIST_SUCCESS,
		list: {page: 1, results: res}
	};
}
// sort top_rated
const compare=( a, b ) =>{
	if ( a.vote_average < b.vote_average ){
	  return 1;
	}
	else{
	  return -1;
	}
  }
export const retrieveMoviesList = (type, page) => {
	console.log(type,'this is type')
	return  async (dispatch) => {
		return await firebase.database().ref('movies/all').child('results').orderByChild('vote_average').once('value',(data) =>{
			dispatch(retrieveMoviesListSuccess(data.val().sort(compare)));
		})
	};
	// return function (dispatch) {
	// 	return axios.get(`${TMDB_URL}/movie/${type}?api_key=${TMDB_API_KEY}&page=${page}`)
	// 	.then(res => {
	// 		dispatch(retrieveMoviesListSuccess(res));
	// 	})
	// 	.catch(error => {
	// 		console.log('Movies List', error); //eslint-disable-line
	// 	});
	// };
	
}

// SEARCH RESULTS
export function retrieveMoviesSearchResultsSuccess(res) {
	return {
		type: types.RETRIEVE_MOVIES_SEARCH_RESULT_SUCCESS,
		searchResults: res.data
	};
}

export function retrieveMoviesSearchResults(query, page) {
	return (dispatch) => {
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
	// get all = now_playing + popular
	// firebase.database().ref('/movies/now_playing').once('value',(data1) =>{
	// 	firebase.database().ref('/movies/popular').once('value',(data2)=>{
	// 		let now = data1.val()
	// 		let pop = data2.val()
	// 		let rs1 = data1.val().results
	// 		let rs2 = data2.val().results
	// 		rs2.map(item => {
	// 			rs1.push(item)
	// 		})
	// 		// console.log({...now,results:rs1},'this is rs1111111111111111111111111111')
	// 		firebase.database().ref('/movies/all').set({...now,results:rs1})
	// 	})
	// })
	console.log(res,'res thì sao')
	return {
		type: types.RETRIEVE_MOVIE_DETAILS_SUCCESS,
		details: res.data
	};
}

export function retrieveMovieDetails(movieId) {
	// return function (dispatch) {
	// 	return firebase.database().ref('movies/all/results').once('value',(data)=>{
	// 		dispatch(retrieveMovieDetailsSuccess(data.val()));
	// 	})
	// };
	return async function (dispatch) {
		 await axios.get(`${TMDB_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=casts,images,videos`)
			.then(res => {
				console.log(res,'k lẽ')
				dispatch(retrieveMovieDetailsSuccess(res));
			})
			.catch(error => {
				console.log('vap 33333 lỗi')
				console.log('Movie Details', error); //eslint-disable-line
			});
	};
}

export function getRecommendMovie (genres) {
	if(genres){
		const category = genres.map(a => a.id)
		return function (dispatch) {
			return firebase.database().ref('movies/all/results').once('value', (data) => {
				const res = data.val().filter(item =>
					 item.genre_ids.some(r=> category.indexOf(r) >= 0)
				)
				dispatch({
					type: 'GET_RECOMMEND',
					payload: res
				})
			} )
		}
	}
	// const category =  genres.map(a => a.id);
	return function (dispatch) {
		return firebase.database().ref('movies/all/results').once('value', (data) => {
			dispatch({
				type: 'GET_RECOMMEND',
				payload: []
			})
		} )
	}
}
