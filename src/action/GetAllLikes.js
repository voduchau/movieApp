import firebase from 'firebase';
import firebaseConfig from '../modules/_global/firebase/firebaseApp';
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
  }

export const GetAllLikes = (id) => async (dispatch) => {
    const data = await firebase.database().ref('likes').orderByChild('userID').equalTo(id).once('value');
    console.log(data.val(),'load all likes');
    return dispatch({
        type: 'LOAD_LIKES',
        payload: data.val()
    })
}