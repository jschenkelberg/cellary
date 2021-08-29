import React from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container } from 'react-bootstrap';
import emailjs from "emailjs-com";
import { Button } from "react-bootstrap";
import "./alertCalendar.css";
import { withWidth } from '@material-ui/core';

const localizer = momentLocalizer(moment);

const AlertCalendar = ({pantry,alertFoodOn, alertFoodOff, getFoods }) => {
  const events= pantry.map((food)=>{
    return {
      title: food.name,
      start: new Date(food.expiration),
      end: new Date(food.expiration),
      allDay: false
    }
  })

  let renderedTable = pantry.map(
    ({ id, name, expiration, alert }) => {
      let convertedAlert = String(alert);
      let onOffAlert = convertedAlert === "true" ? "on" : "off";
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{expiration}</td>

          <td>
            <Button
              type="button"
              className="greenbutton"
              onClick={() => alertFoodOn(id)}
            >
              on
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={() => alertFoodOff(id)}
            >
              off
            </Button>
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

var alertList = pantry.filter(function({alert}){
  return alert;
});

function extractListToString(foodItems) {  
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
        <div>
      
     <Container fluid= "md">
     <div class="d-flex justify-content-center">
     <div class="align-self-center">
<Container fluid="lg">
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
      <form className="form-group" onSubmit={sendEmail}>
        <input type="hidden" name="contact_number" />   

        <input type="email" placeholder="type email here" name="user_email" />
        
        <input
          type="hidden"
          value={getText()}          
          name="message"
        />

        <Button className="lightgreenbutton" type="submit" value="Send">
          Email List
        </Button>  
        
      </form>
      </Container> 
      </div>        
    <Calendar
      views={['month']} defaultView='month'
      localizer={localizer}      
      events={events}
      titleAccessor="title"
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500, width: 600}}
    />
    </div>
    </Container>
  </div>
      );
}
 
export default AlertCalendar;