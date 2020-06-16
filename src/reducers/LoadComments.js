const initialState = []
export default LoadComments = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_COMMENTS":
            const temp = [];
            for(const key in action.payload){
                // temp.push(action.payload[key])
                temp.push({
                    commentID: key,
                    content: action.payload[key].content,
                    email: action.payload[key].email,
                    likeCount: action.payload[key].likeCount,
                    photoURL: action.payload[key].photoURL
                })
            }
            return temp;
        default: 
            return state;
    }
}