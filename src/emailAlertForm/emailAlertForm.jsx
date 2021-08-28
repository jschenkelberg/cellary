import React from "react";
import emailjs from "emailjs-com";
import { Button } from "react-bootstrap";

const EmailAlertForm = ({ pantry, alertFoodOn, alertFoodOff, getFoods }) => {
  


  let renderedTable = pantry.map(
    ({ id, name, expiration, alert }) => {
      let convertedAlert = String(alert);
      let onOffAlert = convertedAlert === "true" ? "on" : "off";
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{expiration}</td>

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
    }
  );

  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_detp45p",
        "template_0mng20d",
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

// var foodWithAlertOn = pantry.filter(function(food){
//   let convertedAlert = String(alert);
//       let onOffAlert = convertedAlert === "true" ? "on" : "off";
//   return food.alert = "on";
//   console.log(foodWithAlertOn);
// });

// function extractAlertNameToString(foodItems) {
//   console.log("Grocery Items Param: ",foodItems)
//   let textString = "";
//   for (let i = 0; i < foodItems.length - 1; i++) {
//     textString += foodItems[i].originalString + "\n";
//   }
//   return textString;
// }

// const getText = () => {
//   let textResult = extractAlertNameToString(
// foodWithAlertOn  
// );
//   return textResult;
// };
var alertList = pantry.filter(function({alert}){
  return alert;
});

function extractListToString(foodItems) {
  //console.log("Grocery Items Param: ",groceryItems)
  let textString = "";
  for (let i = 0; i < foodItems.length - 1; i++) {
    textString += foodItems[i].name+ '- ' + foodItems[i].expiration + ', ' ;
  }
  return textString;
}

const getText = () => {
  let textResult = extractListToString(
    alertList
  );
  return textResult;
};

  return (
    <React.Fragment>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">name</th>
            <th scope="col">best by</th>
            <th colSpan="3">alerts</th>
          </tr>
        </thead>
        <tbody>{renderedTable}</tbody>
      </table>

      <p>alert form</p>

      <form className="form-group" onSubmit={sendEmail}>
        <input type="hidden" name="contact_number" />
        {/* <input type="hidden" name="recipe" value={recipes[counter].title} />
        <input type="hidden" name="link" value={recipeDetails.sourceUrl} /> */}

        <input type="email" placeholder="type email here" name="user_email" />
        
        <textarea
          type="text"
          value={getText()}          
          name="message"
        />

        <Button variant="warning" type="submit" value="Send">
          Email List
        </Button>
      </form>
    </React.Fragment>
  );
};

export default EmailAlertForm;
