import React, { useEffect,useState } from 'react';
import './App.css';
import TitleBar from './titleBar/titleBar';
import { PantryTable } from './pantryTable/pantryTable';
import axios from "axios";
import AddFood from './addFood/addFood';
import {store} from './app/store'
import { useSelector} from 'react-redux'
import {useFetchFoodQuery} from './features/pantryApiSlice'



function App() { 

  const dispatch = store.dispatch;
  const {data = []} = useFetchFoodQuery();
  
  const [pantry, setPantry] = useState([])

// useEffect(() => {
//   getFoods();
// })

    const getFoods = async () => {
      await axios.get(`http://127.0.0.1:8000/pantry/`)
      .then(response => setPantry(response.data))    
    }

  
  const deleteFood = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/pantry/${id}/`)
    .then (response => console.log(response));     
  }

  //   const [food, setFood] = useState([
  //     {name: '',
  //     type: '',
  //     quantity: '',
  //     unit: '',
  //     expiration:'',
  //     alert: 0
  //   }
  //   ])    



      

  
  return (
    <div>
    <TitleBar />
    
    <PantryTable  />      
    </div>
  );
}

export default App;
