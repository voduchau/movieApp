import firebase from 'firebase';
import firebaseConfig from '../modules/_global/firebase/firebaseApp';
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
  }

export const AddComent = (userID, Email, photoURL, content, filmID) => {
    return (dispatch) => {
        firebase.database().ref('comments/' + filmID).push({
            userID: userID,
            content: content,
            // movieID: filmID,
            likeCount: 0,
            email: Email,
            photoURL: photoURL,
            createdAt: new Date().getTime()
        })
            dispatch({
                type: 'ADD_COMENT',
                payload: 'data'
            })
    }
}