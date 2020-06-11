import firebase from 'firebase';
import firebaseConfig from '../modules/_global/firebase/firebaseApp';
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
  }

export const AddComent = (userID,content,filmID) => {
    return (dispatch) => {
        firebase.database().ref('comments/').push({
            userID: userID,
            content: content,
            movieID: filmID,
            createdAt: new Date().getTime()
        })
            dispatch({
                type: 'ADD_COMENT',
                payload: 'data'
            })
    }
}