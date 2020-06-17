import axios from 'axios';
import {TMDB_URL, TMDB_API_KEY, TMDB_GUEST} from '../constants/api';

export const AddRating = (movieID) => {
    console.log('vao action add rating')
    return async (dispatch) => {
        await axios.post(`https://api.themoviedb.org/3/movie/419703/rating?api_key=9b2bf2fa888021104c1569802d8e08be&guest_session_id=b022e978b3b822702791a873fc190ef3`, {
                value : 10
            }
        )
        .then(data => {
            console.log(data,' data rating successful')
        }).catch(error =>{
            console.log(error,'error')
        })
    }
}