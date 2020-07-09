import { combineReducers } from 'redux';
import movies from '../modules/movies/movies.reducer';
import LoadUser from './GetUser';
import AddComent from './AddComent';
import LoadComments from './LoadComments';
import GetAllLikes from './GetAllLikes';
import GetRating from './GetRating';
import AddTopRate from './AddTopRate';
import GetWatchList from './GetWatchList';
const rootReducer = combineReducers({
	movies,
	LoadUser,
	AddComent,
	LoadComments,
	GetAllLikes,
	GetRating,
	AddTopRate,
	GetWatchList
});

export default rootReducer;
