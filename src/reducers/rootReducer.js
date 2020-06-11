import { combineReducers } from 'redux';
import movies from '../modules/movies/movies.reducer';
import LoadUser from './GetUser';
import AddComent from './AddComent';
const rootReducer = combineReducers({
	movies,
	LoadUser,
	AddComent
});

export default rootReducer;
