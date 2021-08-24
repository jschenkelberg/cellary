import React from 'react';
import { Link } from 'react-router-dom';
import './titleBar.css';

function TitleBar(_props) {
    return (
        <div className="row row-spacer">
            <div className="col-md-12" style={{padding: 0}}>
                <nav className="titlebar-nav col-align">                
                    <h1>cellary</h1>
                    
          <div className="container-fluid">
            <ul className="navbar-nav  ">
              <li className="nav-item">
                        <Link to='/'>
                            my pantry
                        </Link>
                        </li>
            </ul>
          </div>
                        <Link to='/DisplayRecipes'>
                        <h2>recipes</h2>
                        </Link>
                        <Link to='/grocery'>
                            <h2>grocery list</h2>
                        </Link>
                    </nav>
                
            </div>
        </div>
    );
}

export default TitleBar;