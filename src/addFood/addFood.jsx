import React, { useState } from 'react';
import { Button, Modal, Row, Col } from "react-bootstrap";
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
             <Fab className="greenbutton" size="small" aria-label="add" onClick={handleShow}>
+            </Fab>
      
            <Modal show={show} onHide={handleClose}>

              <Modal.Header closeButton>
              <h3>add food to pantry</h3>
              </Modal.Header>  
              <Modal.Body> 
              <div className="container">
              <form className= "form-horizontal">
              <div className="form-horizontal">
              <Row>
                <select
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
          </> 
        );
      }  
 
export default AddFood;