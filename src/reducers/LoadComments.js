const initialState = []
export default LoadComments = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_COMMENTS":
            const temp = [];
            for(const key in action.payload){
                temp.push(action.payload[key])
            }
            return temp;
        default: 
            return state;
    }
}