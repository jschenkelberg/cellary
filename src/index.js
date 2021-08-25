import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router} from 'react-router-dom';


ReactDOM.render(
<Router>
  <React.StrictMode>
    <App />
  </React.StrictMode>,  
</Router>,
  document.getElementById('root')
);

const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on the port ${port}.`);
});

