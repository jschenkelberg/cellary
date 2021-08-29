import { useState } from "react";
import "./displayRecipes.css";
import { Button, Modal } from "react-bootstrap";
import emailjs from "emailjs-com";
import axios from "axios";
import { ArrowForward, ArrowBack } from '@material-ui/icons';


function DisplayRecipes({ recipes, pantry, getRecipesByFoodName }) {
  const [recipeDetails, setRecipeDetails] = useState([]);

  //gets recipe details to display in modal
  const getRecipeDetails = async () => {
    let id = recipes[counter].id;
    await axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=72148a7e9aa94d95af9d42c77dd8d82a&includeNutrition=false`
      )
      .then((response) => setRecipeDetails(response.data));
  };

  //opens modal and gets recipe details
  function openModal() {
    getRecipeDetails();
    handleShow();
  }

  //emailjs send email function
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

  // counter hook to control recipe display
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

  //modal open & close
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //converts object to a string to insert grocery list into email
  function extractRecipeNameToString(groceryItems) {
    //console.log("Grocery Items Param: ",groceryItems)
    let textString = "";
    for (let i = 0; i < groceryItems.length - 1; i++) {
      textString += groceryItems[i].originalString + "\n";
    }
    return textString;
  }

  const getText = () => {
    let textResult = extractRecipeNameToString(
      recipes[counter].missedIngredients
    );
    return textResult;
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
      <div className="align-self-center">
      <ArrowBack style={{ fontSize: 75 }}
          
          onClick={() => goToPreviousRecipeCard()}
        >
          
        </ArrowBack>
        </div>
        <div className="card mb-3">
          <img
            src={recipes[counter].image}
            className="card-img-top"
            alt="depiction of recipe"
          ></img>
          <div className="card-body">
            <h4 className="card-title">{recipes[counter].title}</h4>
            <p>
              <b>Ingredients from your pantry</b>
              {recipes[counter].usedIngredients.map(function (usedIngredients) {
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
            <Button className="greenbutton" onClick={openModal}>
              see details
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{recipes[counter].title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>        
                <p>
      
                  <div
                    dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}
                  />
                </p>
                <Button className="greenbutton" onClick={handleClose}>
                <a className="recipebutton"
                    href={recipeDetails.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    full recipe
                    </a>
                </Button>
              </Modal.Body>
              <Modal.Footer>
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
                  <Button className="greenbutton" type="submit" value="Send">
                    send shopping list
                  </Button>
                </form>
           
              </Modal.Footer>
            </Modal>
          </div>
          </div>
          <div className="align-self-center">
          <ArrowForward style={{ fontSize: 75 }}
          onClick={() => goToNextRecipeCard()}
        >          
        </ArrowForward>        
        </div>
        </div>

          <div className="d-flex justify-content-around">
    
          <h5>
            Recipe {counter + 1} of {recipes.length}
          </h5>
   
        </div>

       
    </div>
  );
}

export default DisplayRecipes;
