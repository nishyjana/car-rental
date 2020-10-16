import React, { Component } from 'react'
import {
    Card,CardLink, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Input,Table,
  } from 'reactstrap';
  import {  FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
  import axios ,{post} from 'axios';
  import { Alert } from "react-bootstrap";
 
  // import emailjs from 'emailjs';

class acceptedBookings extends Component {
  
    state = {
      messages:[],
      newUserData:{
        rname:'',
      sname: '',
      messagebody:'',
      },
      
      searches:[],
        acceptedBookings:[],
        search:'',
        email:'',
        details:'',
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
    componentWillMount() {
  
      this.searchQurey();
        
    }
    componentDidMount(){
    
      this.bookingsrefresh();
     
    }
    // refreshVechicle(){
    //   var config = {
    //       headers: {'Authorization':  " Bearer " + localStorage.getItem( "token" )}
        
    //     };
    //   axios.get('http://localhost:8080/booked/status').then((response)=>{
    //     this.setState({
    //       bookings: response.data
    //     })
    //   })
    // }
    sendemails(){
      let { newUserData } = this.state;

                    newUserData.rname = this.state.editUserData.customer;
                    newUserData.sname = "admin";
                    newUserData.messagebody = " please upload electricity bills";


                    this.setState({ newUserData });
                  
      axios.post('http://localhost:8080/addmessage',this.state.newUserData).then((response)=>{
        let { messages } = this.state;
        messages.push(response.data);
        alert("message sent to customer")
        this.setState({messages , newUserModel: false, newUserData:{
          
          rname:this.state.editUserData.customer,
          sname: localStorage.getItem("username"),
          messagebody:'please upload electicity bills , Issue with your Insurance',
       
  
        }});
        
      })
     
    
     
    }

    bookingsrefresh(){
      
       axios.get('http://localhost:8080/booking/status').then((response) => 
       {
         this.bookingsrefresh()
         this.setState({
           acceptedBookings: response.data
         })
       });
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
      searchQurey(){
        axios.get('http://localhost:8085/bookings').then((response)=>{
          this.setState({
            searches: response.data
          })
        })
        console.log("search",this.state.searches,this.state.search)
      }
      AcceptBooking(){
     let listDL = this.state.searches
        let searchQ = this.state.editUserData.drivingL
        let {bookingID,customer,pickup_time,return_time,status,booked_car,utilities,drivingL } = this.state.editUserData;
      if( listDL.find(function(el){ return el.drivingL === searchQ; })|| this.state.newUserData.status =="accepted"){
          alert(" Customer have to uplaod the bills ")
           this.sendemails()
      }
       else{
        axios.put('http://localhost:8080/bookings/' +this.state.editUserData.bookingID,{
          bookingID,customer,pickup_time,return_time,status,booked_car,utilities,drivingL
  
        }).then((response)=>{
          this.refreshVechicle();
  
          this.setState({
            editBookModal: false,editUserData: { bookingID:'',customer:'',pickup_time:'',return_time:'',status:'',booked_car:'',utilities:'',drivingL:''}
          })
         
       
        })
        console.log("list",listDL)
        
        console.log("searchlist",searchQ)
       }

      }
      refreshVechicle(){
        var config = {
            headers: {'Authorization':  " Bearer " + localStorage.getItem( "token" )}
          
          };
        axios.get('http://localhost:8080/booked/status').then((response)=>{
          this.setState({
            acceptedBookings: response.data
          })
        })
      }
     
  
      
      acceptedBooking(){
       let acceptedBookings = this.state.acceptedBookings.map((pbook) => {
         return(
           <tr key= {pbook.bookingID}>
              <td>{pbook.bookingID}</td>
             <td>{pbook.pickup_time}</td>
             
             <td>{pbook.return_time}</td>
             <td>{pbook.booked_car}</td>
             <td>{pbook.customer}</td> 
             <td>{pbook.rates}</td> 
         <td>{pbook.status}</td>
         <td> <Button  onClick={this.edituser.bind(this,pbook.bookingID,pbook.customer,pbook.pickup_time,pbook.return_time,pbook.status,pbook.booked_car,pbook.utilities,pbook.drivingL)}>Collect</Button>
         </td>

         
             
           
   
           </tr>
         );
   
       })
       return(
         <div>
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
            <Label  for="status">Collect  booking</Label>
            <select  id="status" value={this.state.editUserData.status} onChange={(e) => {
              let { editUserData } = this.state;

              editUserData.status = e.target.value;

              this.setState({ editUserData });
            }} >
               <option value=""></option>
              <option value="collected">collected</option>
            <option value="Declined">Decline  booking</option>
            </select>
            </FormGroup>



            </ModalBody>
            <ModalFooter>
          <Button color="primary" onClick={this.AcceptBooking.bind(this)}> Save </Button>{' '}
          {/* <Button color="primary" onClick={() => ToastsStore.success("Hey, you just clicked!")}> test </Button>{' '}
          <ToastsContainer store={ToastsStore}/> */}
          <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
              </Modal>

          
         
         <Table sresponsive="sm">
            
   
         <thead>
           <tr>
           <th> Booking ID</th>
             <th>Pick up Time</th>
           
             <th>Return Time </th>
             <th>booked Car</th>
             <th>Customer Name</th>
             <th>Rates </th>
            <th>Status of customer bookings</th>
             
             </tr>
         </thead>
         <tbody>
          {acceptedBookings}
         </tbody>
       </Table>
       </div>
       )
   
      }
    render() {

        return (
            
          this.acceptedBooking()
              
                
         
        )
       

    }
  
}

export default acceptedBookings;
