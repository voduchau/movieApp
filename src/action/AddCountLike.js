import firebase from 'firebase';
import firebaseConfig from '../modules/_global/firebase/firebaseApp';
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
  }

// export const AddCountLike = (movieID,commentID) => async (dispatch) => {
//     const data = await firebase.database().ref('comments/' + movieID).set({

//     });
//     console.log(data.val(),'alo alo')
//     return dispatch({
//         type: 'LOAD_COMMENTS',
//         payload: data.val()
//     })
// }