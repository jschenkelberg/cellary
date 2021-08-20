import { FETCH_FOODS, NEW_FOOD } from "../actions/types";

const initialState = {
    pantry: []
}

//...state is the current state with the spread operator
//action.payload is referring to the data being passed from the action to the reducer
export default function(state= initialState, action){
    switch(action.type){
        case FETCH_FOODS:
            return {
                ...state,
                pantry: action.payload
            };
        case NEW_FOOD:
            return{
                ...state,
                pantry: [action.payload, ...state.pantry]
            }
        default:
            return state;            
    }
}