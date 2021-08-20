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
                    url: `pantry/${body.id}`,
                    method: "PUT",
                    body,
                })
            })
        }
    }
})

export const {useFetchFoodQuery, useUpdateFoodMutation} = apiPantrySlice;