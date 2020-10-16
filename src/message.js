import React, { Component } from 'react';
import axios from 'axios';
import {
    Card,CardLink, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,CardColumns
  } from 'reactstrap';

class message extends Component {
    
  state = {
   messages:[],
    newUserData:{
      
    remail:'',
    semial:'',
    messagebody:''


    }

  }
  
  componentDidMount(){
    axios.get('http://localhost:8080/message/'+localStorage.getItem("username"),
    {
   
    },
    ).then((response) => {
      this.setState({
        messages: response.data
      })
    });
  }
  seemessage(){
    if(this.state.messages === null){
   return(  <div> <h1>You dont have any messages yet</h1></div>)
    }
    else{
      let messages = this.state.messages.map(s => {
        return (<div className="registerCard">
        <CardColumns>
          <Card  style={{ display: 'centre'}}>
           
           <CardBody>
              <CardTitle className="d-inline p-2 text-dark"  key={s.id}> From: {s.sname}</CardTitle><br></br>
            <CardSubtitle className="d-inline p-2 text-dark">  To:  {s.rname}</CardSubtitle><br></br>
      <CardText className="d-inline p-2 text-dark">  message: {s.messagebody }</CardText>
              
             
       </CardBody>
               </Card><br/>

          
               </CardColumns>
               
          </div>
        );
    })
    return (<div className="registerCard">
    {messages}
      </div>
    );
    }
  }
    render() { 
      return(<div>
        {this.seemessage()}
      </div>)
       
    }
}
 
export default message;