import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './css/header.css';

 class Header extends Component {
     
    render() {
        return (

            <React.Fragment>
            <header className="header" id="masthead">
                <nav className="links">
                    <Link style={linkStyle} className="link" to="/">Home</Link>
                </nav>
            </header>
        </React.Fragment>
        )
    }
}

const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    marginRight: "20px",
    marginLeft: "20px"
  };
  

export default Header;