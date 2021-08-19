import React, { useEffect,useState } from 'react';
import './App.css';
import TitleBar from './titleBar/titleBar';
import PantryTable from './pantryTable/pantryTable';
import axios from "axios";

function App() {
  const [foods, setFoods] = useState([
    {name: '', type: '', quantity: '', unit:'', expiration: '', alert: ''}
  ])    


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/pantry/')
    .then(response => setFoods(response.data)
    )}, [])



  const deleteFood = (id) => {
      axios.delete(`http://127.0.0.1:8000/pantry/${id}/`)        
      .then(res => {
          console.log(res);
          console.log(res.data);      
        })
        console.log(this);
        
      }
      

  
  return (
    <div className="App">
    <TitleBar />
    <PantryTable foods={foods} deleteFood={deleteFood}/>      
    </div>
  );
}

export default App;
