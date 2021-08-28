import React, { useEffect, useState, useMemo } from "react";
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
import EmailAlertForm from "./emailAlertForm/emailAlertForm";
import { SelectColumnFilter } from "./Filter/Filter";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";



function App() {
  const [data, setData] = useState([
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
      .then((response) => setData(response.data));
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

  const searchRecipesbyFoodNameButton = (cell) =>{
    return(<button value={cell} onClick={getRecipesbyFoodName()}>
      {cell}
    </button>)
}    

  const getRecipesbyAllFood = async () => {
    let searchAll = data.map((el) => el.name);
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
      .then((response) => setData(response.data));
  }, []);
  console.log(data);

  const [selectedRows, setSelectedData] = useState([]);
  // const onSelectedRows = rows => {
  //   const mappedRows = rows.map(r => r.original);
  //   setSelectedData([...selectedRows, ...mappedRows]);
  // };

  const onSubmitHandler = e => {
    e.preventDefault();
    console.log("submit: ", selectedRows);
 };

  const columns = useMemo(
    () => [
      {
        Header: "my pantry",
        columns: [
          // {
          //   Header: "if",
          //   accessor: "id",         
          // },
          {
            Header: "Name",
            accessor: "name",         
          },
          {
            Header: "Type",
            accessor: "type",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "quantity",
            accessor: "quantity"
          },
          {
            Header: "units",
            accessor: "unit",
          },
          {
            Header: "best by",
            accessor: "expiration",
            Cell: ({ cell: { value } }) => value || "-"
          },   
          {
            Header: "Actions",
            accessor: "actions",
            Cell: (props) => {
              // const rowIdx = props.values.id;
              // const rowName = props.values.name;
              return (
                <div>
                  {/* <span onClick={() => getRecipesbyFoodName(rowName)}>
                    <i className="far fa-edit action mr-2"></i>
                  </span> */}
        
                  <span onClick={() => deleteFood(data.id)}>
                    <i className="fas fa-trash action"></i>
                  </span>
                </div>
              );
            },
          }
        ]
      }
    ]
  )


  return (
    <div className="App">
      <TitleBar />
      <Switch>
        <Route
          path="/DisplayRecipes"
          render={(props) => (
            <DisplayRecipes {...props} data={data} recipes={recipes} />
          )}
        ></Route>
        <Route exact path="/">
          <PantryTable
            alertFoodOn={alertFoodOn}
            alertFoodOff={alertFoodOff}
            getFoods={getFoods}
            deleteFood={deleteFood}
            data={data}
            recipes={recipes}
            getRecipesbyFoodName={getRecipesbyFoodName}
            getRecipesbyAllFood={getRecipesbyAllFood}
            columns={columns} data={data}
        
          />
        </Route>
        <Route
          path="/DisplayRecipes"
          render={(props) => (
            <DisplayRecipes {...props} data={data} recipes={recipes} />
          )}
        ></Route>
         <Route
          path="/alerts"
          render={(props) => (
            <EmailAlertForm {...props} data={data} alertFoodOn={alertFoodOn}  getFoods={getFoods}
            alertFoodOff={alertFoodOff} />
          )}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
