import {useState} from "react";
import "./displayRecipes.css";
import { Button, Modal } from "react-bootstrap";


function DisplayRecipes({ recipes, pantry, recipeDetails, getRecipeDetails, missedIngredients }) {



  const [show, setShow] = useState(false);  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let recipeResults = recipes.map(function (el) {
   return (
      <ul>
        <div className="card">
          <img src={el.image} className="card-img-top" alt="recipe image"></img>
          <div class="card-body">
            <h4 class="card-title">{el.title}</h4>
            <p><b>Missing Ingredients</b>{el.missedIngredients.map(function(missingIngredient) {
              return (<ul>{missingIngredient.originalName}</ul>);})}</p>       
              <Button variant="btn btn-warning" onClick={handleShow}>
         create grocery list
        </Button>
  
              <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>grocery list for {el.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>{el.missedIngredients.map(function(missingIngredient) {
              return (<ul>{missingIngredient.originalName}</ul>);})}</p>
              <input
              type="text"
              placeholder="your email address">  
              </input>
              <Button variant="warning" onClick={handleClose}>
              Email List
            </Button>      
          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Close
            </Button>
           
          </Modal.Footer>
        </Modal>
          </div>
        </div>
      </ul>
    );
  });
 
  
  
  return (
    <div>
      <h2>recipes for "{pantry.name}"</h2>
      {recipeResults}
    </div>
  );
}

export default DisplayRecipes;
