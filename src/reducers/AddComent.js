const initialState = {

}
export default AddComent = (state=initialState,action) => {
    switch (action.type) {
        case "ADD_COMENT":
            return action.payload;
        default:
            return state;
    }
}