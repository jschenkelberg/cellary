import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiPantrySlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `http://127.0.0.1:8000/`,
    }),
    endpoints (builder) {
        return {
            fetchFood: builder.query({
                query() {
                    return '/pantry/';
                }
            }),
            
            updateFood: builder.mutation({
                query: (body) =>({
                    url: `pantry/${body.id}/`,
                    method: "PUT",
                    body,
                })                           
            }),
            postFood: builder.mutation({
                query: (body) =>({
                    url: `pantry/`,
                    method: "POST",
                    body, 
                })
            }),
            deleteFood: builder.mutation({
                query: (body) =>({
                    url: `pantry/${body.id}/`,
                    method: "DELETE"                    
                })
            }),
            patchFood: builder.mutation({
                query: (body) =>({
                    url: `pantry/${body.id}/`,
                    method: "PATCH"                   
                })
            }),
        }
    }
})

export const {useFetchFoodQuery, useUpdateFoodMutation, useDeleteFoodMutation, usePatchFoodMutation, usePostFoodMutation} = apiPantrySlice;