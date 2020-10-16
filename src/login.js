import React from "react";
import { connect } from "react-redux"
import {doLogin} from './AuthService'
import { Provider, ReactReduxContext } from 'react-redux';
// import { createStore } from 'redux';



import { Form, Panel,Button,FormGroup,Col,FormControl,Card} from 'react-bootstrap';
import './login.css'










class Login extends React.Component {


 constructor(props) {
    super(props);    
    this.state = {
      login: "",
      pass: ""
    };
  }
  
  pressEnter(event) {
  	if(event.charCode == 13){
		  this.doLogin(); 
		  
		
    }
  }

  changeUserName(event) {		 
    let fleldVal = event.target.value;    
    this.setState({login: fleldVal, pass : this.state.pass});
  }
  
  changePass(event) {
	let fleldVal = event.target.value;
	this.setState({pass: fleldVal, login : this.state.login});    
  }

  doLogin(props) {  	
	doLogin(this.state.login, this.state.pass)
	
		
	
  }

  render() {  	

	const { loginFailed } = this.props;
	const {loginPasses} = this.props;

	const formBox = {	    
    	marginTop: '15%',
    	marginLeft: '30%', 
    	width : '30%',
	};	
	
	const btn = {
	    width: '100%',
	}

	const title = "Login Page" ;
    return (
  
      
      		<div className="loginForm">
				  <br/> <br/>
				  <br/> <br/>
				  <div className="loginCard">
						  <div className="loginf">
					  <h2 align='center'><strong>Login</strong></h2>   
					  <br/><br/>
			      <Form horizontal>
				    <FormGroup controlId="formHorizontalEmail">
				      		        
				      
				      <Col sm={12}>
				        <FormControl type="username" placeholder="username" name="login" onChange={this.changeUserName.bind(this)} onKeyPress={this.pressEnter.bind(this)}/>
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formHorizontalPassword">
				      
				      <Col sm={12}>
				        <FormControl type="password" placeholder="password" name="pass" onChange={this.changePass.bind(this)} onKeyPress={this.pressEnter.bind(this)}/>
				      </Col>
				    </FormGroup>				    
<br/>
				    <FormGroup>
				      
				        <Button bsStyle="primary"  onClick={this.doLogin.bind(this)} style={btn} >
				          Sign In
				        </Button>	
				      				    </FormGroup>

					<a href="/Register">Don't have an account?</a>
				  </Form>
				  <div/>
				  <br/>
				  <br/>
			  </div>
			  </div>
			 {/* <div className="loginD">
				  <p>WE ARE HAPPY TO HAVE YOU AS OUR CUSTOMER</p>
	</div>*/}
       	    	
	     
     </div>
    );
  }
}


export default Login;