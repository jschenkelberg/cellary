import React from "react";
import "./pantryTable.css";
import "bootstrap/dist/css/bootstrap.css";
import AddFood from "../addFood/addFood";
import { useState, useMemo } from "react";
import { Button, Modal } from "react-bootstrap";
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
                <th scope="col">best by</th>
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
              className="lightgreenbutton"
              onClick={() => {
                getRecipesbyFoodName(name);
                redirect();
              }}
            >
              get recipes
            </Button>
          </td>
          <td>
            <Button className="lightgreenbutton" variant="btn btn-warning" onClick={handleShow}>
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
                <Button className="lightgreenbutton" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </td>
          <td>
            <Button
              type="button"
              className="lightgreenbutton"
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
          <Button
        className="lightgreenbutton"
    
        onClick={() => {
          getRecipesbyAllFood();
          redirect();
        }}
      >
        recipe search(all food)
      </Button>
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
