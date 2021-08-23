import React, { useEffect,useState } from 'react';
import './App.css';
import TitleBar from './titleBar/titleBar';
import { PantryTable } from './pantryTable/pantryTable';
//import {store} from './app/store'
//import {useFetchFoodQuery} from './features/pantryApiSlice';
import axios from 'axios';
import AddFood from './addFood/addFood';
import DisplayRecipes from './displayRecipes/displayRecipes';


function App() { 

  // const dispatch = store.dispatch;
  // const {data = []} = useFetchFoodQuery();  
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
    {results:
    {id:'',
    title:'',
    missedIngredients:''}}
  ]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/pantry/')
    .then(response => setPantry(response.data)
    )}, [])
    console.log(pantry);

  const getFoods = async () => {
    await axios.get(`http://127.0.0.1:8000/pantry/`)
    .then(response => setPantry(response.data))    
  }
  
  const postFood = async (values) => {
    await  axios.post(
       `http://127.0.0.1:8000/pantry/`,
       values
     ).then(res => {
         console.log(res);           
     }).catch(err => console.log(err));
     getFoods();
   };

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
  // useEffect(() => {
  //   getFoods()}, [])

  
  return (
    <div>
    <TitleBar />
    <AddFood getFoods={getFoods} pantry={pantry}/>    
    <PantryTable alertFood={alertFood} getFoods={getFoods} deleteFood={deleteFood} pantry={pantry} recipes={recipes} getRecipesbyFoodName={getRecipesbyFoodName}/>
    {/* <DisplayRecipes recipes={recipes} getRecipesbyFoodName={getRecipesbyFoodName} /> */}
    </div>
  );
}

export default App;
