import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'

export class navi extends Component{
    render(){
        return(
            <Navbar bg="light" variant="light">
                <Navbar.Brand >Banger and Co.</Navbar.Brand> 
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
                <Nav>
                    
                <NavLink className="d-inline p-2  text-dark"
                to="/">Home</NavLink>

                <NavLink className="d-inline p-2 text-dark"
                to="/vehicle">Vehicle</NavLink>

                <NavLink className="d-inline p-2 text-dark"
                to="/rates">Rates</NavLink>

                <NavLink className="d-inline p-2 text-dark"
                to="/bookings">Bookings</NavLink>
                               
                <NavLink className="d-inline p-2 text-dark"
                to="/about">About</NavLink>  

                <NavLink className="d-inline p-2 text-dark"
                to="/contact">Contact</NavLink>
                

                <NavLink className="d-inline p-2 text-dark"
                to="/login">Login</NavLink>
                
                </Nav>
            </Navbar>
        )
    }
}

export default navi;