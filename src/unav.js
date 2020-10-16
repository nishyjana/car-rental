import React, { Component } from 'react';
import axios ,{post} from 'axios';
import Login from './login';
import Home from './Home';


import Register from './Register';
import {
    Card,CardLink, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Input,Table,Container,Row,Col,Im
  } from 'reactstrap';
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Welcome from './welcome';
import history from './history';
import pic from '../src/Image/pp.jpg';
import './unav.css';

class unav extends Component {
  state = {
    newUserData:{
    customer:''
  },
    
    cars:[],
    file:'',
    pastbookings:[]
  }
componentWillMount() {
    this._refreshbooks();
    this.bookingsrefresh();
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
}
_refreshbooks(){
    axios.get('http://localhost:8080/cars').then((response) => {
      this.setState({
        cars: response.data
      })
    });
   }
   bookingsrefresh(){
     let username = localStorage.getItem("username");
    axios.get('http://localhost:8080/booking/'+username,).then((response) => {
      this.setState({
        pastbookings: response.data
      })
    });
   }
   pastBooking(){
    let pastbookings = this.state.pastbookings.map((pbook) => {
      return(
        <tr key= {pbook.bookingID}>
           <td>{pbook.bookingID}</td>
          <td>{pbook.pickup_time}</td>
          
          <td>{pbook.return_time}</td>
          <td>{pbook.booked_car}</td>
          <td>{pbook.customer}</td> 
      <td>{pbook.status}</td>
      
          
        

        </tr>
      );

    })
    return(
      <Table sresponsive="sm">
         

      <thead>
        <tr>
        <th> Booking ID</th>
          <th>Pick up Time</th>
        
          <th>Return Time </th>
          <th>booked Car</th>
          <th>Customer Name</th>
         <th>Status of your booking</th>
          
          </tr>
      </thead>
      <tbody>
       {pastbookings}
      </tbody>
    </Table>
    )

   }
   handleupload(e){

    let customer=localStorage.getItem("username");
    let file = this.state.file
    const url = "http://localhost:8080/uploadFile";  
    let formdata = new FormData( )
    formdata.append('file',file)
    formdata.append('customer',customer)
    console.log(customer,"hihi")
    // file.append('customer_name',customer_name)
    // console.log(file,"jfjfj")

    axios({
          method: 'post',
          url: url,
          //uikjpsdddata:customer, 
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data' }
          })
          .then(function (response) {
              //handle success
              console.log(response);
          })
          .catch(function (response) {
              //handle error
             // console.log(response);
          });
     alert("file uplaoded sucessfully")
   }
   uploadImage(e){

    let file =e.target.files[0]
    this.setState({ file: file})
 }
   carsDetail(){
    let cars = this.state.cars.map(car => {
          

            
           
      return(
        
        
          <div className="App">
         
            
            
            
            <Card style={{direction:'row', display: 'flex',flexDirection: 'row'}}>
                <img top width="30%" height="20%" src={car.imgURl} alt="Card image cap" />
               <CardBody>
                  <CardTitle>Car Model: {car.carModel}</CardTitle>
                <CardSubtitle>Car Rental for One Day: {car.price}</CardSubtitle>
          <CardText>  Car Type : {car.carType}</CardText>
                   
                   <Button onClick={this.booking} >Book</Button>  
                 
                   
           </CardBody>
                   </Card>

                   <div>
             
           </div>
           </div>
           
      );
    });
       
  
          return(
          <div className="userprofile">
            <br/>
            <br/>
            

            <div className="userprofiledetials">
          <div className="userprofiledetials1">
            <h1>Welcome {localStorage.username}</h1>
                <h4><p>Profile Details</p></h4>
                
            <p>Username : {localStorage.username} </p>
             <p>Email: {localStorage.email}</p>
             <p>Upload the pictures  your ID Card ,Driving licesnce and Insurance : <Input type="file" name = "File" onChange={(e)=> this.uploadImage(e)}></Input>
            
            <br/> <Button onClick={(e)=>this.handleupload(e)}>upload</Button></p>
             
             </div>
             </div>
             <br/>
             <br/>
             <nav>
        <ul>
          
         
         
          
         
        </ul>
      </nav>
         
                {cars}
                <br/>
          </div>);
   }
   booking(){
     if(localStorage.info == "blacklisted"){
    window.location='/blacklisted'
    alert('You are blacklisted by the admin')
   }else{
    window.location='/booking'
   }
   }
  
       
    render() {
      return(
        this.carsDetail()
      )
      
      
    }
}
 
export default unav;

 
  