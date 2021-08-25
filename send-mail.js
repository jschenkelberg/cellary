const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')
//sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'jmschenkelberg@gmail.com', // Change to your recipient
  from: 'jmschenkelberg@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
    console.log(msg)
  })
  .catch((error) => {
    console.error(error)
  })
  