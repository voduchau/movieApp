import initialStateUser from './initialStateUser';

export default LoadUser = (state=initialStateUser,action) => {
    switch (action.type) {
        case "LOAD_USER":
            let { uid, email, photoURL } = action.payload;
            return {...state,userID: uid, email, photoURL};
        default: return state;
    }
}