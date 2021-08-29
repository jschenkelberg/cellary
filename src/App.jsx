import React, { useEffect, useState } from "react";
import "./App.css";
import TitleBar from "./titleBar/titleBar";
import { PantryTable } from "./pantryTable/pantryTable";
import {
  Route,
  Switch,
} from "react-router-dom";
import axios from "axios";
import DisplayRecipes from "./displayRecipes/displayRecipes";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import AlertCalendar from "./alertCalendar/alertCalendar";



function App() {
  const [pantry, setPantry] = useState([
    {
      id: "",
      name: "",
      type: "",
      quantity: "",
      unit: "",
      expiration: "",
      alert: "",
    },
  ]);

  const [recipes, setRecipes] = useState([{
    
      "id": 1,
      "title": "loading...",
      "image": "https://media.giphy.com/media/Nlo7V40tWGLYu3uR7x/giphy.gif?cid=790b7611a059a3759eb4e1ebb9ea154989ff65ba2ddbef64&rid=giphy.gif&ct=g",
      "imageType": "gif",
      "usedIngredientCount": 3,
      "missedIngredientCount": 1,
      "missedIngredients": [],
      "usedIngredients": [],    
    }

    ]);

  const getFoods = async () => {
    await axios
      .get(`http://127.0.0.1:8000/pantry/`)
      .then((response) => setPantry(response.data));
  };

  const deleteFood = async (id) => {       
    await axios
      .delete(`http://127.0.0.1:8000/pantry/${id}/`)
      .then((response) => console.log(response));
    getFoods();
  };

  const alertFoodOn = async (id) => {
    await axios
      .patch(`http://127.0.0.1:8000/alert/${id}/`)
      .then((response) => console.log(response));
      getFoods();
  };
  const alertFoodOff = async (id) => {
    await axios
      .put(`http://127.0.0.1:8000/alert/${id}/`)
      .then((response) => console.log(response));
      getFoods();
  };

  const getRecipesbyFoodName = async (name) => {
    await axios
      .get(
        `https://api.spoonacular.com/recipes//findByIngredients?apiKey=72148a7e9aa94d95af9d42c77dd8d82a&ingredients=${name}&number=20&limitLicense=true&ranking=2&ignorePantry=True`
      )
      .then((response) => setRecipes(response.data));
    console.log(setRecipes);
  };    

  const getRecipesbyAllFood = async () => {
    let searchAll = pantry.map((el) => el.name);
    await axios
      .get(
        `https://api.spoonacular.com/recipes//findByIngredients?apiKey=72148a7e9aa94d95af9d42c77dd8d82a&ingredients=${searchAll}&number=20&limitLicense=true&ranking=1&ignorePantry=True`
      )
      .then((response) => setRecipes(response.data));
    console.log(setRecipes);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/pantry/")
      .then((response) => setPantry(response.data));
  }, []);






  return (
    <div className="App">
      <TitleBar />
      <Switch>
        <Route
          path="/DisplayRecipes"
          render={(props) => (
            <DisplayRecipes {...props} pantry={pantry} recipes={recipes} />
          )}
        ></Route>
        <Route exact path="/">
          <PantryTable
            alertFoodOn={alertFoodOn}
            alertFoodOff={alertFoodOff}
            getFoods={getFoods}
            deleteFood={deleteFood}
            pantry={pantry}
            recipes={recipes}
            getRecipesbyFoodName={getRecipesbyFoodName}
            getRecipesbyAllFood={getRecipesbyAllFood}            
        
          />
        </Route>
        <Route
          path="/DisplayRecipes"
          render={(props) => (
            <DisplayRecipes {...props} pantry={pantry} recipes={recipes} />
          )}
        ></Route>
         <Route
          path="/alerts"
          render={(props) => (         
            <AlertCalendar {...props} pantry={pantry} alertFoodOn={alertFoodOn}  getFoods={getFoods}
            alertFoodOff={alertFoodOff} /> )}      
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
