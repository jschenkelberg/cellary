import React from 'react';
import './pantryTable.css'
import 'bootstrap/dist/css/bootstrap.css';
import { store } from '../app/store'
import { useFetchFoodQuery, usePatchFoodMutation, useUpdateFoodMutation } from '../features/pantryApiSlice';
import { useFetchRecipeQuery } from '../features/recipesApiSlice';
import { useDeleteFoodMutation } from '../features/pantryApiSlice';
import AddFood from '../addFood/addFood';
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useForm from '../useForm/useForm';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';





export function PantryTable() {
    const dispatch = store.dispatch
    const { data = [] } = useFetchFoodQuery();
    const [ recipes, setRecipes]= useState([]);
    const [deleteFood, {pantry}] = useDeleteFoodMutation(); 
    const [show, setShow] = useState(false);  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //const [getRecipe, {recipeList}] = useFetchRecipeQuery();
    const [updateFood, {updatePantry}] =useUpdateFoodMutation();    
    const{values, handleChange, handleSubmit} = useForm(editFood);
    const [alertFood, {alertPantry}] = usePatchFoodMutation();
    function editFood() {
        updateFood(values);
        // props.getAllItems();                
        console.log(values);
}

const getRecipesByFoodName = async (name) => {
  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=72148a7e9aa94d95af9d42c77dd8d82a&query=${name}&includeIngredients=${name}&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&ignorePantry=true`)
  .then(response => setRecipes(response.data))    
}

  
    const [search, setSearch] = useState("");
    const filterItems = data.filter(
      (food) =>
        food.name.toLowerCase().includes(search.toLowerCase()) ||
        food.type.toLowerCase().includes(search.toLowerCase()) ||
        food.expiration.toLowerCase().includes(search.toLowerCase())
    );

  const closeTable = () => {
        var x = document.getElementById("myDIV");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      };
    


    return (     
      <div className="row">
      <div className="col-md-2" />
      <div className="col-md-8">
      <div className="row">
        <h3>my pantry</h3>
        <AddFood />
        </div>
        <button type="button" onClick={() => closeTable()}>
                  view/hide</button>
      <div id="myDIV">
      <input
        placeholder="search..."
        onChange={(event) => setSearch(event.target.value)}
      ></input>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">name</th>
              <th scope="col">type</th>
              <th scope="col">quantity</th>
              <th scope="col">uom</th>
              <th scope="col">best by date</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
      
            </tr>
          </thead>

          <tbody>
            {data.map((foods) => (
              <tr key={foods.id}>
                <td>{foods.name}</td>
                <td>{foods.type}</td>
                <td>{foods.quantity}</td>
                <td>{foods.unit}</td>
                <td>{foods.expiration}</td>                
                <td>
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={() => getRecipesByFoodName(foods.name)}
                >
                  search
                </button>
                </td>
                <td>
                <Button variant="btn btn-outline-warning" onClick={handleShow}>
         edit
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>edit food</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form className="form-inline" onSubmit={handleSubmit}>
      
          <div className="form-group">     
      
          <input
            type="number"
            name="id"
            placeholder={foods.id}
            onChange={handleChange}                   
            value={values.id}
          />  

          <input
            type="text"
            name="name"
            id={foods.name}
            placeholder={foods.name}
            onChange={handleChange}
            value={values.name}
          />

          <input
            type="text"
            name="type"
            placeholder={foods.type}
            onChange={handleChange}
            value={values.type}
          />

          <input
            type="text"
            name="quantity"
            placeholder={foods.quantity}
            onChange={handleChange}
            value={values.quantity}  
                    />
          <input
            type="text"
            name="unit"
            placeholder={foods.unit}
            onChange={handleChange}
            value={values.unit}  
                    />
          <input
            type="date"
            name="expiration"
            placeholder={foods.expiration}
            onChange={handleChange}
            value={values.expiration}  
                    />


          <button type="submit"> Submit </button>
          </div>
        </form>
          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Close
            </Button>
           
          </Modal.Footer>
        </Modal>
                </td>
                <td>
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={() => deleteFood(foods.id)}
                >
                  remove
                </button>
                </td>
                <td>
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={() => alertFood(foods.id)}

               
                >
                  alert
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
        <div className="col-md-2" />
      </div>
    </div>);
}


