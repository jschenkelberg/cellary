import React from "react";
import "./pantryTable.css";
import "bootstrap/dist/css/bootstrap.css";
import AddFood from "../addFood/addFood";
import { useState } from "react";
import { Button, Modal,Row,Col } from "react-bootstrap";
import useForm from "../useForm/useForm";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

export function PantryTable({
  pantry,
  recipes,
  getFoods,
  alertFoodOn,
  alertFoodOff,
  deleteFood,
  getRecipesbyFoodName,
  getRecipesbyAllFood,
}) {

    //logic for filter bar
    const [search, setSearch] = useState("");
    const filterItems = pantry.filter(
      (items) =>
        items.name.toLowerCase().includes(search.toLowerCase()) ||
        items.type.toLowerCase().includes(search.toLowerCase()) ||
        items.expiration.toLowerCase().includes(search.toLowerCase())
    );

  //hook for open & close modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //hook to useForm hook
  const { values, handleChange, handleSubmit } = useForm(editFood);

  //creates redirect to recipe page after recipe search from pantry
  let history = useHistory();
  const redirect = () => {
    history.push("/DisplayRecipes");
  };

  //sends edit values to useForm hook
  function editFood() {
    updateFood(values, pantry.id);
    console.log(values);
  }

  // put request for editing food entry
  const updateFood = async (values) => {
    await axios
      .put(`http://127.0.0.1:8000/pantry/${values.id}/`, values)
      .then((res) => {
        console.log(res);
        getFoods();
      })
      .catch((err) => console.log(err));
  };

  //open/hide table view
  // const closeTable = () => {
  //   var x = document.getElementById("myDIV");
  //   if (x.style.display === "none") {
  //     x.style.display = "block";
  //   } else {
  //     x.style.display = "none";
  //   }
  // };

  return (
    
    <div className="row">
   
      <div className="col-md-2" />
      <div className="col-md-8">
        <div className="row">

        
        </div>
        {/* <button
          type="button"
          className="btn btn-warning"
          onClick={() => closeTable()}
        >
          view/hide pantry table
        </button> */}
        <div className="d-flex justify-content-between">
       
        <input
        className="col-md-4"
        text-align="center"
            placeholder="filter by food, category, or best by"
            onChange={(event) => setSearch(event.target.value)}
          ></input>
                 <Button
        className="greenbutton"
    
        onClick={() => {
          getRecipesbyAllFood();
          redirect();
        }}
      >
        recipe search(all food)
      </Button>
           <AddFood getFoods={getFoods} pantry={pantry} />
          </div>
          
        <div id="myDIV">
      
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>           
                <th scope="col">id</th>
                <th scope="col">food</th>
                <th scope="col">category</th>
                <th scope="col">quantity</th>
                <th scope="col">unit</th>
                <th scope="col">use by</th>
                <th colSpan="3"></th>  
              </tr>
            </thead>
            <tbody>
           {filterItems.map(
    ({ id, name, type, quantity, unit, expiration, alert }) => {     
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{type}</td>
          <td>{quantity}</td>
          <td>{unit}</td>
          <td>{expiration}</td>
          <td>
            <Button
              type="button"
              className="greenbutton"
              onClick={() => {
                getRecipesbyFoodName(name);
                redirect();
              }}
            >
              get recipes
            </Button>
          </td>
          <td>
            <Button className="greenbutton" variant="btn btn-warning" onClick={handleShow}>
              edit
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>edit food</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div className="container">
              <form className= "form-horizontal">
              <div className="form-horizontal">
              <Row>
              <Col>
              <div className="mb-3">
              <label for="id" className="form-label">food id</label>
              <input
              id="id"
              className="form-contol"
                type="text"
                name="id"
                placeholder="id"
                onChange={handleChange}
                value={values.name}
              />
              </div>
              </Col>
              <Col>
              <label for="category" className="form-label">category</label>
                <select
                id="category"
                  className="form-select form-select-sm"
                  value={values.type}
                  type="text"
                  name= "type"
                  onChange={handleChange}
                >
                
                  <option placeholder>select a category</option>
                  <option value="beverages">beverages</option>
                  <option value="bakery">bakery</option>
                  <option value="canned goods">canned goods</option>
                  <option value="dairy">dairy</option>
                  <option value="dry/baking goods">dry/baking goods</option>
                  <option value="frozen foods">frozen foods</option>
                  <option value="meat">meat</option>
                  <option value="produce">produce</option>
                  <option value="other">other</option>
                </select>
                </Col>
              </Row>
              <Row>
              <Col>
              <div className="mb-3">
              <label for="name" className="form-label">food</label>
              <input
              id="food"
              className="form-contol"
                type="text"
                name="name"
                placeholder="name"
                onChange={handleChange}
                value={values.name}
              />
              </div>
              </Col>
            
    
    <Col>
    <div className="mb-3">
              <label for="quantity" className="form-label">quantity</label>              
              <input
              id="quantity"
              className="form-contol"
                type="number"
                name="quantity"
                placeholder="quantity"
                onChange={handleChange}
                value={values.quantity}
              />
              </div>
              </Col>
    <Col>
    <div className="mb-3">
              <label for="unit" className="form-label">unit</label>
              
              <input
              id="unit"
              className="form-contol"
                type="text"
                name="unit"
                placeholder="unit"
                onChange={handleChange}
                value={values.unit}  
                        />
                   </div>
                        </Col>
                               <Col>
                               <div className="mb-3">
              <label for="expiration" className="form-label">use by</label>
              
              <input
              id="expiration"
              className="form-contol"
                type="date"
                name="expiration"
                placeholder="expiration"
                onChange={handleChange}
                value={values.expiration}  
                        />
                        </div>
                        </Col>
              </Row> 
                
              <Button className="greenbutton" type="submit" onClick={handleSubmit}> Submit </Button>
              </div>
            </form> 
            </div>
              
              </Modal.Body>        
            </Modal>
          </td>
          <td>
            <Button
              type="button"
              className="greenbutton"
              onClick={() => deleteFood(id)}
            >
              remove
            </Button>
          </td>
   
        </tr>
      );
    }
  )}
  </tbody>
          </table>
   
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-2" />
          </div>
          <div className="col-md-2" />
          <div className="col-md-8"></div>
          <div className="col-md-2" />
        </div>
      </div>
    </div>
  );
}
