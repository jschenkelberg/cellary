import React from 'react';
import { Link } from 'react-router-dom';
import './titleBar.css';
import {Navbar, Container, Nav} from 'react-bootstrap';



function TitleBar(_props) {
    return (
<React.Fragment>
<div>

  <Navbar className="titlebar-nav">
    <Container>
    <Navbar.Brand href="#home">cellary</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link to='/'>my pantry</Nav.Link>
      <Link to='/'>my pantry</Link>
      <Nav.Link href='/DisplayRecipes'>recipes</Nav.Link>
      <Link to='/DisplayRecipes'>recipes</Link>               
      <Nav.Link href='/alerts'>alerts</Nav.Link>
      <Link to='/alerts'>alerts</Link>               
    </Nav>
    </Container>
  </Navbar>

  
</div>
        {/* <div className="row row-spacer">
            <div className="col-md-12" style={{padding: 0}}>
                <nav className="titlebar-nav col-align">                
                    <h1>cellary</h1>
                    
     
            <ul className="topnav">
              <li className="nav-item">
                        <Link to='/'>
                            my pantry
                        </Link>
                        </li>
            </ul>
         
                               
                    </nav>
                
            </div>
        </div> */}
        </React.Fragment>
    );
}

export default TitleBar;