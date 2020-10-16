import React from "react";

import axios from 'axios';
import { Alert } from 'react-alert'


import { Form, Panel,Button,FormGroup,Col,FormControl, Card} from 'react-bootstrap';






import {Modal,ModalHeader,Input,Label,ModalBody,ModalFooter, Table } from 'reactstrap';
import './Register.css'



class Register extends React.Component {

  state = {
    users:[],
   

    newUserData:{
      
      username:'',
      email:'',
      password:'',
      user_status:'',
      age:''


    },
    
    newUserModel: false
  }
  
  handleupload(e){


    let file = this.state.file
    const url = "http://localhost:8080/uploadMultipleFiles";  
    let formdata = new FormData( )
    formdata.append('file',file)

    axios({
          method: 'post',
          url: url,
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data' }
          })
          .then(function (response) {
              //handle success
              console.log(response);
          })
          .catch(function (response) {
              //handle error
              console.log(response);
          });
     
   }
   uploadImage(e){

    let file =e.target.files
    this.setState({ file: file})


    //  let files = e.target.files
    //  this.setState({file:e.target.files})
    //  let reader = new FileReader();
    // let file = this.state.file
    //  console.log(file)
     
    //  const url = "http://localhost:8080/uploadMultipleFiles";
    //   //  const formData={file:e.target.result}
    //    let bodyFormData = new FormData();
       
    
    //  bodyFormData.append('files', file);
     
    //    axios({
    //     method: 'post',
    //     url: url,
    //     body: bodyFormData,
    //     headers: {'Content-Type': 'multipart/form-data' }
    //     })
    //     .then(function (response) {
    //         //handle success
    //         console.log(response);
    //     })
    //     .catch(function (response) {
    //         //handle error
    //         console.log(response);
    //     });
   
   }
  addUser(){
    if(this.state.newUserData.username==""||this.state.newUserData.email == ""|| this.state.newUserData.password =="" || this.state.newUserData.age =="")
    {
      alert("Please fill all the fields, some fields are empty")
    }
    else{
      
    
    if(this.state.newUserData.age <= 18){
      alert("You are underaged")
    }
    else{
      axios.post('http://localhost:8080/signup',this.state.newUserData).then((response)=>{
      let { users } = this.state;
      users.push(response.data);
      
      this.setState({users , newUserModel: false, newUserData:{
        
        
        username:'',
        email:'',
        password:'',
        user_status:'',
        age:'',
        nic:''

      }});
      alert("User registered sucesfully")
     
    })
    window.location='/login'
    }
    }
  }
  
 

  toggleNewUserModal(){
    this.setState({
      newUserModel: ! this.state.newUserModel 
   });
		
  }
  

  render() {  	



	const formBox = {	    
    	marginTop: '15%',
    	marginLeft: '30%', 
    	width : '30%',
	};	
	
	const btn = {
	    width: '100%',
	}

	const title = "register Page" ;
    return (
    <div>   
      		<div className="registerBody">	   
          
      <br/><br/>
      <br/><br/>
       
          <div className="registerCard">
          	  <br/>
              <h2 align='center'><strong>Register</strong></h2>   
              <br/>
            <Form horizontal>
                  <FormGroup>
                  <Label for="username">UserName</Label>
                  <Input username="username" value={this.state.newUserData.username} onChange={(e) => {
                    let { newUserData } = this.state;

                    newUserData.username = e.target.value;

                    this.setState({ newUserData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="email"> Email</Label>
                  <Input type="email" id="email" value={this.state.newUserData.email} onChange={(e) => {
                    let { newUserData } = this.state;

                    newUserData.email = e.target.value;

                    this.setState({ newUserData });
                  }} />
                </FormGroup>	
                <FormGroup>
                  <Label for="password"> Password</Label>
                  <Input type="password" id="password" value={this.state.newUserData.password} onChange={(e) => {
                    let { newUserData } = this.state;

                    newUserData.password = e.target.value;

                    this.setState({ newUserData });
                  }} />
                  
                </FormGroup>	
              <FormGroup>
                <Label for="age"> Enter Your age </Label>
                <Input type="text" id="age" 
                 onChange={(e) => {
                  let { newUserData } = this.state;

                  newUserData.age = e.target.value;

                  this.setState({ newUserData });
                }} />	    
                
              </FormGroup>  
              <FormGroup>
                <Label for="nic"> Enter Your NIC number: </Label>
                <Input type="text" id="nic" 
                 onChange={(e) => {
                  let { newUserData } = this.state;

                  newUserData.nic = e = e.target.value;

                  this.setState({ newUserData });
                }} />	    
                
              </FormGroup>  
                <div className="later">
                <FormGroup>
                  <Col smOffset={1} sm={12}>
                    
                  <Button  onClick={this.addUser.bind(this)}>Register</Button>
                  </Col>
                </FormGroup>
            <a href="/login">Already have an account?</a>
            </div>
				  </Form>
              </div>
              <br/><br/>
      <br/><br/>
			  </div>
       	    	
	     
     </div>
    );
  }
}


export default Register;