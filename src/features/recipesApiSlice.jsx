// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiRecipeSlice = createApi({
//     reducerPath: "recipeApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: `https://api.spoonacular.com`,              
//     }),

//     endpoints (builder) {
//         return {
//             fetchRecipe: builder.query({
//                 query(body) {
//                     return `/recipes/findByIngredients?apiKey=72148a7e9aa94d95af9d42c77dd8d82a&ingredients=${body.name}&number6&limitLicense=true&ranking=1&ignorePantry=Trueantry/`;
//                 },
//             }),
            
       
//         }
//     }
// })

// export const {useFetchRecipeQuery} = apiRecipeSlice;