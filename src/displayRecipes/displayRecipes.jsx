import {useState} from "react";
import "./displayRecipes.css";
import { Button, Modal } from "react-bootstrap";
import emailjs from 'emailjs-com';
import { ConsoleWriter } from "istanbul-lib-report";


function DisplayRecipes({ recipes, pantry, getRecipesByFoodName, recipeDetails, getRecipeDetails, missedIngredients }) {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_detp45p', 'template_23zv4dw', e.target, 'user_hV8uzE2oGvxy4MCE4JnvA')
      .then((result) => {
          alert("email sent");
      }, (error) => {
          console.log(error.text);
      });
  }
  const handleChange = (e) => {
    recipes(e.target.value); {
      adjustCounter(0)
    }
  };

  let [counter, adjustCounter] = useState(0);

  const goToNextRecipeCard = () => {
    let tempNumber = counter;
    tempNumber++;
    if (tempNumber === recipes.length) {
      tempNumber = 0;
    }
    adjustCounter(tempNumber);
  };

  const goToPreviousRecipeCard = () => {
    let tempNumber = counter;
    tempNumber--;
    if (tempNumber < 0)
    tempNumber = recipes.length -1;
    adjustCounter(tempNumber);
  };

  const [show, setShow] = useState(false);  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
         
// let groceryList = recipes[counter].missedIngredients.map(function(groceryItems){
//   return(
//     <ul>{groceryItems.originalString}</ul>
//   )
// })

// let groceryItems = recipes.missedIngredients

// let groceryList = function extractRecipeNameToString(groceryItems){
//   let textString = ""
//   for(let i=0; i < groceryItems.length - 1; i++){
//       textString += groceryItems.originalString[i] + '/n'
//   }
//   return textString; 
// }
  
  return (
    <div>
    <div className="col=md-4"></div>
    <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="center">
      <div className="card">
          <img src={recipes[counter].image} className="card-img-top" alt="recipe image"></img>
          <div class="card-body">
            <h4 class="card-title">{recipes[counter].title}</h4>
            <p><b>Missing Ingredients</b><br/>{recipes[counter].missedIngredients.map(function(missingIngredient) {
              return (<ul>{missingIngredient.originalString}</ul>);})}</p>       
              <Button variant="btn btn-warning" onClick={handleShow}>
         create grocery list
        </Button>
  
              <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>grocery list for {recipes[counter].title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p><b>Missing Ingredients</b>{recipes[counter].missedIngredients.map(function(missingIngredient) {
              return (<ul>{missingIngredient.originalString}</ul>);})}</p>       
              <form className="form-group" onSubmit={sendEmail}>
        <input type="hidden" name="contact_number" />
        {/* <label>Name</label>
        <input type="text" name="user_name" /> */}
       
        <input type="email" placeholder="type email here" name="user_email" />        
        <textarea type="text" placeholer="copy list here" name="message"/>
        <input className="warning" type="submit" value="Send" />
      </form>            
          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Close
            </Button>
           
          </Modal.Footer>
        </Modal>
          </div>
       
        </div>
        <button className="prev" onClick={() => goToPreviousRecipeCard()}>
              <i class="arrow left"></i>
            </button>
            <button className="next" onClick={() => goToNextRecipeCard()}>
              <i class="arrow right"></i>
            </button>
            <h5>
              Recipe {counter + 1} of {recipes.length}
            </h5>
    </div>
    </div>
    </div>
    </div>
  );
}

export default DisplayRecipes;
