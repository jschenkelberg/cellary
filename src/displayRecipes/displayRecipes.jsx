import React from 'react';

function DisplayRecipes({recipes, getRecipesbyFoodName}) { 

 
  

    return (
      <div>
      <h6>recipes</h6>   
      {recipes.map(({id,title}) => (
              <tr key={id}>
                <td>{title}</td>
                </tr>
                
                
                )
                )}
      </div>     
    )
      }
export default DisplayRecipes;