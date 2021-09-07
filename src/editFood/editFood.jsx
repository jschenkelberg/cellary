// import React from "react";
// import "./editFood.css";
// import "bootstrap/dist/css/bootstrap.css";
// import { useState } from "react";
// import { Button, Modal, Row, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.css";
// import axios from "axios";


// const EditFood = ({pantry, getFoods}) => {
  
//     //hook for open & close modal
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
// const [modal,setModal] = useState(null);

//     const useEditForm = (callback) => {
//         const [values, setValues] = useState({});
//         const handleChange = (event) => {
//           event.persist();
//           setValues({ ...values, [event.target.name]: event.target.value, alert: 0, id:pantry.id});
//         };
//         const handleSubmit = (event) => {
//           event.preventDefault();
//           callback();
//         };
//         return { values, handleChange, handleSubmit };
//       };
      
//         //sends edit values to useEditForm hook
//         function editFood() {
//           updateFood(values);
//           console.log(values);
//         }
      
//         // put request for editing food entry
//         const updateFood = async (values) => {
//           let id = pantry.id
//           await axios
//             .put(`http://127.0.0.1:8000/pantry/${id}/`, values)
//             .then((res) => {
//               console.log(res);
//               getFoods();
//             })
//             .catch((err) => console.log(err));
//         };
      
//         //hook to useEditForm hook
//         const { values, handleChange, handleSubmit } = useEditForm(editFood);

//     return ( 
//         <React.Fragment>
//         <Button
//         className="greenbutton"
//         variant="btn btn-warning"
//         onClick={handleShow}
//       >
//         edit
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>edit food</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="container">
//             <form className="form-horizontal">
//               <div className="form-horizontal">
//                 <Row>
//                   {/* <Col>
//                     <div className="mb-3">
//                       <label for="id" className="form-label">
//                         food id
//                       </label>
//                       <input
//                         id="id"
//                         className="form-contol"
//                         type="text"
//                         name="id"
//                         placeholder="id"
//                         onChange={handleChange}
//                         value={values.name}
//                       />
//                     </div>
//                   </Col> */}
//                   <Col>
//                     <label
//                       for="category"
//                       className="form-label"
//                     >
//                       category
//                     </label>
//                     <select
//                       id="category"
//                       className="form-select form-select-sm"
//                       value={values.type}
//                       type="text"
//                       name="type"
//                       onChange={handleChange}
//                     >
//                       <option placeholder>
//                         select a category
//                       </option>
//                       <option value="beverages">
//                         beverages
//                       </option>
//                       <option value="bakery">bakery</option>
//                       <option value="canned goods">
//                         canned goods
//                       </option>
//                       <option value="dairy">dairy</option>
//                       <option value="dry/baking goods">
//                         dry/baking goods
//                       </option>
//                       <option value="frozen foods">
//                         frozen foods
//                       </option>
//                       <option value="meat">meat</option>
//                       <option value="produce">produce</option>
//                       <option value="other">other</option>
//                     </select>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col>
//                     <div className="mb-3">
//                       <label
//                         for="name"
//                         className="form-label"
//                       >
//                         food
//                       </label>
//                       <input
//                         id="food"
//                         className="form-contol"
//                         type="text"
//                         name="name"
//                         placeholder="name"
//                         onChange={handleChange}
//                         value={values.name}
//                       />
//                     </div>
//                   </Col>

//                   <Col>
//                     <div className="mb-3">
//                       <label
//                         for="quantity"
//                         className="form-label"
//                       >
//                         quantity
//                       </label>
//                       <input
//                         id="quantity"
//                         className="form-contol"
//                         type="number"
//                         name="quantity"
//                         placeholder="quantity"
//                         onChange={handleChange}
//                         value={values.quantity}
//                       />
//                     </div>
//                   </Col>
//                   <Col>
//                     <div className="mb-3">
//                       <label
//                         for="unit"
//                         className="form-label"
//                       >
//                         unit
//                       </label>

//                       <input
//                         id="unit"
//                         className="form-contol"
//                         type="text"
//                         name="unit"
//                         placeholder="unit"
//                         onChange={handleChange}
//                         value={values.unit}
//                       />
//                     </div>
//                   </Col>
//                   <Col>
//                     <div className="mb-3">
//                       <label
//                         for="expiration"
//                         className="form-label"
//                       >
//                         use by
//                       </label>

//                       <input
//                         id="expiration"
//                         className="form-contol"
//                         type="date"
//                         name="expiration"
//                         placeholder="expiration"
//                         onChange={handleChange}
//                         value={values.expiration}
//                       />
//                     </div>
//                   </Col>
//                 </Row>

//                 <Button
//                   className="greenbutton"
//                   type="submit"
//                   onClick={handleSubmit}
//                 >
//                   {" "}
//                   Submit{" "}
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </Modal.Body>
//       </Modal>
// </React.Fragment>
//      );
// }
 
// export default EditFood;