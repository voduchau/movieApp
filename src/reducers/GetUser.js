import initialStateUser from './initialStateUser';

export default LoadUser = (state=initialStateUser,action) => {
    switch (action.type) {
        case "LOAD_USER":
            let { email, avatar } = action.payload;
            return {...state,userID: action.userID, email, photoURL: avatar};
        default: return state;
    }
}