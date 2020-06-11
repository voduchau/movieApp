import { combineReducers } from 'redux';
import movies from '../modules/movies/movies.reducer';

const AddComment = (state =[],action) =>{
	switch (action.type){
		case "ADD_COMMENT":
			console.log(action.payload,'aloa aloa alo')
			return state;
		default: return state
	}
}
const LoadUser = (state='',action) => {
	switch (action.type){
		case "LOAD_USER":
			return action.payload;
		default: return state;
	}
}
const rootReducer = combineReducers({
	movies,
	AddComment,
	LoadUser
});

export default rootReducer;
