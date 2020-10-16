import React,{Component} from 'react';
import {Tab,Tabs,Sonnet} from 'react-bootstrap';
import Home from './Home';
import Vehicle from './vehicle';
import AdminBooking from './adminBookingDetails';
import AdminUserDetails from './adminUserDetails';
import Otherrates from './otherRates';
import './admintest.css'
import vehicle from './vehicle';
import accpted from './acceptedBookings'
import Allvehicle from './allBookingsadmin'


class admintest extends Component{

    render(){
        return(
          
            <div className="admin">
              <div className="adminDetails">
              <h3><p>Acoount Details</p></h3>
              <p>UserName : {localStorage.username} </p>
               <p>Email: {localStorage.email}</p>
             
              
              </div>
            
            
            
            <div className="admintabs">
            <Tabs variant="pills" defaultActiveKey="home" transition={false} id="noanim-tab-example">


  <Tab eventKey="/" title="Users">
   
    <AdminUserDetails/>
   
  </Tab>
  <Tab eventKey="profile" title="Vehicles">
      <Vehicle/>
   </Tab>

  <Tab eventKey="booking" title="New Bookings Requests ">
    
    <AdminBooking/>
  </Tab>
  <Tab eventKey="all bookings" title="All Bookings  ">
    
    <Allvehicle/>
  </Tab>
  <Tab eventKey="Rates " title="Rates Of other companys">
    
    <Otherrates/>
  </Tab>

</Tabs>
</div>
            </div>
        );
    }
}

export default admintest;