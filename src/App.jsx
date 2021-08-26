import React, { useEffect, useState } from "react";
import "./App.css";
import TitleBar from "./titleBar/titleBar";
import { PantryTable } from "./pantryTable/pantryTable";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import DisplayRecipes from "./displayRecipes/displayRecipes";

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
      "title": "search from my pantry to start",
      "image": "https://spoonacular.com/recipeImages/991625-312x231.jpg",
      "imageType": "jpg",
      "usedIngredientCount": 3,
      "missedIngredientCount": 1,
      "missedIngredients": [
        "{aisle: \"Baking\", amount: 1, id: 2050, image: \"http…}"
      ],
      "usedIngredients": [
        "{aisle: \"Milk, Eggs, Other Dairy\", amount: 4, id: 1…}",
        "{aisle: \"Milk, Eggs, Other Dairy\", amount: 6, id: 1…}",
        "{aisle: \"Milk, Eggs, Other Dairy\", amount: 1, id: 1…}"
      ],
      "unusedIngredients": [
        "{aisle: \"Cheese\", amount: 1, id: 1009, image: \"http…}",
        "{aisle: \"Produce\", amount: 1, id: 9003, image: \"htt…}",
        "{aisle: \"Meat\", amount: 1, id: 23232, image: \"https…}",
        "{aisle: \"Meat\", amount: 1, id: 10023572, image: \"ht…}",
        "{aisle: \"Produce\", amount: 1, id: 11143, image: \"ht…}",
        "{aisle: \"Seafood\", amount: 1, id: 15270, image: \"ht…}",
        "{aisle: \"Produce\", amount: 1, id: 9200, image: \"htt…}"
      ],
      "likes": 14
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
  };
  const alertFoodOff = async (id) => {
    await axios
      .put(`http://127.0.0.1:8000/alert/${id}/`)
      .then((response) => console.log(response));
  };

  const getRecipesbyFoodName = async (name) => {
    await axios
      .get(
        `https://api.spoonacular.com/recipes//findByIngredients?apiKey=72148a7e9aa94d95af9d42c77dd8d82a&ingredients=${name}&number=20&limitLicense=true&ranking=1&ignorePantry=True`
      )
      .then((response) => setRecipes(response.data));
    console.log(setRecipes);
  };

  const getRecipesbyAllFood = async () => {
    let searchAll = pantry.map((el) => el.name + ",");
    await axios
      .get(
        `https://api.spoonacular.com/recipes//findByIngredients?apiKey=72148a7e9aa94d95af9d42c77dd8d82a&ingredients=${searchAll}&number=20&limitLicense=true&ranking=2&ignorePantry=True`
      )
      .then((response) => setRecipes(response.data));
    console.log(setRecipes);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/pantry/")
      .then((response) => setPantry(response.data));
  }, []);
  console.log(pantry);

  // useEffect(() => {
  //   getFoods()}, [])

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
      </Switch>
    </div>
  );
}

export default App;
