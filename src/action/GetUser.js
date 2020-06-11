import firebase from 'firebase';
import firebaseConfig from '../modules/_global/firebase/firebaseApp';
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
  }

export const GetCurrentUser = () => {
    console.log('vao action load user')
    return async (dispatch) => {
        await firebase.auth().onAuthStateChanged((user) => {
            if(user){
                console.log('action user da login')
                dispatch({
                    type: "LOAD_USER",
                    payload: user
                })
            }
            else {
                dispatch({
                    type: "LOAD_USER",
                    payload: ''
                })
            }
        })
    }
}