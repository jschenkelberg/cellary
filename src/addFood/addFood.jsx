import React, { Component } from 'react';
import { Button, Modal } from "react-bootstrap";
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import { createFood } from '../actions/foodActions';

class AddFood extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: '',
            quantity: '',
            unit: '',
            expiration: '',
            alert: 0,
            setShow: false
          };
          this.handleShow = this.handleShow.bind(this);
          this.handleClose = this.handleClose.bind(this);
    }    
    
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit (e){
        e.preventDefault();
        const food = {
            name: this.state.name,
            type: this.state.type,
            quantity: this.state.quantity,
            unit: this.state.unit,
            expiration: this.state.expiration,
            alert: 0
        }
        this.props.createFood(food);        
    }
 
    handleClose (e){
        this.setState({
            setShow:false})
            }

        handleShow (e) {
        this.setState({
            setShow:true})
            }

    render() { 
             return (       
         <>
             <Button variant="warning" setShow = {this.setShow} onClick={(e) => this.handleShow(e)}>
              add food to your pantry
            </Button>
      
            <Modal setShow={this.setShow} onClick={(e) => this.handleClose(e)}>
              <Modal.Header>
                <Modal.Title>add food to mypantry</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div>
              <form className="form-inline" onSubmit={(e) => this.onSubmit(e)}>
              <h2>new food</h2>
              <br />
              <div className="form-group">
                <select
                  className="custom-select custom-select-lg"
                  value={this.state.type}
                  type="text"
                  name= "type"
                  onChange={(e) => this.onChange(e)}
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
                onChange={(e) => this.onChange(e)}
                value={this.state.name}
              />
    
              <input
                type="number"
                name="quantity"
                placeholder="quantity"
                onChange={(e) => this.onChange(e)}
                value={this.state.quantity}
              />
    
              <input
                type="text"
                name="unit"
                placeholder="unit"
                onChange={(e) => this.onChange(e)}
                value={this.state.unit}  
                        />
              <input
                type="date"
                name="expiration"
                placeholder="expiration"
                onChange={(e) => this.onChange(e)}
                value={this.state.expiration}  
                        />
    
              <button type="submit"> Submit </button>
            </form>
              </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={(e)=>this.handleClose(e)}>
                  Close
                </Button>
               
              </Modal.Footer>
            </Modal>
          </> 
        );
      }  
        }
AddFood.propTypes = {
    createFood: PropTypes.func.isRequired
};

 
export default connect(null, { createFood })(AddFood);
