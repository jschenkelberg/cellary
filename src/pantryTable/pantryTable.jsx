import React from 'react';
import './pantryTable.css'
import 'bootstrap/dist/css/bootstrap.css';
import EditModal from '../editModal/editModal';
import { store } from '../app/store'
import { useFetchFoodQuery } from '../features/pantryApiSlice';




export function PantryTable() {


    const dispatch = store.dispatch
    const { data = [] } = useFetchFoodQuery();
  
    
    
    
    // const [search, setSearch] = useState("");
    // const filterItems = props.foods.filter(
    //   (food) =>
    //     food.name.toLowerCase().includes(search.toLowerCase()) ||
    //     food.type.toLowerCase().includes(search.toLowerCase()) ||
    //     food.expiration.toLowerCase().includes(search.toLowerCase())
    // );

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
            {data.map((foods) => (
              <tr key={foods.id}>
                <td>{foods.name}</td>
                <td>{foods.type}</td>
                <td>{foods.quantity}</td>
                <td>{foods.unit}</td>
                <td>{foods.expiration}</td>                
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
  


