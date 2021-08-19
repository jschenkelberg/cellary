import React, { useState } from 'react';
import './pantryTable.css'
import 'bootstrap/dist/css/bootstrap.css';




const PantryTable = (props) => {
    const [search, setSearch] = useState("");
    const filterItems = props.foods.filter(
      (food) =>
        food.name.toLowerCase().includes(search.toLowerCase()) ||
        food.type.toLowerCase().includes(search.toLowerCase()) ||
        food.expiration.toLowerCase().includes(search.toLowerCase())
    );

  const closeTable = () => {
        var x = document.getElementById("myDIV");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      }

    return (     
      <div className="row">
      <div className="col-md-2" />
      <div className="col-md-8">
  
        <h3>my pantry</h3>
        <button type="button" onClick={() => closeTable()}>
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
            {props.foods.map(({id, name, type, quantity, unit, expiration}) => (
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
                <button
                  type="button"
                  className="btn btn-outline-warning"
                //   onClick={() => deleteFlashcard(collection, id)}
                >
                  edit
                </button>
                </td>
                <td>
                <button
                  type="button"
                  className="btn btn-outline-warning"
                   onClick={() => props.deleteFood(id)}
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
export default PantryTable;
  


