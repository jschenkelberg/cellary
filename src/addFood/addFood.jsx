import { mapValuesSeries } from 'async';
import { mapValues } from 'lodash';
import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { usePostFoodMutation } from '../features/pantryApiSlice';
import useForm from '../useForm/useForm';



const AddFood = (props) => {   
    
    const [show, setShow] = useState(false);      
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [postFood, {data}] =usePostFoodMutation();
    const{values, handleChange, handleSubmit} = useForm(foodForm);
    function foodForm() {
        postFood(values);
        console.log(values);
    }
     
             return (       
         <>
             <Button variant="warning" onClick={handleShow}>
              add food to your pantry
            </Button>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>add food to mypantry</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div>
              <form className="form-inline" onSubmit={handleSubmit}>
              <h2>new food</h2>
              <br />
              <div className="form-group">
                <select
                  className="custom-select custom-select-lg"
                  value={values.type}
                  type="text"
                  name= "type"
                  onChange={handleChange}
                >
                  <option placeholder>Select a Category</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Canned Goods">Canned Goods</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Dry/Baking Goods">Dry/Baking Goods</option>
                  <option value="Frozen Foods">Frozen Foods</option>
                  <option value="Meat">Meat</option>
                  <option value="Produce">Produce</option>
                  <option value="Other">Other</option>
                </select>
              </div>
    
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={values.name}
              />
    
              <input
                type="number"
                name="quantity"
                placeholder="quantity"
                onChange={handleChange}
                value={values.quantity}
              />
    
              <input
                type="text"
                name="unit"
                placeholder="unit"
                onChange={handleChange}
                value={values.unit}  
                        />
              <input
                type="date"
                name="expiration"
                placeholder="expiration"
                onChange={handleChange}
                value={values.expiration}  
                        />
             

    
              <button type="submit"> Submit </button>
            </form>
              </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
               
              </Modal.Footer>
            </Modal>
          </> 
        );
      }  
 
export default AddFood;