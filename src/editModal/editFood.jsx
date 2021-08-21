import React from 'react';
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from 'axios';
import useForm from '../useForm/useForm';
import 'bootstrap/dist/css/bootstrap.css';
import { useUpdateFoodMutation } from '../features/pantryApiSlice';



const EditFood = (props) => {
 

    const [show, setShow] = useState(false);  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [updateFood, {data}] =useUpdateFoodMutation();    
    const{values, handleChange, handleSubmit} = useForm(editFood);
    function editFood() {
        updateFood(values);
        // props.getAllItems();                
        console.log(values);
    }
    
    
    
    return (
      <>
        <Button variant="warning" onClick={handleShow}>
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
            type="text"
            name="name"
            //placeholder={props.data.name}
            onChange={handleChange}
            value={props.food.id}
          />


          <input
            type="text"
            name="name"
            //placeholder={props.data.name}
            onChange={handleChange}
            value={values.name}
          />

          <input
            type="text"
            name="type"
            // placeholder={data.type}
            onChange={handleChange}
            value={values.type}
          />

          <input
            type="text"
            name="quantity"
            // placeholder={data.quantity}
            onChange={handleChange}
            value={values.quantity}  
                    />
          <input
            type="text"
            name="unit"
            // placeholder={data.unit}
            onChange={handleChange}
            value={values.unit}  
                    />
          <input
            type="date"
            name="expiration"
            // placeholder={data.expiration}
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
      </>
    );
  }


  export default EditFood;