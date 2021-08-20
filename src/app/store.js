import { configureStore } from "@reduxjs/toolkit";
import {apiPantrySlice} from '../features/pantryApiSlice';


//Create/configure the store
export const store = configureStore({
    // reducers and slices
    reducer: {
        [apiPantrySlice.reducerPath]: apiPantrySlice.reducer,
    },
    //middleware
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiPantrySlice.middleware)
    },
});
