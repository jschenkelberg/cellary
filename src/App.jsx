import React, { useEffect,useState } from 'react';
import './App.css';
import TitleBar from './titleBar/titleBar';
import { PantryTable } from './pantryTable/pantryTable';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import AddFood from './addFood/addFood';
import DisplayRecipes from './displayRecipes/displayRecipes';
import SendEmail from './sendEmail';


function App() { 
  // const [recipeDetails,setRecipeDetails] = useState ([])
  

  const [pantry, setPantry] = useState([
    {id:'',
    name:'',
    type: '',
    quantity: '',
    unit:'',
    expiration: '',
    alert:''}
  ])
  
  const [recipes,setRecipes] = useState ([
    {id:"",
    title: "",
  }
  ]);  

  const getFoods = async () => {
    await axios.get(`http://127.0.0.1:8000/pantry/`)
    .then(response => setPantry(response.data))    
  } 

  const deleteFood = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/pantry/${id}/`)
    .then (response => console.log(response));
    getFoods();
  }
  
  const alertFood = async (id) => {
    await axios.patch(`http://127.0.0.1:8000/pantry/${id}/`)
    .then (response => console.log(response));
  }

  const getRecipesbyFoodName = async (name) => {
    await axios.get(
      `https://api.spoonacular.com/recipes//findByIngredients?apiKey=72148a7e9aa94d95af9d42c77dd8d82a&ingredients=${name}&number=12&limitLicense=true&ranking=1&ignorePantry=True`)
      .then(response =>setRecipes(response.data));     
      console.log(setRecipes);        
    };

 
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/pantry/')
      .then(response => setPantry(response.data),
      )}, [])
      console.log(pantry);
      
  // useEffect(() => {
  //   getFoods()}, [])

  
  return (
    <div className="App">
     <TitleBar />     
     <Switch>
     <Route path='/DisplayRecipes' render={props=> <DisplayRecipes {...props} pantry={pantry} recipes={recipes}/>}>
       
       </Route>
        <Route exact path='/'>           
        <PantryTable alertFood={alertFood} getFoods={getFoods} deleteFood={deleteFood} pantry={pantry} recipes={recipes} getRecipesbyFoodName={getRecipesbyFoodName} />
        {/* {recipes != null ? <Redirect to="/DisplayRecipes" /> : <PantryTable />} */}
        </Route> 
        <Route path='/DisplayRecipes' render={props=> <DisplayRecipes {...props} pantry={pantry} recipes={recipes}/>}>
       
        </Route>
         
      </Switch>
   
   
  
    </div>
  );
}

export default App;
