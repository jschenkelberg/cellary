import React from "react";
import "./pantryTable.css";
import "bootstrap/dist/css/bootstrap.css";
import AddFood from "../addFood/addFood";
import { useState } from "react";
import { ToggleButton, Button, Modal } from "react-bootstrap";
import useForm from "../useForm/useForm";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { FormControlLabel,Switch } from "@material-ui/core";
import { useHistory } from 'react-router-dom';


export function PantryTable({
  pantry,
  recipes,
  getFoods,
  alertFoodOn,
  alertFoodOff,
  deleteFood,
  getRecipesbyFoodName,
  getRecipesbyAllFood  
}) 
{
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { values, handleChange, handleSubmit } = useForm(editFood);
  const [checked, setChecked] = useState(false);
  
  let history = useHistory();

  const redirect = () => {
    history.push('/DisplayRecipes')
  }

  function editFood() {
    updateFood(values, pantry.id);
    console.log(values);
  }

  const updateFood = async (values) => {
    await axios
      .put(`http://127.0.0.1:8000/pantry/${values.id}/`, values)
      .then((res) => {
        console.log(res);
        getFoods();
      })
      .catch((err) => console.log(err));
  };

  const [search, setSearch] = useState("");
  const filterItems = pantry.filter(
    (items) =>
      items.name.toLowerCase().includes(search.toLowerCase()) ||
      items.type.toLowerCase().includes(search.toLowerCase()) ||
      //items.quantity.toLowerCase().includes(search.toLowerCase()) ||
      items.expiration.toLowerCase().includes(search.toLowerCase())
  );

  const [filter,setFilter] = useState("");
  const alertFilter = pantry.filter(
    (items) => items.alert == 1
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
       <Button variant="warning"onClick={() => {getRecipesbyAllFood();redirect()}}>search all food</Button>
      <div className="col-md-2" />
      <div className="col-md-8">
        <div className="row">
          <h3>my pantry</h3>
          <AddFood getFoods={getFoods} pantry={pantry} />
        </div>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => closeTable()}
        >
          view/hide pantry table
        </button>
        <div id="myDIV">
          <input
            placeholder="filter by "
            onChange={(event) => setSearch(event.target.value)}
          ></input>     
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">type</th>
                <th scope="col">quantity</th>
                <th scope="col">uom</th>
                <th scope="col">best by</th>           

                <th colspan="5n">actions</th>
                {/* <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th> */}
              </tr>
            </thead>

            <tbody>
              {filterItems.map(
                ({ id, name, type, quantity, unit, expiration,alert }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{type}</td>
                    <td>{quantity}</td>
                    <td>{unit}</td>
                    <td>{expiration}</td>
                    
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => {getRecipesbyFoodName(name);redirect()}}>                        
                      
                        search
                      </button>
                    </td>
                    <td>
                      <Button
                        variant="btn btn-warning"
                        onClick={handleShow}
                      >
                        edit
                      </Button>

                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                          <Modal.Title>edit food</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <form onSubmit={handleSubmit}>
                            <div className="form-group">
            
                              <input
                              type="number"
                              name="id"
                              placeholder="id"
                              onChange={handleChange}                   
                              value={values.id}
                              />  

                              <input
                                type="text"
                                name="name"
                                id={name}
                                placeholder="name"
                                onChange={handleChange}
                                value={values.name}
                              />

                              <input
                                type="text"
                                name="type"
                                placeholder="type"
                                onChange={handleChange}
                                value={values.type}
                              />

                              <input
                                type="text"
                                name="quantity"
                                placeholder="quantity"
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
                        className="btn btn-warning"
                        onClick={() => deleteFood(id)}
                      >
                        remove
                      </button>
                    </td>
                    <td>
                    {/* <FormControlLabel
    control={<Switch checked={alertFoodOn(id)} onChange={alertFoodOff(id)} />}
    label="Alert"
  /> */}
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => alertFoodOn(id)}
                      >
                        alert on
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => alertFoodOff(id)}
                      >
                        alert off
                      </button>
                      
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>     
        </div>
        <div className="col-md-2" />
      </div>
    </div>
  );
}
