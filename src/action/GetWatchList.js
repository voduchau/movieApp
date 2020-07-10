import firebase from 'firebase';
import firebaseConfig from '../modules/_global/firebase/firebaseApp';
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
  }

export const GetWatchList = (userID) => async (dispatch) => {
    const data = await firebase.database().ref('watchlist/' + userID).once('value');
    console.log(data.val(),'data trả về watch list')
    return dispatch({
        type: 'GET_WATCHLIST',
        payload: data.val()
    })
}
