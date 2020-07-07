
export default AddTopRate = (state=0,action) => {
    switch (action.type) {
        case "ADD_TOP_RATING":
            return action.payload;
        default:
            return state;
    }
}