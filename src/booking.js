import React, { Component } from "react";
import moment from "moment";

import {
  Card,
  CardColumns,
  Form,
  Button,
  Container,
  Dropdown,
  Row,
  Col,
  Image
} from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import "./booking.css";

import {
  Modal,
  ModalHeader,
  Input,
  Label,
  ModalBody,
  ModalFooter,
  Table,
  CardBody
} from "reactstrap";
import axios from "axios";
// import PickupTime from './pickupdate';
import Pickupdate from "./pickuptime";
import { FormGroup } from "rsuite";

class booking extends Component {
  state = {
    users: [],
    suv:[],
    res:[],
    listNIC:[],
    utilities: [],
    cars: [],
    newUserData: {
      pickup_time: "",
      return_time: "",
      booked_car: "",
      bookingID: "",
      customer: "",
      utilities: "",
      drivingL:"",
      rates:""
    },

    newUserModel: false
  };
  handleOnChange=(e)=>{
    console.log(e.target.value)
   // let val=e.target.value;
   let { newUserData } = this.state;
   newUserData.booked_car = e.target.value
    this.setState({newUserData})
   
  }
  handleOnChangeUtil=(e)=>{
    console.log(e.target.value)
   // let val=e.target.value;
   let { newUserData } = this.state;
   newUserData.utilities = e.target.value
    this.setState({newUserData})
   
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
  }
  componentDidMount() {
    this._refreshbooks();
    this._refreshUtils();
    this._refreshNIC();
    this._refreshSUV();

    
 

  }
  _refreshbooks() {
    
    axios.get("http://localhost:8080/cars").then(response => {
      this.setState({
        cars: response.data
      });
    });
  }
  _refreshSUV(){
    axios.get('http://localhost:8080/suv',
    {
   
    },
    ).then((response) => {
      this.setState({
        suv: response.data
      })
    });
   }
  _refreshUtils() {
    
    axios.get("http://localhost:8080/utilities").then(response => {
      this.setState({
        utilities: response.data
      });
    });
  }
  _refreshNIC() {
    
    axios.get("http://localhost:8081/cars").then(response => {
      this.setState({
        listNIC: response.data
      });
    });
  }
 
  sendmailk(){
    axios.get("http://localhost:8080/sendemail").then(response => {
     
    });
    
  }

  parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    // const base64 = base64Url.replace().replace();
    return JSON.parse(window.atob(base64Url));
  }
  DropdownsUtil(){

  
   
    let utilities = this.state.utilities.map(util => {
      return(
      
      <option   key={util.itemName}  >{util.itemName}</option>
      
      )
  });
  return ( <div>
      <select  onChange={(e)=>{this.handleOnChangeUtil(e)}} >
      {utilities}
      </select>
      
  </div> );
  }

