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
  const {pantry = []} = useFetchFoodQuery();


  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/pantry/')
  //   .then(response => setFoods(response.data)
  //   )}, [])



  // const deleteFood = (id) => {
  //     axios.delete(`http://127.0.0.1:8000/pantry/${id}/`)        
  //     .then(res => {
  //         console.log(res);
  //         console.log(res.data);      
  //       })
  //       console.log(this);
        
  //     }
      

  
  return (
    <div>
    <TitleBar />
    <AddFood />
    <PantryTable />      
    </div>
  );
}

export default App;
