import firebase from 'firebase';
import firebaseConfig from '../modules/_global/firebase/firebaseApp';
import _ from 'lodash';
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
  }
export const GetRating = (movieID) => {
    return async (dispatch) => {
        await firebase.database().ref('rating/' + movieID).once('value', (data)=>{
			const res = _.values(data.val());
			let sum = 0;
			res.forEach(item => {
				sum += item.rating
			})
			const tb = sum/res.length;
			if(tb){
                firebase.database().ref('movies/all/results').orderByChild('id').equalTo(movieID).once('value',(data)=>{
                    for(const key in data.val()){
                        firebase.database().ref('movies/all/results/' + key).update({vote_average: tb})
                    }
                    dispatch({
                        type: "GET_RATING",
                        payload: tb
                    })
                })
                firebase.database().ref('movies/now_playing/results').orderByChild('id').equalTo(movieID).once('value',(data)=>{
                    for(const key in data.val()){
                        firebase.database().ref('movies/now_playing/results/' + key).update({vote_average: tb})
                    }
                })
                firebase.database().ref('movies/popular/results').orderByChild('id').equalTo(movieID).once('value',(data)=>{
                    for(const key in data.val()){
                        firebase.database().ref('movies/popular/results/' + key).update({vote_average: tb})
                    }
                })

                // dispatch({
                //     type: "GET_RATING",
                //     payload: tb
                // })
				// console.log(tb,'rating tra ve');
                // this.setState({rating: tb})
            }
            else {
                dispatch({
                    type: "GET_RATING",
                    payload: 0
                })
            }
        })
    }
}