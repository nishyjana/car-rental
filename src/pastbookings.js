import React, { Component } from 'react'
import {
    Card,CardLink, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Input,Table
  } from 'reactstrap';
  import axios ,{post} from 'axios';
import './pastbookings.css';

class pastbookings extends Component {
    state = {
      
        cars:[],
        pastbookings:[], bookings: [], LIST:[],
        acceptedBookings:[],
       
       
        editUserData:{
    
          pickup_time: '',
          return_time: '',
          booked_car: '',
          bookingID: '',
          customer: '',
          status:'',
          lic:''
        
         
    
    
        },
        editBookModal:false
      }
      
  searchQurey(){
    axios.get('http://localhost:8083/bookings').then((response)=>{
      this.setState({
        LIST: response.data
      })
    })
    // console.log("search",this.state.searches,this.state.search)
  }
  AcceptBooking(){
    let listDL = this.state.LIST
    let searchQ = this.state.editUserData.lic
    let {bookingID,customer,pickup_time,return_time,status,booked_car,lic } = this.state.editUserData;
   
      if( listDL.find(function(el){ return el.drivingL === searchQ; })){
        alert(" Customer have to uplaod the bills ")
         
    }
     else{
      axios.put('http://localhost:8080/bookings/' +this.state.editUserData.bookingID,{
        bookingID,customer,pickup_time,return_time,status,booked_car,lic
  
      }).then((response)=>{
        this._refreshbooks();
  
        this.setState({
          editBookModal: false,editUserData: { bookingID:'',customer:'',pickup_time:'',return_time:'',status:'',booked_car:'',lic:''}
        })
       
     
      })
      
     }
  
    
  
  }
  edituser(bookingID,customer,pickup_time,return_time,status,booked_car,lic){
    this.setState({
      editUserData: {bookingID,customer,pickup_time,return_time,status,booked_car,lic},editBookModal: ! this.state.editBookModal
    });
  }
  toggleEditBookModal() {
    this.setState({
      editBookModal: ! this.state.editBookModal
    });
  }
 
    componentWillMount() {
       
        this.bookingsrefresh();
    }
    bookingsrefresh(){
        let username = localStorage.getItem("username");
       axios.get('http://localhost:8080/booking/'+username).then((response) => {
         this.setState({
           pastbookings: response.data
         })
       });
      }
      pastBooking(){
       let pastbookings = this.state.pastbookings.map((pbook) => {
         return(
           <tr key= {pbook.bookingID}>
              <td style={{color:'white'}}>{pbook.bookingID}</td>
             <td style={{color:'white'}}>{pbook.pickup_time}</td>
             
             <td style={{color:'white'}}>{pbook.return_time}</td>
             <td style={{color:'white'}}>{pbook.booked_car}</td>
             <td style={{color:'white'}}>{pbook.customer}</td> 
             <td style={{color:'white'}}>{pbook.rates}</td>
         <td style={{color:'white'}}>{pbook.status}</td>
         
             
           
   
           </tr>
         );
   
       })
       return(
        <div className="pastbooking"> <Table sresponsive="sm">
   
        <thead>
          <tr>
          <th style={{color:'white'}}> Booking ID</th>
            <th style={{color:'white'}}>Pick up Time</th>
          
            <th style={{color:'white'}}>Return Time </th>
            <th style={{color:'white'}}>booked Car</th>
            <th style={{color:'white'}}>Customer Name</th>
            <th style={{color:'white'}}>Rate</th>
           <th style={{color:'white'}}>Status of your booking</th>
            
            </tr>
        </thead>
        <tbody>
         {pastbookings}
        </tbody>
      </Table>
      <br/></div>
       )
   
      }
    render() {
        return (
            
                this.pastBooking()
                
         
        )
    }
}
export default pastbookings;