Dropdowns(){

  
  if(localStorage.getItem("age") < 25 ){

    let cars = this.state.cars.map(car => {

      return(
        
      
      <option   key={car.carModel} id="bookedCar" >{car.carModel}</option>
      
      
      
      )
  });
  return ( <div>
      <select defaultValue="Select a car" onChange={(e)=>{this.handleOnChange(e)}} >
      {cars}
    
      </select>
      
  </div> );
   
  }
  else{
    
   let suv = this.state.suv.map(s => {

    return(
      
    
    <option   key={s.carModel} id="bookedCar" >{s.carModel}</option>
    
    
    
    )
});
return ( <div>
    <select defaultValue="Select a car" onChange={(e)=>{this.handleOnChange(e)}} >
    {suv}
  
    </select>
    
</div> );
 
  }
}

  addbooking() {
    
   
    let nic = this.state.listNIC
  
    let nicT = this.state.listNIC
    let lic =this.state.newUserData.drivingL
    console.log("hu",nicT)
    console.log("hhdhdhdhlicense",lic)
    var config = {
      headers: { Authorization: " Bearer " + localStorage.getItem("token") }
    };
    if (localStorage.length !== 0) {
      if (localStorage.info !== "blacklisted") {
        if(this.state.newUserData.pickup_time !== "" || this.state.newUserData.return_time !== "" ||  this.state.newUserData.drivingL !== ""||  this.state.newUserData.booked_car !== ""){
          if(localStorage.getItem("age") > 24   ){
            let userData = this.state.newUserData;
  
          var pickup_date = moment(userData.pickup_time).format(
            "YYYY/MM/DD HH:mm"
          );
          var return_date = moment(userData.return_time).format(
            "YYYY/MM/DD HH:mm"
          );
          let start = moment(pickup_date)
          let end = moment(return_date)
          let duration = start.diff(end)
          let hours  = -(1000* 60*60*24)
          let timeInHOurs = Math.floor(duration/hours)
          let rateperhour = 0
          if(this.state.newUserData.booked_car == "Ford" ){
            rateperhour = 56
          }
          else if(this.state.newUserData.booked_car == "Toyata C-HR" ){
            rateperhour = 49
          }
  
          else{
            rateperhour = 30
          }
          let rates =('$'+ timeInHOurs*rateperhour).toString()
          
          let { newUserData } = this.state;
          newUserData.rates = rates
           this.setState({newUserData})
          
        
            
          let minimum_date = moment(pickup_date)
            .add(5, "hours")
            .format("YYYY/MM/DD HH:mm");
  
          let maximum_date = moment(pickup_date)
            .add(336, "hours")
            .format("YYYY/MM/DD");
  
          if (return_date < minimum_date) {
            alert("Invalid dates.  minimum time range is 5 hours");
          }
          else if (return_date > maximum_date) {
            alert("Invalid dates.  maximum time range is 2 weeks");
          } 
         
          else if( nic.find(function(el){ return el.drivingL === lic; })){
            this.sendmailk()
           
            // if(!_.find(nic, {drivingL: lic})) {
             alert("Ur Driving Licesnse is not valid. Complaint mail have been sent to DOM ")
           }
          
          else{
            alert("Rate for Ur booking is "+ this.state.newUserData.rates)
            console.log(this.state.newUserData,"datanishy")
            axios
              .post(
                "http://localhost:8080/bookings",
                this.state.newUserData,
                config
              )
              .then(response => {
                let { users } = this.state;
                users.push(response.data);
               
  
                this.setState({
                  users,
                  newUserModel: false,
                  newUserData: {
                    pickup_time: "",
                    booked_car: "",
                    return_time: "",
                    bookingID: "",
                    customer_name: "",
                    utilities:"",
                    drivingL:"",
                    rates:""
                  }
                });
               
                
                
                alert("Booking SucessFul")
               
               
              });
           
            
          
          }
    
          }
          else {
            alert("ur under age. Not elgible to book a vehivle for rent from Banger & Co")
          }
         
        }
        else{
          alert("some fields are empty please fill those")
        }
        
      } else {
        window.location = "/blacklisted";
        alert("You are blacklisted by the admin");
      }
    } else {
      alert("please loggin to make a booking");

      window.location = "/login";
    }
  }
  // minTime = new Date(2020, 1, 1, 8, 30);
  //   maxMax = new Date(2020, 1, 1, 17, 30);
  //   defaultValue = new Date(2019, 10, 8, 8, 15);

  render() {
    
   
    return (
      
      
      
      <div className="bookings">
        
        <div className="bForm">
        <h2>
          FAST & EASY WAY TO RENT A CAR
          <centre />
          <strong />
        </h2>
        </div>

<div className="formc">
                <Form>
                  <Form.Group controlId="bLocation">
                    <Form.Label>Pick-up Location :</Form.Label>
                    <Form.Control type="SELECT" placeholder="BANGER AND CO." />
                  </Form.Group>
                  <Form.Group controlId="bLocation">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      customer="customer"
                      value={this.state.newUserData.customer}
                      readOnly
                      
                    />
                  </Form.Group>
                  <Form.Group controlId="bDate">
                    <Form.Label>Pick-up Date :</Form.Label>

                    <Input
                      type="datetime-local"
                      pickup_time="pickup_time"
                      value={this.state.newUserData.pickup_time}
                      onChange={e => {
                        let { newUserData } = this.state;

                        newUserData.pickup_time = e.target.value;

                        this.setState({ newUserData });
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="bDate">
                    <Form.Label>Drop-Off Date :</Form.Label>

                    <Input
                      type="datetime-local"
                      return_time="return_time"
                      value={this.state.newUserData.return_time}
                      onChange={e => {
                        let { newUserData } = this.state;

                        newUserData.return_time = e.target.value;

                        this.setState({ newUserData });
                        
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="car">
                    <Form.Label> Select Car: </Form.Label>
                    
                   

                    {this.Dropdowns()}
                   
                    
                   
                  </Form.Group>
                  <Form.Group controlId="car">
                    <Form.Label> Select Utilities: </Form.Label>
                    {this.DropdownsUtil()}
                   
                    
                   
                  </Form.Group>
                  <Form.Group controlId="bDate">
                    <Form.Label>Driving Licence:</Form.Label>

                    <Input 
                      type="text"
                      drivingL="drivingL"
                      placeholder= "Enter your Driving License Number"
                      value={this.state.newUserData.drivingL}
                      onChange={e => {
                        let { newUserData } = this.state;

                        newUserData.drivingL = e.target.value;

                        this.setState({ newUserData });
                        
                      }}
                    />
                    </Form.Group>
                      <Button
                    color="primary"
                    align="center"
                    onClick={this.addbooking.bind(this)}
                  
                  >
                    Confirm Booking
                  </Button>{" "}
                  <Form.Text className="text-muted">
                    *Credit card is not required for a Reservation.
                  </Form.Text>
                </Form>
          <br />
        </div>
      </div>
    );
    
  }
}

export default booking;
