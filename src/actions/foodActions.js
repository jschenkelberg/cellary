import { FETCH_FOODS, NEW_FOOD} from './types';
import axios from "axios";

//each action creator is a function
//thunk middleware allows us to call dispatch function directly so we can make asynchonous requests
//dispatch is like resolving a promise; dispatch allows for sending of data

export const fetchFoods = () => dispatch =>{
    axios.get(`http://127.0.0.1:8000/pantry/`)
    .then(foods => dispatch({
        type: FETCH_FOODS,
        payload: foods.data
    }));
}

export const createFood = (postFood) => dispatch => {
    axios.post ('http://127.0.0.1:8000/pantry/',{
        name: postFood.name,
            type: postFood.type,
            quantity: postFood.quantity,
            unit: postFood.unit,
            expiration: postFood.expiration,
            alert: postFood.alert
    })
    .then(food => dispatch({
        type: NEW_FOOD,
        payload: food.data
    }));
}