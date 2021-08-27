import { useState } from "react";
import "./displayRecipes.css";
import { Button, Modal } from "react-bootstrap";
import emailjs from "emailjs-com";
import axios from 'axios';

function DisplayRecipes({
  recipes,
  pantry,
  getRecipesByFoodName,
  }) 
  
  {

const [recipeDetails,setRecipeDetails] = useState([]);


  const getRecipeDetails = async () => {
    let id = recipes[counter].id
    await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=72148a7e9aa94d95af9d42c77dd8d82a&includeNutrition=false`)
      .then(response =>setRecipeDetails(response.data));              
    };

function openModal(){
  getRecipeDetails();
  handleShow();
} 

  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_detp45p",
        "template_23zv4dw",
        e.target,
        "user_hV8uzE2oGvxy4MCE4JnvA"
      )
      .then(
        (result) => {
          alert("email sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
  const handleChange = (e) => {
    recipes(e.target.value);
    {
      adjustCounter(0);
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
    if (tempNumber < 0) tempNumber = recipes.length - 1;
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

  // let groceryList = 

  function extractRecipeNameToString(groceryItems){
    //console.log("Grocery Items Param: ",groceryItems)
    let textString = ""
    for(let i=0; i < groceryItems.length - 1; i++){
        textString += groceryItems[i].originalString + '\n'
    }
    return textString;
  }

  // const handleClick2= ()=> {
  //   console.log("**",recipes[counter].missedIngredients)
  //   let textResult = extractRecipeNameToString(recipes[counter].missedIngredients)
  //   console.log("TextResults: ", textResult)
  //}

  const getText = () => {
    let textResult = extractRecipeNameToString(recipes[counter].missedIngredients)
    return textResult
  }

  return (
    <div>
      <div className="col=md-4"></div>
      <div className="row">
        <div className="col-md-4">
          <div className="d-flex justify-content-center">
            <Button
              variant="warning"
              className="prev"
              onClick={() => goToPreviousRecipeCard()}
            >
              <i class="arrow left"></i>
            </Button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="center">
            <div className="card">
              <img
                src={recipes[counter].image}
                className="card-img-top"
                alt="depiction of recipe"
              ></img>
              <div class="card-body">
                <h4 class="card-title">{recipes[counter].title}</h4>
                <p>
                <b>Ingredients from your pantry</b>
                {recipes[counter].usedIngredients.map(function (
                    usedIngredients
                  ) {
                    return <ul>{usedIngredients.originalString}</ul>;
                  })}
</p>
                <p>
                  <b>Missing Ingredients</b>
                  <br />
                  {recipes[counter].missedIngredients.map(function (
                    missingIngredient
                  ) {
                    return <ul>{missingIngredient.originalString}</ul>;
                  })}
                </p>
             

                {/* create grocery list modal */}
                <Button variant="btn btn-warning" onClick={openModal}>
                  see details
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title>
                      {recipes[counter].title}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <p>
                    <b>Recipe Instructions</b><br/>
                    {recipeDetails.summary}
                    </p>
                    <p>                      
                      <a href={recipeDetails.sourceUrl} target="_blank" rel="noopener noreferrer">Click Here for Full Details</a>
                    </p>
                   
                    <p>
                    
                      <b>Missing Ingredients</b>
                      {recipes[counter].missedIngredients.map(function (
                        missingIngredient
                      ) {
                        return <ul>{missingIngredient.originalString}</ul>;
                      })}
                    </p>
                    <form className="form-group" onSubmit={sendEmail}>
                      <input type="hidden" name="contact_number" />
                      <input
                        type="hidden"
                        name="recipe"
                        value={recipes[counter].title}
                      />
                      <input
                        type="hidden"
                        name="link"
                        value={recipeDetails.sourceUrl}
                      />

                      <input
                        type="email"
                        placeholder="type email here"
                        name="user_email"
                      />
                      <input
                        type="hidden"
                        value={getText()}
                        placeholer="copy list here"
                        name="message"
                      />
                      <Button variant="warning" type="submit" value="Send">
                        Email List
                      </Button>
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
            <button className="next" onClick={() => goToNextRecipeCard()}>
              <i class="arrow right"></i>
            </button>
            <h5>
              Recipe {counter + 1} of {recipes.length}
            </h5>
          </div>
        </div>
      </div>
      <div className="col=md-4">  
      </div>
    </div>
  );
}

export default DisplayRecipes;
