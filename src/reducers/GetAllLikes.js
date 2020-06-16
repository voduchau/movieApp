const initialState = []
export default GetAllLikes = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_LIKES":
            const temp = [];
            for(const key in action.payload){
                temp.push({
                    likeID: key,
                    commentID: action.payload[key].commentID,
                    userID: action.payload[key].userID,
                })
            }
            return temp;
        default: 
            return state;
    }
}