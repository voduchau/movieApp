import { AddRating } from "../action/AddRating";

export default AddRating = (state='',action) => {
    switch (action.type) {
        case "ADD_RATING":
            return state;
        default: return state;
    }
}