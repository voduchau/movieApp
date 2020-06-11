import initialStateUser from './initialStateUser';

export default LoadUser = (state=initialStateUser,action) => {
    console.log(action.payload,'this is action payload')
    switch (action.type) {
        case "LOAD_USER":
            return {...state,userID: action.payload.uid, email: action.payload.email};
        default: return state;
    }
}