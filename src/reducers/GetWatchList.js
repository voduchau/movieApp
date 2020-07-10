const initialState = []
export default GetWatchList = (state = initialState, action) => {
    switch (action.type) {
        case "GET_WATCHLIST":
            const temp = [];
            console.log(action.payload,'action payload watch list')
            for(const key in action.payload){
                // temp.push(action.payload[key])
                temp.push(
                    action.payload[key]
                )
            }
            return temp;
        default: 
            return state;
    }
}
