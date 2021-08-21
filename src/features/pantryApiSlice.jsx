import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiPantrySlice = createApi({
    reducerPath: "pantryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `http://127.0.0.1:8000/`,
    }),
    tagTypes: ['data'],
    endpoints (builder) {
        return {
            fetchFood: builder.query({
                query() {
                    return '/pantry/';
                },
                providesTags: (result, error, arg) => ['data'], 
            }),
            
            updateFood: builder.mutation({
                query: (body) =>({
                    url: `pantry/${body.id}/`,
                    method: "PUT",
                    body,                    
                }),
                invalidatesTags: ['data'],                           
            }),
            postFood: builder.mutation({
                query: (body) =>({
                    url: `pantry/`,
                    method: "POST",
                    body, 
                }),
                invalidatesTags: ['data'],
            }),
            deleteFood: builder.mutation({
                query: (id) =>({
                    url: `pantry/${id}/`,
                    method: "DELETE"                    
                }),
                invalidatesTags: ['data'],
            }),
            patchFood: builder.mutation({
                query: (id) =>({
                    url: `pantry/${id}/`,
                    method: "PATCH"                   
                })
            }),
        }
    }
})

export const {useFetchFoodQuery, useUpdateFoodMutation, useDeleteFoodMutation, usePatchFoodMutation, usePostFoodMutation} = apiPantrySlice;