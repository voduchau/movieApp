export default GetRating = (state=0,action) => {
    switch (action.type) {
        case "GET_RATING":
            return action.payload;
        default: return state;
    }
}