// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiRecipeSlice = createApi({
//     reducerPath: "recipeApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: `https://api.spoonacular.com`,              
//     }),

//     endpoints (builder) {
//         return {
//             fetchRecipe: builder.query({
//                 query(name) {
//                     return `/recipes/complexSearch?apiKey=72148a7e9aa94d95af9d42c77dd8d82a&query=${name}&includeIngredients=${name}&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&ignorePantry=true`;
//                 },
//             }),
            
       
//         }
//     }
// })

// export const {useFetchRecipeQuery} = apiRecipeSlice;