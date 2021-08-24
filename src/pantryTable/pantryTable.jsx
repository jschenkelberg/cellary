import React from 'react';
import './pantryTable.css'
import 'bootstrap/dist/css/bootstrap.css';
import AddFood from '../addFood/addFood';
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useForm from '../useForm/useForm';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import DisplayRecipes from '../displayRecipes/displayRecipes';





export function PantryTable({pantry, recipes, getFoods, alertFood, deleteFood, getRecipesbyFoodName}) {
    
    
    const [show, setShow] = useState(false);  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const{values, handleChange, handleSubmit} = useForm(editFood);
        
    function editFood() {
        updateFood(values);                        
        console.log(values);
    }

    const updateFood = async (values) => {
      await  axios.put(
         `http://127.0.0.1:8000/pantry/${values.id}/`,
         values
       ).then(res => {
           console.log(res);
           getFoods()
       }).catch(err => console.log(err))       
     };


    const [search, setSearch] = useState("");
    const filterItems = pantry.filter(
      (items) =>
        items.name.toLowerCase().includes(search.toLowerCase()) ||
        items.type.toLowerCase().includes(search.toLowerCase()) ||
        items.quantity.toLowerCase().includes(search.toLowerCase()) ||
        items.expiration.toLowerCase().includes(search.toLowerCase())
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
        <AddFood getFoods={getFoods} pantry={pantry} />   
        </div>
        <button type="button" onClick={() => closeTable()}>
                  view/hide</button>
      <div id="myDIV">
      <input
        placeholder="search..."
        onChange={(event) => setSearch(event.target.value)}      ></input>
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
            {filterItems.map(({id, name,type,quantity,unit,expiration}) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{type}</td>
                <td>{quantity}</td>
                <td>{unit}</td>
                <td>{expiration}</td>                
                <td>
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={() => getRecipesbyFoodName(name)}
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
            placeholder={id}
            onChange={handleChange}                   
            value={values.id}
          />  

          <input
            type="text"
            name="name"
            id={name}
            placeholder={name}
            onChange={handleChange}
            value={values.name}
          />

          <input
            type="text"
            name="type"
            placeholder={type}
            onChange={handleChange}
            value={values.type}
          />

          <input
            type="text"
            name="quantity"
            placeholder={quantity}
            onChange={handleChange}
            value={values.quantity}  
                    />
          <input
            type="text"
            name="unit"
            placeholder={unit}
            onChange={handleChange}
            value={values.unit}  
                    />
          <input
            type="date"
            name="expiration"
            placeholder={expiration}
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
                  onClick={() => deleteFood(id)}
                >
                  remove
                </button>
                </td>
                <td>
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={() => alertFood(id)}               
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
      {/* <DisplayRecipes recipes={recipes} getRecipesbyFoodName={getRecipesbyFoodName} /> */}
    </div>

    );
}


