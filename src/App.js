import React, { Component } from 'react';
import axios from 'axios';
import Login from './login';
import Home from './Home';
import Admin from './admin';
import Footer from './footer';
import Blacklisted from './blacklistedUser';
import {NavLink} from 'react-router-dom'; 
import PastBookings from './pastbookings';
import messages from './message'
import AccepteDBookings from './acceptedBookings';

import AdminUserDetails from './adminUserDetails';
import AdminBookingDetails from './adminBookingDetails';
import Vehicle from './vehicle';
import Allvehicle from './allBookingsadmin';
import Otherrates from './otherRates';
import SideNav, { Toggle,  NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


  import {Navbar, Nav,Form, NavDropdown} from 'react-bootstrap'

import Register from './Register';
import {
    Card,CardLink, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Welcome from './welcome';
import history from './history';
import Unav from './unav';
import Test from './test'
import booking from './booking';
import contact from './contact';
import './App.css'
import admintest from './admintest';
import otherRate from './otherRates';
import acceptedBookings from './acceptedBookings';


class App extends Component {
    state = {
        cars:[],
        newUserData:{
          customer:""
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
            newUserData.customer = payload.sub;
            return { newUserData };
          });
          console.log(this.state.newUserData);
    
          console.log("THE USER", payload, this.state.newUserData);
        } catch (error) {
          alert("user not logged in");
        }
        this._refreshbooks();
      }
      componentDidMount() {
        
        let payload = this.parseJwt(localStorage.getItem("token"));
        
        if(localStorage.length !== 0){
                 
         axios.get('http://localhost:8080/customer/'+ payload.sub,{
        //headers: {'Authorization':  'Bearer ' + localStorage.getItem( "token" )}
            }).then((response) => {
              localStorage.removeItem("info")
              localStorage.setItem("info",response.data.user_status)
              localStorage.setItem("username",response.data.username)
              localStorage.setItem("email",response.data.email)
              localStorage.setItem("age",response.data.age)
             });
     
    } }
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
   
    dologout(){
      localStorage.clear()
       
      window.location='/login'
     
       
     }
   
    _refreshbooks(){
      axios.get('http://localhost:8080/cars',{
        headers: { 'Authorization':'Bearer '+ localStorage.getItem("token") ,
                    'Accept':'application/json',
                      'Content-Type': 'application/json'}
      },).then((response) => {
        this.setState({
          cars: response.data
        })
      });
       }
    render() { 

      const renderNav =()=>{
        let payload = this.parseJwt(localStorage.getItem("token"));

        if(localStorage.length ==0){
          return( <div>
            
            <Navbar style={{'background-color': '	rgb(28, 28, 28)'}}>
            <Navbar.Brand style={{'color': 'white'}} >Banger and Co.</Navbar.Brand> 
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
            <Nav>
                
            <NavLink className="d-inline p-2  text-white
            "
            to="/">HOME</NavLink>

            <NavLink className="d-inline p-2 text-white"
            to="/Register">REGISTER</NavLink>

             

           

            <NavLink className="d-inline p-2 text-white"
            to="/booking">BOOKINGS</NavLink>
                           
            

            <NavLink className="d-inline p-2 text-white"
            to="/contact">CONTACT</NavLink>
            

            <NavLink className="d-inline p-2 text-white"
            to="/login">LOGIN</NavLink>
            
            </Nav>
            
        </Navbar>
            
          </div>
          )
        } else if(localStorage.length !== 0 && payload.sub == "ag"){
          return (
            <div>
              <Navbar style={{'background-color': '	rgb(28, 28, 28)'}}>
            <Navbar.Brand >Banger and Co.</Navbar.Brand> 
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
            <Nav>
                
            <NavLink   className="d-inline p-2 text-white"
            to="/">HOME</NavLink>
            
            
           


            <NavLink style={{'color': 'white'}} className="d-inline p-2 text-white"
            to="/adminProfile">PROFILE</NavLink>

                           
            <NavLink style={{'color': 'white'}} className="d-inline p-2 text-white"
            to="/AcceptedBookings"> BOOKINGS</NavLink>
            


            <a  className="d-inline p-2 text-white" onClick={this.dologout}>LOGOUT</a>
            
            </Nav>
            
        </Navbar>

            </div>
          )
        }
        else if(localStorage.length !== 0 && payload.sub == "admin"){
          return (
            <div>
              <div>  <Navbar style={{'background-color': '	rgb(28, 28, 28)'}}>
            <Navbar.Brand style={{'color': 'white','paddingLeft':'4cm'}} >Banger and Co.</Navbar.Brand> 
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
            <Nav>

            
            </Nav>
            
        </Navbar></div>

               
              <SideNav style={{background:'	rgb(28, 28, 28)',padding: '1 px'}} >
       
            
           <SideNav.Toggle />
           <SideNav.Nav defaultSelected="/AdminUserDetails" style={{  paddingRight:"0 "  }}>
               
               <NavItem eventKey="/AdminUserDetails" style={{  paddingRight:"1.75em"  }}>
                   <NavIcon>
                       <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em','paddingLeft':'4cm' }} />
                   </NavIcon>
                   <NavLink style={{  paddingRight:"1.75cm"  }} className="d-inline p-2  text-white"
            to="/AdminUserDetails">USER </NavLink>
               </NavItem>
               
               <NavItem eventKey="charts">
                   <NavIcon>
                       <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em', paddingRight:"1.75em"  }} />
                   </NavIcon>
                   <NavLink className="d-inline p-2  text-white"
            to="/Vehicle">VEHICLE</NavLink>
                  </NavItem>
                  <NavItem eventKey="charts">
                   <NavIcon>
                       <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em', paddingleft:"1.75em"  }} />
                   </NavIcon>
                   <NavLink className="d-inline p-2  text-white"  style={{ paddingRight:"15.75cm"  }}
            to="/adminBookingDetails">REQUEST</NavLink>
                  </NavItem>
                  <NavItem eventKey="charts">
                   <NavIcon>
                       <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                   </NavIcon>
                   <NavLink className="d-inline p-2  text-white"
            to="/allBookingsadmin"> BOOKINGS</NavLink>
                  </NavItem>
                  <NavItem eventKey="charts">
                   <NavIcon>
                       <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                   </NavIcon>
                   <NavLink className="d-inline p-2  text-white"
            to="/otherRates"> RATES</NavLink>
                  </NavItem>
                  <NavItem eventKey="charts">
                   <NavIcon>
                       <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                   </NavIcon>
                   <NavLink  className="d-inline p-2  text-white"
            to="/AccepteDBookings"> ACCEPTED</NavLink>
                  </NavItem>
                  
                 
                  <a  className="d-inline p-2 text-white" onClick={this.dologout}>LOGOUT</a>
         
           
          
           </SideNav.Nav>
       </SideNav>
       
            </div>
          )
        }




        else{ 
          return(
          <div>
            
            <Navbar style={{'background-color':'	rgb(28, 28, 28)'}}>
            <Navbar.Brand style={{'color': 'white'}}>Banger and Co</Navbar.Brand> 
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
            <Nav>
                
            <NavLink  style={{'color': 'white'}}className="d-inline p-2  text-white"
            to="/">HOME</NavLink>
            
            
           
            <NavLink className="d-inline p-2 text-white"
            to="/PastBookings">BOOKING HISTORY</NavLink>

            <NavLink  className="d-inline p-2 text-white"
            to="/unav">PROFILE</NavLink>

            <NavLink  className="d-inline p-2 text-white"
            to="/booking">BOOKINGS</NavLink>
              <NavLink  className="d-inline p-2 text-white"
            to="/message">MESSAGES</NavLink>
                           
            

            <NavLink   className="d-inline p-2 text-white"
            to="/contact">CONTACT</NavLink>
            

            <a  className="d-inline p-2 text-white" onClick={this.dologout}>LOGOUT</a>
            
            </Nav>
           
        </Navbar>
          </div>
          )
        }
      }
       

            
           
        return(
            <div className="App">
              
              <Router history={history}>
              <div>
                {renderNav()}
                
        <Switch>
          <Route exact path={"/Login"} component={Login}>
            <Login />
            
            
          </Route>
          <Route exact path={"/Admin"} component={Admin}>
            <Admin />
            </Route>
          <Route exact path={"/Welcome"} component={Welcome}>
            <Welcome />
          </Route>
          <Route  path={"/Unav"} component={Unav}>
            <Unav />
          </Route>
          
          <Route   path={"/Register"} component={Register}>
        
          </Route>
          <Route   path={"/blacklisted"} component={Blacklisted}>
        
          </Route>
          <Route exact path={"/"} component={Home}>
            <Home />
          </Route>
          <Route exact path={"/message"} component={messages}>
            
          </Route>
          <Route exact path={"/booking"} component={booking}>
          </Route>

          <Route exact path={"/contact"} component={contact}>
          </Route>
          <Route exact path={"/adminProfile"} component={admintest}>
          </Route>
          <Route exact path={"/PastBookings"} component={PastBookings}>
          </Route>
          <Route exact path={"/AcceptedBookings"} component={acceptedBookings}>
          </Route>
          <Route exact path={"/AdminUserDetails"} component={AdminUserDetails}>
          </Route>
          <Route exact path={"/Vehicle"} component={Vehicle}>
          </Route>
          <Route exact path={"/adminBookingDetails"} component={AdminBookingDetails}>
          </Route>
          <Route exact path={"/allBookingsadmin"} component={Allvehicle}>
          </Route>
          <Route exact path={"/otherRates"} component={Otherrates}>
          </Route>
          
          
         
        </Switch>
        <Footer/>
        </div>
              </Router>
             </div>
        );
            
         
    
            return(
            <div className="App">
                  
           
              
            </div>);
    }
}
 
export default App;

 
  