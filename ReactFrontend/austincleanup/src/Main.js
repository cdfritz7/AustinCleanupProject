import React, {Component} from "react";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";

import './css/Main.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import SearchPage from "./SearchPage.js";
import MapPage from "./MapPage.js";
import ProfilePage from "./ProfilePage";

class Main extends Component{
  render(){
    return(
      <BrowserRouter>
        <Navbar bg="light" expand="lg" sticky="top">
          <Navbar.Brand><NavLink className="" exact to="/">Home</NavLink></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link ><NavLink className="" to="/MapPage">Explore</NavLink></Nav.Link>
                <Nav.Link ><NavLink className="" to="/Profile">Profile</NavLink></Nav.Link>
                </Nav>
              </Navbar.Collapse>
        </Navbar>

        <Route exact path="/" component={SearchPage}/>
        <Route path="/MapPage" component={MapPage}/>
        <Route path="/Profile" component={ProfilePage}/>
        <Route path="/MapPage/:qry" component={MapPage}/>

      </BrowserRouter>
    )
  }
};

export default Main;
