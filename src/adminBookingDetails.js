import React, {Component} from 'react';
import { Button,ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';





class adminBookingDetails extends Component {
  state = {
    bookings: [],
    editUserData:{

      pickup_time: '',
      return_time: '',
      booked_car: '',
      bookingID: '',
      customer: '',
      status:'',
      utilities:'',
      drivingL:''
     


    },
    editBookModal:false

   
      
     
    }
    edituser(bookingID,customer,pickup_time,return_time,status,booked_car,utilities,drivingL){
      this.setState({
        editUserData: {bookingID,customer,pickup_time,return_time,status,booked_car,utilities,drivingL},editBookModal: ! this.state.editBookModal
      });
    }
    toggleEditBookModal() {
      this.setState({
        editBookModal: ! this.state.editBookModal
      });
    }
    refreshVechicle(){
      var config = {
          headers: {'Authorization':  " Bearer " + localStorage.getItem( "token" )}
        
        };
      axios.get('http://localhost:8080/booked/pending').then((response)=>{
        this.setState({
          bookings: response.data
        })
      })
    }

      
      
     
    
      componentWillMount()
      {
        this.refreshVechicle()
        
      }
      AcceptBooking(){
        let {bookingID,customer,pickup_time,return_time,status,booked_car,utilities,drivingL } = this.state.editUserData;
      
      
    
        axios.put('http://localhost:8080/bookings/' +this.state.editUserData.bookingID,{
          bookingID,customer,pickup_time,return_time,status,booked_car,utilities,drivingL
  
        }).then((response)=>{
          this.refreshVechicle();
  
          this.setState({
            editBookModal: false,editUserData: { bookingID:'',customer:'',pickup_time:'',return_time:'',status:'',booked_car:'',utilities:'',drivingL:''}
          })
         
        })

      }
      
      RejectBooking(){

      }
  
    
    
    
     
  
   
    render() {
        let bookings = this.state.bookings.map((book) => {
            return(
              <tr key= {book.bookingID}>
                 <td>{book.bookingID}</td>
                <td>{book.customer}</td>
                <td>{book.booked_car}</td>
                <td> <Button  onClick={this.edituser.bind(this,book.bookingID,book.customer,book.pickup_time,book.return_time,book.status,book.booked_car,book.utilities,book.drivingL)}>View Booking Details</Button>
                </td>
                
                
                
                
                
      
              </tr>
            );
          })
    
  
      return (
        <div className="App Container">
       
          
       <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Validate bookings of our Customers </ModalHeader>
        <ModalBody>
          
            <FormGroup>
            <Label for="customer">customer</Label>
            <Input id="customer"   readOnly value={this.state.editUserData.customer} onChange={(e) => {
              let { editUserData } = this.state;

              editUserData.customer = e.target.value;

              this.setState({ editUserData });
            }} />
            </FormGroup>
           
            <FormGroup>
            <Label for="pickup_time">pickup_time</Label>
            <Input id="pickup_time"  value={this.state.editUserData.pickup_time}  onChange={(e) => {
              let { editUserData } = this.state;

              editUserData.pickup_time = e.target.value;

              this.setState({ editUserData });
            }} />
            </FormGroup>
            <FormGroup>
            <Label for="return_time">return_time</Label>
            <Input id="return_time" readOnly value={this.state.editUserData.return_time}  onChange={(e) => {
              let { editUserData } = this.state;

              editUserData.return_time = e.target.value;

              this.setState({ editUserData });
            }} />
            </FormGroup>
            <FormGroup>
            <Label for="utilities">utilities</Label>
            <Input id="utilities" readOnly value={this.state.editUserData.utilities}  onChange={(e) => {
              let { editUserData } = this.state;

              editUserData.utilities = e.target.value;

              this.setState({ editUserData });
            }} />
            </FormGroup>
            <FormGroup>
            <Label for="drivingL">Driving LIcence Number</Label>
            <Input id="drivingL" readOnly value={this.state.editUserData.drivingL}  onChange={(e) => {
              let { editUserData } = this.state;

              editUserData.drivingL = e.target.value;

              this.setState({ editUserData });
            }} />
            </FormGroup>
            
             <FormGroup>
            <Label for="booked_car">booked_car</Label>
            <Input id="booked_car" readOnly value={this.state.editUserData.booked_car} />
            </FormGroup>
            <FormGroup>
            <Label  for="status">Accept or Decline booking</Label>
            <select  id="status" value={this.state.editUserData.status} onChange={(e) => {
              let { editUserData } = this.state;

              editUserData.status = e.target.value;

              this.setState({ editUserData });
            }} >
               <option value=""></option>
              <option value="Accepted">Accept Booking</option>
            <option value="Declined">Decline  booking</option>
            </select>
            </FormGroup>



            </ModalBody>
            <ModalFooter>
          <Button color="primary" onClick={this.AcceptBooking.bind(this)}> Save </Button>{' '}
          <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
              </Modal>

          

       <Table sresponsive="sm">
            <thead>
              <tr>
               <th>Booking ID</th>
                <th>Username</th>
                <th>Booked vehicle model</th>
                
               < th>View  Bookings details</th>
                
                
                
                
                
                </tr>
            </thead>
            <tbody>
                {bookings}
             
            </tbody>
          </Table>
          
       
  
          </div>
      );
  
    };
  }
  
export default adminBookingDetails;