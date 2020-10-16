import React, {Component} from 'react';
import { Button,ButtonToolbar } from 'react-bootstrap';
import axios from "axios";
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';



class adminUserDetails extends Component {
    state={
        users: [],
        selectedOption: null,
        editUserData:{

          customerID:'',
          username:'',
          email:'',
          password:'',
          user_status:''
         
    
    
        },
        editBookModal:false

       
        
      }
      
      edituser(customerID,username,email,password,user_status){
        this.setState({
          editUserData: {user_status,username,email,password,customerID},editBookModal: ! this.state.editBookModal
        });
      }
   
    
      componentWillMount()
     
      {
       // let {userStatus,username,email,password,customerID} = this.state.editUserData;
      
        
        this.refreshVechicle();
      }
  
      toggleEditBookModal() {
        this.setState({
          editBookModal: ! this.state.editBookModal
        });
      }
    blacklisted(){
      let {username, password, email,user_status } = this.state.editUserData;
      
    
      axios.put('http://localhost:8080/userStatus/' +this.state.editUserData.customerID,{
        username,email,password,user_status

      }).then((response)=>{
        this.refreshVechicle();

        this.setState({
          editBookModal: false,editUserData: { username:'',email:'',password:'',user_status:'' }
        })
        alert(" this user detail is updated ")
      })
    }
    
    
      refreshVechicle(){
        axios.get('http://localhost:8080/customers').then((response)=>{
          this.setState({
            users: response.data
          })
        })
      }
   
    render() {
        let users = this.state.users.map((user) => {
            return(
              <tr key= {user.customerID}>
                 <td>{user.customerID}</td>
                <td>{user.username}</td>
                
                <td>{user.email}</td>
                <td>{user.password}</td>
            <td>{user.user_status}</td>
            <td>
              <Button  onClick={this.edituser.bind(this,user.customerID,user.username,user.email,user.password,user.user_status)}> customise User</Button>
              </td>
                
              
      
              </tr>
            );
          })
    
  
      return (
        <div className="App Container">
       
        
       <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit user</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="username">username</Label>
            <Input id="username" value={this.state.editUserData.username} 
          />
            </FormGroup>
            <FormGroup>
            <Label for="email">email</Label>
            <Input id="email" value={this.state.editUserData.email} onChange={(e) => {
              let { editUserData } = this.state;

              editUserData.email = e.target.value;

              this.setState({ editUserData });
            }} />
            </FormGroup>

            <FormGroup>
            <Label for="password">password</Label>
            <Input id="password" value={this.state.editUserData.password} onChange={(e) => {
              let { editUserData } = this.state;

              editUserData.password = e.target.value;

              this.setState({ editUserData });
            }} />
            </FormGroup>

              <FormGroup>
              <Label for="user_status">userStatus  </Label>
              <select id="user_status" value={this.state.editUserData.user_status} onChange={(e) => {
                let { editUserData } = this.state;

                editUserData.user_status = e.target.value;

                this.setState({ editUserData });
              }} > <option value="Active">Activate</option>
              <option value="blacklisted">BlackList</option>
              
              </select>
              </FormGroup>



            </ModalBody>
            <ModalFooter>
          <Button color="primary" onClick={this.blacklisted.bind(this)}>update User</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
              </Modal>

       <Table sresponsive="sm">
         

            <thead>
              <tr>
              <th> Customer ID</th>
                <th>User Name</th>
              
                <th>Email</th>
                <th>password</th>
                <th>Status</th>
               <th>Blacklist</th>
                
                </tr>
            </thead>
            <tbody>
             {users}
            </tbody>
          </Table>
          
       
  
          </div>
      );
  
    };
  }
  
export default adminUserDetails;