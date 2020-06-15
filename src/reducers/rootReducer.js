import { combineReducers } from 'redux';
import movies from '../modules/movies/movies.reducer';
import LoadUser from './GetUser';
import AddComent from './AddComent';
import LoadComments from './LoadComments';
const rootReducer = combineReducers({
	movies,
	LoadUser,
	AddComent,
	LoadComments
});

export default rootReducer;
