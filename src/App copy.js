import React , { Component }from 'react';
import axios from "axios";
import {Navbar, Nav, NavDropdown,Form,FormControl,Button} from 'react-bootstrap';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './Components/Home';
import DriverReg from './Components/DriverRegister';
import driverHistory from './accpeteddelivery';
import './App.css';
import requests from './requests'

import about_us from './Components/about_us';
import pickup from './pickup';
import Footer from './Components/footer';
import track from './Components/trackingpage';
import logincustomer from './signincustomerpage';
import signupcustomer from './Components/signupcustomerpage';
import logindriver from './signindriverpage';
import signupdriver from './signindriverpage';
import signincustomer from './signincustomerpage';
import contactus from './Components/contactus';
import custReg from './Components/CustReg';
import signindriver from './signindriverpage';
import propic from '../src/Images/download.png'
class App extends Component {
  state={
    newUserData:{
      sender:""
    }
  }
  parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    // const base64 = base64Url.replace().replace();
    return JSON.parse(window.atob(base64Url));
  }
  componentWillMount() {
    try {
      if (!localStorage.token) {
        return;
      }
      let payload = this.parseJwt(localStorage.getItem("token"));
      this.setState(prevState => {
        let newUserData = { ...prevState.newUserData };
        newUserData.sender = payload.sub;
        return { newUserData };
      });
      console.log(this.state.newUserData);

      console.log("THE USER", payload, this.state.newUserData);
    } catch (error) {
      alert("user not logged in");
    }
  }
  componentDidMount() {

    if(localStorage.length !== 0){
             
     axios.get('http://localhost:8080/customer/'+ this.state.newUserData.sender,{
    //headers: {'Authorization':  'Bearer ' + localStorage.getItem( "token" )}
        }).then((response) => {
          localStorage.removeItem("info")
        
          localStorage.setItem("username",response.data.username)
          localStorage.setItem("email",response.data.email)
          localStorage.setItem("userType",response.data.userType)
          console.log(localStorage.userType,"jiji")
         });
 
} 
  }
  dologout(){
    localStorage.clear()
     
    window.location='/customerLogin'
   
     
   }
   drivernav(){
    return (
      <BrowserRouter>
          <div className="homenav">
           
         <Navbar bg="light" variant="light">
              <Nav className="mr-auto">
                  <Nav.Link href="/">PARCEL.LK</Nav.Link>
                  {/* <Nav.Link href="/about">LOGIN </Nav.Link> */}
                  <Nav.Link href="/contact">CONTACT</Nav.Link>
                  <Nav.Link href="/aa">ABOUT</Nav.Link>
                  <Nav.Link href="/requests">ORDERS</Nav.Link>
                  <Nav.Link href="/driverHistory"> HISTORY </Nav.Link>
                 
                  <a  className="d-inline p-2 text-dark" onClick={this.dologout}>LOGOUT</a>
              </Nav>
              <Form inline>
              <image src={propic}></image>
                   {localStorage.username}
                   </Form>
              </Navbar>
      
              <Switch>
                <Route path='/'         component={Home} exact />
                <Route path='/about'    component={about_us} exact />
                <Route path='/Dlogin'    component={logincustomer} exact />
                <Route path='/abc'    component={contactus} exact />
                <Route path='/customerLogin'    component={signincustomer} exact />
                <Route path='/aa'    component={Home} exact />
                <Route path='/requests'    component={requests} exact />
                <Route path='/track'    component={track} exact />
                <Route path='/driverLogin'    component={signupdriver} exact />
                <Route path='/Register'    component={custReg} exact />
                <Route path='/DriveRegister'    component={DriverReg} exact />
                <Route path='/pickup'    component={pickup} exact />
                <Route path='/driverHistory'    component={driverHistory} exact />
              </Switch>
      <Footer/>
      
       
          </div>
          </BrowserRouter>
      
        );
   }
   customernav(){
    return (
      <BrowserRouter>
          <div className="homenav">
           
         <Navbar bg="light" variant="light">
              <Nav className="mr-auto">
                  <Nav.Link href="/">PARCEL.LK</Nav.Link>
                  {/* <Nav.Link href="/about">LOGIN </Nav.Link> */}
                  <Nav.Link href="/contact">CONTACT</Nav.Link>
                  <Nav.Link href="/aa">ABOUT</Nav.Link>
                  <Nav.Link href="/Book">ORDERS</Nav.Link>
                  <Nav.Link href="/track">HISTORY</Nav.Link>
                 
                  <a  className="d-inline p-2 text-dark" onClick={this.dologout}>LOGOUT</a>
              </Nav>
              <Form inline>
              <image src={propic}></image>
                   {localStorage.username}
                   </Form>
              </Navbar>
      
              <Switch>
                <Route path='/'         component={Home} exact />
                <Route path='/about'    component={about_us} exact />
                <Route path='/Dlogin'    component={logincustomer} exact />
                <Route path='/abc'    component={contactus} exact />
                <Route path='/customerLogin'    component={signincustomer} exact />
                <Route path='/aa'    component={Home} exact />
                <Route path='/Book'    component={pickup} exact />
                <Route path='/track'    component={track} exact />
                <Route path='/driverLogin'    component={signupdriver} exact />
                <Route path='/Register'    component={custReg} exact />
                <Route path='/DriveRegister'    component={DriverReg} exact />
                <Route path='/pickup'    component={pickup} exact />
              </Switch>
      <Footer/>
      
       
          </div>
          </BrowserRouter>
      
        );
   }
   loginnavigation(){
    return (
      <BrowserRouter>
          <div className="homenav">
           
         <Navbar bg="light" variant="light">
              <Nav className="mr-auto">
                  <Nav.Link href="/">PARCEL.LK</Nav.Link>
                  {/* <Nav.Link href="/about">LOGIN </Nav.Link> */}
                  <Nav.Link href="/contact">CONTACT</Nav.Link>
                  <Nav.Link href="/aa">ABOUT</Nav.Link>
                  <Nav.Link href="/test">PICKUP REQ</Nav.Link>
                  <Nav.Link href="/track">TRACK</Nav.Link>
                  
                  <a  className="d-inline p-2 text-dark" onClick={this.dologout}>LOGOUT</a>
              </Nav>
              <Form inline>
              <image src={propic}></image>
                   </Form>
              </Navbar>
      
              <Switch>
                <Route path='/'         component={Home} exact />
                <Route path='/about'    component={about_us} exact />
                <Route path='/Dlogin'    component={logincustomer} exact />
                <Route path='/abc'    component={contactus} exact />
                <Route path='/customerLogin'    component={signincustomer} exact />
                <Route path='/aa'    component={Home} exact />
                <Route path='/test'    component={Home} exact />
                <Route path='/track'    component={track} exact />
                <Route path='/driverLogin'    component={signupdriver} exact />
                <Route path='/Register'    component={custReg} exact />
                <Route path='/DriveRegister'    component={DriverReg} exact />
                <Route path='/pickup'    component={pickup} exact />
              </Switch>
      <Footer/>
      
       
          </div>
          </BrowserRouter>
      
        );

   }
   logoutnavigation(){
    return (
      <BrowserRouter>
          <div className="homenav">
           
         <Navbar bg="light" variant="light">
              <Nav className="mr-auto">
                  <Nav.Link href="/">PARCEL.LK</Nav.Link>
                  {/* <Nav.Link href="/about">LOGIN </Nav.Link> */}
                  <Nav.Link href="/contact">CONTACT</Nav.Link>
                  <Nav.Link href="/aa">ABOUT</Nav.Link>
                  <Nav.Link href="/driverLogin">LOGIN</Nav.Link>
                 
                  <Nav.Link href="/Register">Register</Nav.Link>
                  
              </Nav>
              <Form inline>
              <image src={propic}></image>
                   {localStorage.username}
                   </Form>  
              </Navbar>
      
              <Switch>
                <Route path='/'         component={Home} exact />
                <Route path='/about'    component={about_us} exact />
                <Route path='/Dlogin'    component={logincustomer} exact />
                <Route path='/abc'    component={contactus} exact />
                <Route path='/customerLogin'    component={signindriver} exact />
                <Route path='/aa'    component={Home} exact />
                <Route path='/test'    component={Home} exact />
                <Route path='/track'    component={track} exact />
                <Route path='/driverLogin'    component={signupdriver} exact />
                <Route path='/Register'    component={custReg} exact />
                <Route path='/DriveRegister'    component={DriverReg} exact />
                <Route path='/pickup'    component={pickup} exact />
              </Switch>
      <Footer/>
      
       
          </div>
          </BrowserRouter>
      
        );

   }
 
 render(){
  const renderNav =()=>{
    if(localStorage.length ==0){
      return( <div> {this.logoutnavigation()}</div>);
     
  }
  else{
    if(localStorage.userType==="Customer"){
      
      return( <div>{this.customernav()}</div>);

    }
    else{ 
     
      return( <div> {this.drivernav()}</div>);
    }

  }

  }
  return (
    <div> {renderNav()}</div>
  
  );
 }
}

export default App;
