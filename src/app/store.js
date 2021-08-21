import { configureStore } from "@reduxjs/toolkit";
import {apiPantrySlice} from '../features/pantryApiSlice';
import { apiRecipeSlice } from "../features/recipesApiSlice";


//Create/configure the store
export const store = configureStore({
    // reducers and slices
    reducer: {
        [apiPantrySlice.reducerPath]: apiPantrySlice.reducer,
       // [apiRecipeSlice.reducerPath]: apiRecipeSlice.reducer
    },
    //middleware
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiPantrySlice.middleware)
    },
});
