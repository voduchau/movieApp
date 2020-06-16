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
                firebase.database().ref('users/' + user.uid).once('value',(data)=>{
                    console.log(data.val(),'data user tra ve')
                    dispatch({
                        type: "LOAD_USER",
                        payload: data.val(),
                        userID: user.uid
                    })
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