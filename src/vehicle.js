import React, {Component} from 'react';
import { Button,Table,ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import {AddVechicleModal} from './AddVechicleModal';
import {  FormGroup, Label,Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';




export class vehicle extends Component {
    state={
      cars: [],
      
      editUserData:{

        carid:'',
        carModel: '',
        carType: '',
        fuel: '',
        price: '',
        carNumber:'',
        imgURl:''
       
  
  
      },
      editBookModal:false
  
      
      
    }
    
    edituser(carid,carModel,carType,fuel,price,carNumber,imgURl){
      this.setState({
        editBookModal: ! this.state.editBookModal
      });
    }
    toggleEditBookModal() {
      this.setState({
        editBookModal: ! this.state.editBookModal
      });
    }
   
  
    componentWillMount()
    {
      this.refreshVechicle();
      
    }

  addbooking(){
    axios.post('http://localhost:8080/cars',this.state.editUserData).then((response)=>{
      let { cars } = this.state;
      cars.push(response.data);
      
      this.setState({cars , editBookModal: false, editUserData:{
        
        
        carid:'',
        carModel: '',
        carType: '',
        fuel: '',
        price: '',
        carNumber:'',
        imgURl:''
       
      }});
      alert("car registered sucesfully")
     
    })
  }
  
  
    refreshVechicle(){
      axios.get('http://localhost:8080/suv').then((response)=>{
        this.setState({
          cars: response.data
        })
      })
    }

    deleteBook(carid) {
      axios.delete(`http://localhost:8080/cars/${carid}` ).then((response) => {
        this.refreshVechicle();
      });}
  
    
   
    render() {
      
      let cars = this.state.cars.map((car) => {
        return(
          
          <tr key= {car.carID}>
            <td>{car.carID}</td>
            
            <td>{car.carModel}</td>
            <td>{car.carType}</td>
            <td>{car.fuel}</td>
           
            <td>{car.price}</td>
            <td><Button color="danger" size="sm" onClick={this.deleteBook.bind(this, car.carID)}>Delete</Button></td>
  
          </tr>
        );
      })
  
      return (
        <div className="App Container">
       
       <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Validate bookings of our Customers </ModalHeader>
        <ModalBody>
        
            <FormGroup>
            <Label for="carModel">carModel</Label>
            <Input id="carModel"    value={this.state.editUserData.carModel} onChange={(e) => {
              let { editUserData } = this.state;

              editUserData.carModel = e.target.value;

              this.setState({ editUserData });
            }} />
            </FormGroup>
           
            <FormGroup>
            <Label for="carType">carType</Label>
            <Input id="carType"  value={this.state.editUserData.carType}  onChange={(e) => {
              let { editUserData } = this.state;

              editUserData.carType = e.target.value;

              this.setState({ editUserData });
            }} />
            </FormGroup>
            <FormGroup>
            <Label for="fuel">fuel</Label>
            <Input id="fuel"  value={this.state.editUserData.fuel}  onChange={(e) => {
              let { editUserData } = this.state;

              editUserData.fuel = e.target.value;

              this.setState({ editUserData });
            }} />
            </FormGroup>
            <FormGroup>
            <Label for="price">price</Label>
            <Input id="price"  value={this.state.editUserData.price}  onChange={(e) => {
              let { editUserData } = this.state;

              editUserData.price = e.target.value;

              this.setState({ editUserData });
            }} />
            </FormGroup>
            <FormGroup>
            <Label for="carNumber">carNumberr</Label>
            <Input id="carNumber"  value={this.state.editUserData.carNumber}  onChange={(e) => {
              let { editUserData } = this.state;

              editUserData.carNumber = e.target.value;

              this.setState({ editUserData });
            }} />
            </FormGroup>
            <FormGroup>
            <Label for="imgURl">imgURl</Label>
            <Input id="imgURl"  value={this.state.editUserData.imgURl}  onChange={(e) => {
              let { editUserData } = this.state;

              editUserData.imgURl = e.target.value;

              this.setState({ editUserData });
            }} />
            </FormGroup>
           
            



            </ModalBody>
            <ModalFooter>
          <Button color="primary" onClick={this.addbooking.bind(this)}> Add Car </Button>{' '}
          {/* <Button color="primary" onClick={() => ToastsStore.success("Hey, you just clicked!")}> test </Button>{' '}
          <ToastsContainer store={ToastsStore}/> */}
          <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
              </Modal>

       
          
     
       <Table sresponsive="sm">
            <thead>
              <tr>
                <th>Car ID</th>
                <th>Car Model</th>
                <th>CarType</th>
                <th>Fuel</th>
              
                <th>price</th>
                <th> <Button onClick={this.edituser.bind(this)}>Add Vehicle</Button></th>
                
              </tr>
            </thead>
            <tbody>
              {cars}
            </tbody>
          </Table>
         
  
          </div>
      );
  
    };
  }
  
export default vehicle;