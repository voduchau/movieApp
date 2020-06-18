import firebase from 'firebase';
import firebaseConfig from '../modules/_global/firebase/firebaseApp';
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
  }

export const GetComments = (id) => async (dispatch) => {
    const data = await firebase.database().ref('comments/' + id).once('value');
    return dispatch({
        type: 'LOAD_COMMENTS',
        payload: data.val()
    })
}