import React, { Component } from 'react';
import axios from 'axios';
import "./blacklisted.css";




class unav extends Component {
  state = {
    cars:[]
  }
componentWillMount() {
    this._refreshbooks();
}
_refreshbooks(){
    axios.get('http://localhost:8080/cars').then((response) => {
      this.setState({
        cars: response.data
      })
    });
   }
   constructor(props){
     super(props);
   }
   booking(){
    window.location='/booking'
   }
   dologout(){
    localStorage.clear();   
    window.location='/login'
   
     
   }
       
    render() { 
    

            
           
        return(
            <div className="black">
                <h1>You are blocked by the admin. please contact the office for further details </h1>
           
              
              
             
             </div>
        );
     
         
    
    }
}
 
export default unav;

 
  