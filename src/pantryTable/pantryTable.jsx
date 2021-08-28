import React from "react";
import "./pantryTable.css";
import "bootstrap/dist/css/bootstrap.css";
import AddFood from "../addFood/addFood";
import { useState, useEffect, useMemo } from "react";
import { Button, Modal } from "react-bootstrap";
import useForm from "../useForm/useForm";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { useTable, useFilters, useGlobalFilter, useSortBy, getSortByToggleProps, useRowSelect } from "react-table";
import { GlobalFilter, DefaultFilterForColumn } from "../Filter/Filter";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";


export function PantryTable({
  column,
  columns,
  data,
  onSelectedRows,
  selectedFlatRows,
  pantry,
  recipes,
  getFoods,
  alertFoodOn,
  alertFoodOff,
  deleteFood,
  getRecipesbyFoodName,
  getRecipesbyAllFood,
}) 

{
  const {
    getTableProps,
    getTableBodyProps,
    getSortByToggleProps,
    headerGroups,
    rows,
    state,
    visibleColumns,    
    prepareRow,
    setGlobalFilter,
    preGlobalFilteredRows,
  } = useTable({
    columns,
    data,
    defaultColumn: {Filter: DefaultFilterForColumn},
  },
  useFilters, 
  useGlobalFilter,
  useSortBy,
  useRowSelect,
  );
  // useEffect(() => {
  //   onSelectedRows(selectedFlatRows);
  // }, [selectedFlatRows]);

  //hook for open & close modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//hook to useForm hook
  const { values, handleChange, handleSubmit } = useForm(editFood);  

  //creates redirect to recipe page after recipe search from pantry
  let history = useHistory();
  const redirect = () => {
    history.push('/DisplayRecipes')
  }

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

  //logic for filter bar
  const [search, setSearch] = useState("");
  const filterItems = data.filter(
    (items) =>
      items.name.toLowerCase().includes(search.toLowerCase()) ||
      items.type.toLowerCase().includes(search.toLowerCase()) ||
      items.expiration.toLowerCase().includes(search.toLowerCase())
  );

//table render with conversion for alert boolean values
let renderedTable = filterItems.map(({id,name, type, quantity, unit, expiration, alert})=>{
  let convertedAlert =String(alert);
  let onOffAlert = convertedAlert === "true"? "on" : "off";
  return (
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
                        onClick={() => {getRecipesbyFoodName(name);redirect()}}>                   
                      
                        get recipes
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
                          <form onSubmit={handleSubmit}>
                            <div className="form-group">
            
                              {/* <input
                              type="number"
                              name="id"
                              placeholder="id"
                              onChange={handleChange}                   
                              value={values.id}
                              />   */}

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
                        onClick={() => alertFoodOn(id)}
                      >
                        on
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => alertFoodOff(id)}
                      >
                        off
                      </button>                      
                    </td>
                    <td>{onOffAlert}</td>
                    </tr>
  );
  });

//open/hide table view
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
       <Button variant="warning"onClick={() => {getRecipesbyAllFood();redirect()}}>recipe search(all food)</Button>
      <div className="col-md-2" />
      <div className="col-md-8">
        <div className="row">
          <h3>my pantry</h3>
          <AddFood getFoods={getFoods} pantry={pantry} />
        </div>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => closeTable()}
        >
          view/hide pantry table
        </button>
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
                <th colSpan="3">actions</th>
                <th colSpan="3">alerts</th>                        
              </tr>
            </thead>
            <tbody>
    {renderedTable}
            </tbody>
          </table>     
        </div>
        <div className="container">
        <div className="row">
        <div className="col-md-2" />
      </div>
      <div className="col-md-2" />
      <div className="col-md-8">
      
      <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getHeaderProps())}>{column.render("Header")}
              <div>{column.canFilter ? column.render("Filter") : null}</div>

              {/* <GlobalFilter
             preGlobalFilteredRows={preGlobalFilteredRows}
             globalFilter={state.globalFilter}
             setGlobalFilter={setGlobalFilter}
           /> */}
             
              </th>
            ))}

          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>;                
              })}
              
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
    </div>
    <div className="col-md-2" />
    </div>
    </div>
    </div>
  );
}
