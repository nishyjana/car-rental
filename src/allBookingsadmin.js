
import React, { Component } from 'react'
import {
    Card,CardLink, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Input,Table,
  } from 'reactstrap';
  import {  FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
  import axios ,{post} from 'axios';
import './allbookingsadmin.css'

class allbookings extends Component {
  state = {
      bookings: []
  }
  componentDidMount() {
    axios.get('http://localhost:8080/book').then((response)=>{
        this.setState({
          bookings: response.data
        })
      })
    }

    render() {
        let bookings = this.state.bookings.map((pbook) => {
            return(
              
              <tr key= {pbook.bookingID}>
                 <td>{pbook.bookingID}</td>
                 <td>{pbook.customer}</td> 
                <td>{pbook.pickup_time}</td>
                
                <td>{pbook.return_time}</td>
                <td>{pbook.booked_car}</td>
                
                <td>{pbook.rates}</td> 
            <td>{pbook.status}</td>
            
   
            
                
              
      
              </tr>
             
            );
      
          })
        return ( 
          <div className="App Container">
                  <Table sresponsive="sm">
            
   
            <thead>
              <tr>
            
              <th> Booking ID</th>
              <th>Customer Name</th>
                <th>Pick up Time</th>
              
                <th>Return Time </th>
                <th>booked Car</th>
               
                <th>Rates </th>
               <th>Status of customer bookings</th>
                
                </tr>
            </thead>
            <tbody>
             {bookings}
            </tbody>
          </Table>
           </div>

         );
    }
}
 
export default allbookings ;