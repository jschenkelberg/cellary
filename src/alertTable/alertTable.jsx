import React from "react";
import "./pantryTable.css";

export function PantryTable({
    pantry,   
    getFoods,
    alertFood,

  }) {
    const [search, setSearch] = useState("");
    const filterItems = pantry.filter(
      (items) =>
        items.name.toLowerCase().includes(search.toLowerCase()) ||
        items.type.toLowerCase().includes(search.toLowerCase()) ||
        //items.quantity.toLowerCase().includes(search.toLowerCase()) ||
        items.expiration.toLowerCase().includes(search.toLowerCase())
    );
 
  
    return (
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="row">
            <h3>my pantry</h3>
            <AddFood getFoods={getFoods} pantry={pantry} />
          </div>
    
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
  
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
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
                          onClick={() => getRecipesbyFoodName(name)}>                        
                        
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
                            <form className="form-inline" onSubmit={handleSubmit}>
                              <div className="form-group">
              
                                <input
                                type="number"
                                name="id"
                                placeholder={id}
                                onChange={handleChange}                   
                                value={values.id}
                                />  
  
                                <input
                                  type="text"
                                  name="name"
                                  id={name}
                                  placeholder={name}
                                  onChange={handleChange}
                                  value={values.name}
                                />
  
                                <input
                                  type="text"
                                  name="type"
                                  placeholder={type}
                                  onChange={handleChange}
                                  value={values.type}
                                />
  
                                <input
                                  type="text"
                                  name="quantity"
                                  placeholder={quantity}
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
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={() => alertFood(id)}
                        >
                          alert
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          <Button variant="warning">search all food</Button>
          </div>
          <div className="col-md-2" />
        </div>
      </div>
    );
  }