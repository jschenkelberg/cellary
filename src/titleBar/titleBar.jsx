import React from 'react';
import './titleBar.css';

function TitleBar(props) {
    return (
        <div className="row row-spacer">
            <div className="col-md-12" style={{padding: 0}}>
                <div className="titlebar-nav col-align">                
                    <h1>cellary</h1>
                </div>
            </div>
        </div>
    );
}

export default TitleBar;