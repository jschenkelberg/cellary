import {useState} from "react";
import "./displayRecipes.css";
import axios from 'axios';



function DisplayRecipes({ recipes, recipeDetails, getRecipeDetails, missedIngredients }) {
  let recipeResults = recipes.map(function (el) {
   return (
      <ul>
        <div className="card">
          <img src={el.image} className="card-img-top" alt="recipe image"></img>
          <div class="card-body">
            <h5 class="card-title">{el.title}</h5>
            <p><b>Missing Ingredients</b>{el.missedIngredients.map(function(missingIngredient) {
              return (<ul>{missingIngredient.name}</ul>);})}</p>       
            <button class="btn btn-primary">
              See Details
            </button>
          </div>
        </div>
      </ul>
    );
  });
 
  
  
  return (
    <div>
      <h6>recipes</h6>

      <ul>{recipeResults} </ul>
    </div>
  );
}

export default DisplayRecipes;
