import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { fetchFoods, createFood } from '../actions/foodActions';
import './pantryTable.css'
import 'bootstrap/dist/css/bootstrap.css';
import EditModal from '../editModal/editModal';
import { ReactReduxContext } from 'react-redux';
import { Component } from 'react';




class PantryTable extends Component {
    
    componentDidMount(){
        this.props.fetchFoods();
    };
    
    
    
    // const [search, setSearch] = useState("");
    // const filterItems = props.foods.filter(
    //   (food) =>
    //     food.name.toLowerCase().includes(search.toLowerCase()) ||
    //     food.type.toLowerCase().includes(search.toLowerCase()) ||
    //     food.expiration.toLowerCase().includes(search.toLowerCase())
    // );

  closeTable = () => {
        var x = document.getElementById("myDIV");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      };
    

render() {
    return (     
      <div className="row">
      <div className="col-md-2" />
      <div className="col-md-8">
  
        <h3>my pantry</h3>
        <button type="button" onClick={() => this.closeTable()}>
                  view/hide</button>
      <div id="myDIV">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">name</th>
              <th scope="col">type</th>
              <th scope="col">quantity</th>
              <th scope="col">uom</th>
              <th scope="col">best by date</th>
      
            </tr>
          </thead>

          <tbody>
            {this.props.foods.map(({id, name, type, quantity, unit, expiration}) => (
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
                //   onClick={() => deleteFlashcard(collection, id)}
                >
                  search
                </button>
                </td>
                <td>
                {/* <EditModal foods={props.foods}/> */}
                </td>
                <td>
                <button
                  type="button"
                  className="btn btn-outline-warning"
                //    onClick={() => props.deleteFood(id)}
                >
                  remove
                </button>
                </td>
                <td>
                <button
                  type="button"
                  className="btn btn-outline-warning"
                //   onClick={() => deleteFlashcard(collection, id)}
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
}
PantryTable.propTypes = {
    fetchFoods: PropTypes.func.isRequired,
    foods:PropTypes.array.isRequired
};

const mapStateToProps = state =>({
    foods: state.foods.pantry
});

export default connect (mapStateToProps, {fetchFoods}) (PantryTable);
  


