import React, { useState } from 'react';
import { Button, Modal, Form, FormGroup, FormControl } from "react-bootstrap";
import useForm from '../useForm/useForm';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';




const AddFood = ({getFoods}) => {   
    
    const [show, setShow] = useState(false);      
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //const [postFood, {data}] =usePostFoodMutation();
    const{values, handleChange, handleSubmit} = useForm(foodForm);
    function foodForm() {
        postFood(values);
        console.log(values);
    }
    
    const postFood = async (values) => {
      await  axios.post(
         `http://127.0.0.1:8000/pantry/`,
         values
       ).then(res => {
           console.log(res);           
       }).catch(err => console.log(err));
       getFoods();
     };
   

             return (       
         <>
             <Fab size="small" color="primary" aria-label="add" onClick={handleShow}>
+            </Fab>
      
            <Modal show={show} onHide={handleClose}>

              <Modal.Body>
              <div>
              <Form onSubmit={handleSubmit}>
              <h2>add food to pantry</h2>
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
             </div>

    
              <Button variant="warning" type="submit"> Submit </Button>
            </Form>
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