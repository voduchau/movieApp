import firebase from 'firebase';
import firebaseConfig from '../modules/_global/firebase/firebaseApp';
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
  }

export const AddTopRate = (info,rating) => {
    console.log(info,'this is inforrrrrrrrrrrrr top rating')
   
    return async (dispatch) => {
        await firebase.database().ref('movies/top_rated/').set({results:[{
            packdrops_path: info.packdrops_path,
            genres: info.genres,
            title: info.title,
            id:info.id,
        }]})
        dispatch({
            type: "ADD_TOP_RATING",
            payload: rating,
        })
    }
}