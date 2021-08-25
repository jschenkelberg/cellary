import {Component} from 'react';
import emailjs from 'emailjs-com';

export default function SendEmail() {

    function sendEmail(e) {
      e.preventDefault();
  
      emailjs.sendForm('service_detp45p', 'template_gqaq8td', e.target, 'user_hV8uzE2oGvxy4MCE4JnvA')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }
  
    return (
      <form className="contact-form" onSubmit={sendEmail}>
        <input type="hidden" name="contact_number" />
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    );
  }

